# Rustam Battery & Solar Energy House - Modern Website

A production-grade, modern website for Rustam Battery & Solar Energy House built with Next.js 15, React 19, TypeScript, and PostgreSQL.

## Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS
- **ShadCN/UI** - High-quality components
- **Framer Motion** - Animations
- **Lucide Icons** - Icon library
- **React Hook Form + Zod** - Form validation
- **Zustand** - State management

### Backend
- **Next.js Server Actions** - Serverless functions
- **PostgreSQL** - Database
- **Prisma ORM** - Database client
- **Resend** - Email service
- **Cloudflare Turnstile** - Spam protection

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host:5432/rustam_db?schema=public"
RESEND_API_KEY="your_resend_api_key"
EMAIL_FROM="noreply@rustambattery.com"
NEXT_PUBLIC_TURNSTILE_SITE_KEY="your_site_key"
TURNSTILE_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run db:push          # Sync database schema
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # Check TypeScript
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/
│   ├── ui/             # ShadCN/UI components
│   ├── sections/       # Page sections
│   ├── forms/          # Form components
│   └── layout/         # Header, Footer
├── actions/            # Server actions
├── lib/                # Utilities & Prisma
└── types/              # TypeScript types

prisma/
├── schema.prisma       # Database schema
└── migrations/         # Database migrations
```

## Features

- ✨ Modern responsive design
- ⚡ High performance (Lighthouse 95+)
- 🔒 Type-safe with TypeScript
- 📱 Mobile-first responsive
- 🎯 SEO optimized
- ♿ WCAG 2.2 AA accessible
- 📧 Email integration (Resend)
- 🛡️ Security best practices
- 🚀 Production-ready deployment

## Deployment

**Frontend:** Vercel (auto-deploy from GitHub)
**Database:** Supabase PostgreSQL
**Email:** Resend API
**Spam Protection:** Cloudflare Turnstile

## License

© 2025 Rustam Battery & Solar Energy House
