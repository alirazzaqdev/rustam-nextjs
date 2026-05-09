# Rustam Battery - Setup Guide

## Step 1: Database Setup (Supabase)

### Option A: Using Supabase (Recommended for Production)

1. Go to https://supabase.com
2. Sign up with GitHub or email
3. Create a new project
4. Wait for project initialization (2-3 minutes)
5. Go to Settings > Database > Connection Strings
6. Copy the "Connection String" (URI format)
7. Update `.env.local`:

```env
DATABASE_URL="postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?schema=public&sslmode=require"
```

8. Push schema:
```bash
npm run db:push
```

### Option B: Local Development (Prisma Dev Database)

```bash
npx prisma dev
```

This creates a local PostgreSQL database (recommended for initial development).

---

## Step 2: Seed Database with Initial Data

The seed script will populate:
- 18 solar products (panels, batteries, inverters, accessories)
- 5 services
- 10 FAQs
- 3 sample testimonials

```bash
npm run db:seed
```

---

## Step 3: Configure Email (Resend)

1. Go to https://resend.com
2. Sign up
3. Go to API Keys
4. Copy your API key
5. Update `.env.local`:

```env
RESEND_API_KEY="your_api_key_here"
EMAIL_FROM="noreply@rustambattery.com"
```

Test with:
```bash
npm run dev
# Visit /api/test-email (we'll create this)
```

---

## Step 4: Configure Spam Protection (Turnstile)

1. Go to https://dash.cloudflare.com
2. Sign up or login
3. Go to Turnstile > Create Site
4. Fill in domain: `localhost` (for dev), `rustambattery.com` (for prod)
5. Get Site Key and Secret Key
6. Update `.env.local`:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_site_key"
TURNSTILE_SECRET_KEY="your_secret_key"
```

---

## Step 5: Configure Analytics (Google Analytics)

1. Go to https://analytics.google.com
2. Create a new property for "Rustam Battery"
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Update `.env.local`:

```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## Development Workflow

```bash
# Start development server
npm run dev

# Open Prisma Studio to view/edit data
npm run db:studio

# Format code
npm run format

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Deployment Checklist

- [ ] Supabase project created
- [ ] DATABASE_URL configured
- [ ] Resend API key added
- [ ] Turnstile keys added
- [ ] Google Analytics ID added
- [ ] Database migrated
- [ ] Seed data loaded
- [ ] Local development works
- [ ] GitHub repository created
- [ ] Vercel connected to GitHub
- [ ] Environment variables in Vercel
- [ ] Domain configured (alirazzaq.dev)

---

## Useful Links

- Supabase: https://supabase.com
- Resend: https://resend.com
- Cloudflare Turnstile: https://developers.cloudflare.com/turnstile
- Google Analytics: https://analytics.google.com
- Prisma Docs: https://prisma.io/docs
