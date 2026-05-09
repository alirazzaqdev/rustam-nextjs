#!/usr/bin/env pwsh

Write-Host "🚀 Rustam Battery - Automated Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create .env.local
Write-Host "1️⃣ Creating environment configuration..." -ForegroundColor Yellow

$envContent = @"
# Database - Prisma Dev (local)
DATABASE_URL="prisma+postgres://localhost:51213/?api_key=eyJkYXRhYmFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zdGdyZXNAbG9jYWxob3N0OjUxMjE0L3RlbXBsYXRlMT9zc2xtb2RlPWRpc2FibGUmY29ubmVjdGlvbl9saW1pdD0xMCZjb25uZWN0X3RpbWVvdXQ9MCZtYXhfaWRsZV9jb25uZWN0aW9uX2xpZmV0aW1lPTAmcG9vbF90aW1lb3V0PTAmc29ja2V0X3RpbWVvdXQ9MCIsIm5hbWUiOiJkZWZhdWx0Iiwic2hhZG93RGF0YWJhc2VVcmwiOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQGxvY2FsaG9zdDo1MTIxNS90ZW1wbGF0ZTE_c3NsbW9kZT1kaXNhYmxlJmNvbm5lY3Rpb25fbGltaXQ9MTAmY29ubmVjdF90aW1lb3V0PTAmbWF4X2lkbGVfY29ubmVjdGlvbl9saWZldGltZT0wJnBvb2xfdGltZW91dD0wJnNvY2tldF90aW1lb3V0PTAifQ"

# Email Service (optional - for contact forms)
RESEND_API_KEY=""
EMAIL_FROM="noreply@rustambattery.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
"@

Set-Content -Path ".env.local" -Value $envContent
Write-Host "✅ .env.local created" -ForegroundColor Green
Write-Host ""

# Step 2: Sync database
Write-Host "2️⃣ Syncing database schema..." -ForegroundColor Yellow
npm run db:push

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database sync failed. Make sure Prisma dev is running:" -ForegroundColor Red
    Write-Host "   npx prisma dev" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Database schema synced" -ForegroundColor Green
Write-Host ""

# Step 3: Seed database
Write-Host "3️⃣ Seeding database with sample data..." -ForegroundColor Yellow
npm run db:seed

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Database seeded successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Seeding failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start development server:"
Write-Host "   npm run dev" -ForegroundColor Green
Write-Host ""
Write-Host "2. Open in browser:"
Write-Host "   http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "3. Keep Prisma Dev terminal open:" -ForegroundColor Yellow
Write-Host "   npx prisma dev" -ForegroundColor Green
Write-Host ""
Write-Host "📊 To view database GUI:" -ForegroundColor Yellow
Write-Host "   npm run db:studio" -ForegroundColor Green
