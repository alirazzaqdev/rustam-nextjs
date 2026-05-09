# ⚡ Supabase Setup - 5 Minutes to Live Website

## Step 1: Create Supabase Account (2 minutes)

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with **GitHub** (fastest option)
   - It will ask to verify your GitHub account
   - Click "Authorize" when prompted

---

## Step 2: Create Database Project (3 minutes)

1. After login, you see "New Project" button
2. Click **"New Project"**
3. Fill in:
   - **Project name:** `rustam-battery`
   - **Database password:** `postgres2025` (save this!)
   - **Region:** Choose **Singapore** (closest to Pakistan)
4. Click **"Create new project"**

**⏳ Wait 2-3 minutes for database to be ready**

You'll see: "Your project is being set up..."

---

## Step 3: Get Connection String (1 minute)

1. Once ready, go to **Settings** (gear icon, bottom left)
2. Click **"Database"** in left menu
3. Scroll to **"Connection Pooling"**
4. In the dropdown, select **"Prisma"**
5. Copy the entire connection string (looks like):

```
postgresql://postgres.xxxxxxxxx:yourpassword@aws-0-xxxxx.pooler.supabase.com:6543/postgres?schema=public&sslmode=require
```

**Important:** The password should be what you set (`postgres2025`)

---

## Step 4: Update .env.local (1 minute)

Open `C:\Users\hp\rustam-nextjs\.env.local` and replace the DATABASE_URL line:

```env
DATABASE_URL="postgresql://postgres.xxxxxxxxx:postgres2025@aws-0-xxxxx.pooler.supabase.com:6543/postgres?schema=public&sslmode=require"
RESEND_API_KEY=""
EMAIL_FROM="noreply@rustambattery.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## Step 5: Push Schema & Seed (2 minutes)

Open Terminal in `C:\Users\hp\rustam-nextjs` and run:

```bash
npm run db:push
```

Expected output:
```
✓ Your database is now in sync with your Prisma schema
```

Then seed the data:

```bash
npm run db:seed
```

Expected output:
```
🌱 Starting database seed...
📦 Creating products...
✅ Created 12 products
🔧 Creating services...
✅ Created 5 services
❓ Creating FAQs...
✅ Created 10 FAQs
⭐ Creating testimonials...
✅ Created 5 testimonials
🎉 Database seeding completed successfully!
```

---

## Step 6: Start Development Server (1 minute)

```bash
npm run dev
```

Output should show:
```
▲ Next.js 16.2.6
- Local:        http://localhost:3000
```

---

## Step 7: Open Website ✅

**Open browser:** http://localhost:3000

You should see the complete website with:
- ✨ Hero section
- 📦 12 Products with filtering
- 🔧 5 Services
- ⭐ 5 Testimonials
- ❓ 10 FAQs
- 📱 Responsive design

---

## 🎉 Done!

Your production-ready database is now set up. The same database will work for deployment to Vercel later.

---

## Useful Commands

```bash
npm run dev              # Start dev server
npm run db:studio       # Open Supabase dashboard (view/edit data)
npm run build           # Build for production
npm run format          # Format code
npm run type-check      # Check TypeScript
```

---

## View Your Database

To see and manage data in Supabase:

1. Go to https://supabase.com
2. Click your project "rustam-battery"
3. Click **"SQL Editor"** or **"Table Editor"** to browse data
4. Or locally run: `npm run db:studio`

---

## Troubleshooting

### "Authentication failed" or "password authentication failed"
- Check the password in DATABASE_URL matches what you set
- If you forgot it, go to Supabase Settings > Database > Reset Password

### "Can't reach database server"
- Ensure you have internet connection
- Check the DATABASE_URL doesn't have typos
- Try copying fresh from Supabase > Connection Pooling > Prisma

### "Does not match your Prisma schema"
- Run: `npm run db:push` first
- Then: `npm run db:seed`

---

## Next: What's Built

✅ Complete website structure with:
- Database with 12 products
- 5 services
- 10 FAQs
- 5 testimonials
- Responsive design
- Navigation, header, footer

⬜ Next steps:
1. Build solar calculator
2. Build contact/quote forms
3. Add animations
4. Deploy to Vercel

---

That's it! You now have a production-grade website with real data running locally. 🚀
