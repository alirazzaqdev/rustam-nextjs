# Database Setup Instructions

## What's Been Built

✅ **Core Website Structure:**
- Next.js 15 + React 19 + TypeScript
- Header with navigation & mobile menu
- Hero section with CTA buttons
- Products section (12 products with filtering)
- Services section (5 services)
- Testimonials section (5 testimonials with ratings)
- FAQ section (10 FAQs with accordion)
- Footer with contact info
- Responsive design (mobile, tablet, desktop)

✅ **Database Schema Created:**
- 6 Prisma models ready (User, Product, Service, Testimonial, QuoteRequest, FAQ)
- All server actions configured
- Email integration (Resend) ready
- Type definitions complete

**🔴 What's Missing:**
- Active database connection
- Seed data loaded
- Forms not yet functional

---

## Three Options to Proceed

### Option 1: Quickest - Local Prisma Dev (Recommended for Getting Started)

**Perfect for testing immediately - 5 minutes to have working site:**

```bash
# Terminal 1: Start Prisma dev database
npx prisma dev

# Copy the connection string shown in terminal
# It will look like: prisma+postgres://...
```

```bash
# Terminal 2: Update and sync database
# 1. Add to .env.local:
DATABASE_URL="prisma+postgres://..."

# 2. Sync schema
npm run db:push

# 3. Seed sample data
npm run db:seed

# 4. Start dev server
npm run dev

# Visit http://localhost:3000 ✅ You'll see everything working!
```

**Pros:**
- ⚡ Instant setup (no sign-ups)
- ✅ Full data loaded (12 products, 5 services, 10 FAQs)
- 🎨 See complete website design
- 📱 Test all responsive layouts
- ⏱️ Takes 5 minutes total

**Cons:**
- 💻 Only works locally
- 🔄 Database resets if Prisma dev stops

---

### Option 2: Production Ready - Supabase (For Deployment)

**Better for production, requires sign-up:**

#### Step 1: Create Supabase Project (3 minutes)
```
1. Visit https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (faster)
4. Create new project:
   - Project name: rustam-battery
   - Database password: Save this!
   - Region: Select closest to Pakistan
5. Wait 2-3 minutes for initialization
```

#### Step 2: Get Connection String (2 minutes)
```
1. In Supabase Dashboard, go to Settings > Database
2. Click "Connection Pooling" tab
3. Select "Prisma" from dropdown
4. Copy the URI (it includes your password)
```

#### Step 3: Connect and Seed (2 minutes)
```bash
# Update .env.local
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?schema=public&sslmode=require"

# Sync schema
npm run db:push

# Load seed data
npm run db:seed

# Start dev server
npm run dev

# Visit http://localhost:3000 ✅ Ready for deployment!
```

**Pros:**
- 🌍 Works globally
- 🚀 Deployable to Vercel
- 💾 Data persists
- 📊 Database backups included

**Cons:**
- ⏱️ Takes 8-10 minutes
- 🔐 Requires login

---

### Option 3: Docker (Advanced - for Production-like Local Setup)

```bash
# Start PostgreSQL container
docker run --name rustam-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16

# Create database
createdb -U postgres -h localhost rustam

# Update .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rustam"

# Sync and seed
npm run db:push
npm run db:seed
npm run dev

# Cleanup when done
docker stop rustam-postgres
```

---

## After Setup - What You'll See

Once any option above is complete:

### ✅ Products Page
- 12 solar products displayed
- Filter by category (panels, batteries, inverters, accessories)
- Filter by price range
- Stock status indicators
- Real product specs

### ✅ Services Page
- 5 service offerings
- Installation, design, monitoring, maintenance
- Professional service icons

### ✅ Testimonials
- 5 customer reviews
- 5-star ratings
- Company & title info

### ✅ FAQ Section
- 10 frequently asked questions
- Expandable accordion interface
- All questions searchable

### ✅ Complete Navigation
- Sticky header with mobile menu
- Footer with contact info
- Responsive across all devices

---

## Command Reference

```bash
# Database
npm run db:push              # Sync schema with database
npm run db:migrate          # Run migrations
npm run db:studio           # Open database GUI
npm run db:seed             # Load sample data

# Development
npm run dev                 # Start dev server (port 3000)
npm run build               # Build for production
npm start                   # Start production server

# Code Quality
npm run format              # Auto-format code
npm run type-check          # Check TypeScript
npm run lint                # Run ESLint
```

---

## Troubleshooting

### "Authentication failed" Error
**Solution:**
- Check DATABASE_URL is correct in `.env.local`
- For Supabase: verify password is in URL
- For Prisma dev: copy exact connection string from terminal

### "Connection refused"
**Solution:**
- For local: ensure `npx prisma dev` is running in another terminal
- For Supabase: wait 2-3 minutes after project creation
- For Docker: ensure `docker run` succeeded

### Seed fails
**Solution:**
```bash
# Ensure schema exists first
npm run db:push

# Then seed
npm run db:seed

# Or reset everything (dev only!)
npm run db:studio  # delete all data manually
npm run db:seed    # reload
```

### Prisma Dev showing "offline"
**Solution:**
- The Prisma dev server crashed
- Run again: `npx prisma dev`
- Or switch to Supabase option

---

## Next Steps (After Database is Live)

1. ✅ Database connected → You are here
2. ⬜ Build solar calculator
3. ⬜ Build contact/quote forms
4. ⬜ Add animations (Framer Motion)
5. ⬜ Set up CMS (Sanity)
6. ⬜ Deploy to Vercel
7. ⬜ Configure custom domain

---

## Recommended Choice

**For Immediate Testing:**
→ Use **Option 1: Prisma Dev** (5 min, no sign-ups needed)

**For Deployment:**
→ Use **Option 2: Supabase** (10 min, production-ready)

---

## File Locations

- Database schema: `prisma/schema.prisma`
- Seed data: `prisma/seed.ts`
- Server actions: `src/actions/`
- Components: `src/components/`
- Environment file: `.env.local` (create from `.env.example`)

---

Good luck! 🚀
