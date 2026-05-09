#!/bin/bash

echo "🚀 Rustam Battery - Automated Setup"
echo "===================================="
echo ""

# Step 1: Start Prisma Dev
echo "1️⃣ Starting Prisma Dev database..."
echo ""
echo "⚠️  IMPORTANT: A new terminal will open."
echo "Once you see 'Ready' message, come back here and press ENTER"
echo ""

npx prisma dev &
PRISMA_PID=$!

# Wait a bit for Prisma to start
sleep 3

echo ""
echo "2️⃣ Setting up environment variables..."
cat > .env.local << 'EOF'
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=eyJkYXRhYmFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zdGdyZXNAbG9jYWxob3N0OjUxMjE0L3RlbXBsYXRlMT9zc2xtb2RlPWRpc2FibGUmY29ubmVjdGlvbl9saW1pdD0xMCZjb25uZWN0X3RpbWVvdXQ9MCZtYXhfaWRsZV9jb25uZWN0aW9uX2xpZmV0aW1lPTAmcG9vbF90aW1lb3V0PTAmc29ja2V0X3RpbWVvdXQ9MCIsIm5hbWUiOiJkZWZhdWx0Iiwic2hhZG93RGF0YWJhc2VVcmwiOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQGxvY2FsaG9zdDo1MTIxNS90ZW1wbGF0ZTE_c3NsbW9kZT1kaXNhYmxlJmNvbm5lY3Rpb25fbGltaXQ9MTAmY29ubmVjdF90aW1lb3V0PTAmbWF4X2lkbGVfY29ubmVjdGlvbl9saWZldGltZT0wJnBvb2xfdGltZW91dD0wJnNvY2tldF90aW1lb3V0PTAifQ"
RESEND_API_KEY=""
EMAIL_FROM="noreply@rustambattery.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
EOF

echo "✅ .env.local created"
echo ""

echo "3️⃣ Syncing database schema..."
npm run db:push

echo ""
echo "4️⃣ Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the dev server, run:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Keep the Prisma Dev terminal open in another window."
