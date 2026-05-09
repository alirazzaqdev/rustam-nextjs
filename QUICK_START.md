# Quick Start Guide

## Prerequisites
- Node.js 20+
- npm installed
- (Optional) Supabase account

---

## Option 1: Quick Local Setup (Development)

Perfect for getting started immediately:

```bash
# 1. Use Prisma's built-in dev database
npx prisma dev

# This will:
# - Create a local PostgreSQL database
# - Show connection string
# - Keep it running in the terminal

# In a NEW TERMINAL:
# 2. Copy the connection string and update .env.local
# DATABASE_URL="prisma+postgres://..."

# 3. Push schema
npm run db:push

# 4. Seed database with sample data
npm run db:seed

# 5. Start dev server
npm run dev

# Visit http://localhost:3000
```

---

## Option 2: Production Setup (Supabase)

For deployment-ready setup:

### 1. Create Supabase Project
```
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up (GitHub login recommended)
4. Create new project:
   - Project name: "rustam-battery"
   - Password: (save this!)
   - Region: Select closest to Lahore
5. Wait 2-3 minutes for initialization
```

### 2. Get Connection String
```
1. Go to Settings > Database > Connection Pooling
2. Copy "Connection String" (Prisma format)
3. Update .env.local:

DATABASE_URL="postgres://postgres:[password]@[host]:[port]/postgres?schema=public&sslmode=require"
```

### 3. Push Schema & Seed
```bash
npm run db:push
npm run db:seed
npm run dev
```

---

## Option 3: Docker (Optional - for production-like local setup)

```bash
# Start PostgreSQL in Docker
docker run --name rustam-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16

# Update .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rustam"

# Create database
createdb -U postgres -h localhost rustam

# Push schema
npm run db:push

# Seed
npm run db:seed

# Cleanup when done
docker stop rustam-postgres
```

---

## After Setup

```bash
# View/edit data
npm run db:studio

# Check everything works
npm run dev
# Open http://localhost:3000

# You should see:
# ✅ Header with navigation
# ✅ Hero section
# ✅ Placeholder sections
```

---

## Common Issues

### "Error: Authentication failed"
- Check DATABASE_URL is correct in .env.local
- For Supabase: ensure password is correct
- For Prisma dev: copy the full connection string

### "SSL connection error"
- For Supabase: add `?sslmode=require` to connection string
- For local: not needed

### Seed fails with "Function not found"
- Run `npm install` first
- Ensure `prisma/seed.ts` exists
- Try: `npm run db:push` before seeding

---

## Next Steps

Once setup is complete:

1. ✅ Database connected
2. ⬜ Build Products page
3. ⬜ Build Services section
4. ⬜ Add Testimonials
5. ⬜ Create Contact forms
6. ⬜ Add Animations
7. ⬜ Deploy to Vercel

---

## Useful Commands

```bash
npm run dev              # Start development server
npm run db:studio       # Open database UI
npm run db:push         # Sync schema
npm run db:seed         # Load sample data
npm run format          # Auto-format code
npm run type-check      # Check TypeScript
npm run lint            # Lint code
```

---

## Help

- Documentation: `/README.md`
- Setup details: `/SETUP_GUIDE.md`
- Database schema: `/prisma/schema.prisma`
