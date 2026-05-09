# 🚀 Quick Start - Get Website Running in 10 Minutes

## IMPORTANT: Follow These Steps Exactly in Order

---

## Step 1: Start Prisma Dev Database (2 minutes)

**Open a NEW TERMINAL/POWERSHELL WINDOW** and run:

```bash
cd C:\Users\hp\rustam-nextjs
npx prisma dev
```

**You should see output like:**
```
✓ Prisma local database is running
Local database: http://localhost:5555
...
Ready to accept connections on localhost:51213
```

**⚠️ IMPORTANT: Keep this terminal open!** Don't close it. Minimize it if you need to.

---

## Step 2: In a SECOND Terminal, Set Up Database

Once you see "Ready to accept connections" in the first terminal, open **ANOTHER NEW TERMINAL/POWERSHELL** and run:

```bash
cd C:\Users\hp\rustam-nextjs
npm run db:push
```

Expected output:
```
✓ Your database is now in sync with your Prisma schema
```

---

## Step 3: Seed Sample Data

In the SAME SECOND TERMINAL, run:

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

## Step 4: Start Development Server

In the SAME SECOND TERMINAL, run:

```bash
npm run dev
```

Expected output:
```
▲ Next.js 16.2.6
- Local:        http://localhost:3000
```

---

## Step 5: Open Website

**Open your browser:**
```
http://localhost:3000
```

## ✅ You Should See:

- ✨ Beautiful hero section
- 📦 12 solar products with filtering
- 🔧 5 professional services
- ⭐ 5 customer testimonials with ratings
- ❓ 10 FAQ questions in accordion
- 📱 Fully responsive design
- ✉️ Footer with contact info

---

## Terminal Layout (Recommended)

```
Terminal 1: npx prisma dev (KEEP RUNNING)
            ↓
Terminal 2: npm run db:push
            npm run db:seed  
            npm run dev (KEEP RUNNING)
            
Browser:    http://localhost:3000
```

---

## Troubleshooting

### "Can't reach database server at localhost:51214"
- Make sure Terminal 1 still shows "Ready to accept connections"
- If it doesn't, restart Prisma dev in Terminal 1

### "EADDRINUSE :::3000" (port 3000 already in use)
```bash
# Use a different port
npm run dev -- -p 3001
# Then visit: http://localhost:3001
```

### "Seed failed" or "ENOTFOUND"
- Double-check Prisma dev is running in Terminal 1
- Run `npm run db:push` before `npm run db:seed`

### Port 51213 in use
- Change DATABASE_URL port in .env.local to 51214 or another number
- Restart Prisma dev

---

## Commands Reference

```bash
# Database
npm run db:push       # Sync schema
npm run db:seed       # Load sample data
npm run db:studio     # Open database GUI

# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run format        # Format code
npm run type-check    # Check TypeScript
```

---

## Next Steps (After Website is Running)

1. ✅ Database is live
2. ✅ Website shows products, services, testimonials, FAQs
3. ⬜ Build solar calculator
4. ⬜ Build contact/quote forms
5. ⬜ Add animations
6. ⬜ Deploy to Vercel

---

## Important Notes

- **Keep both terminals open** while developing
- **Terminal 1 = Prisma Dev** (must stay running)
- **Terminal 2 = Development server** (must stay running)
- If anything breaks, restart both terminals

---

**Ready? Follow the steps above now!** 🎯
