# Travel & E-commerce Platform MVP

A full-stack platform combining travel booking and e-commerce functionality with shared authentication, payments, and admin infrastructure.

## Features

- 🌍 **Travel Booking**: Browse and book travel experiences
- 🛍️ **E-commerce**: Shop premium products
- 🔐 **Authentication**: Secure user accounts with NextAuth
- 💳 **Payments**: Stripe integration for secure transactions
- 👤 **User Dashboard**: Manage bookings and orders
- ⚙️ **Admin Panel**: Content management for travel listings and products

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Styling**: Vanilla CSS with modern design system
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account (for payments)

## Getting Started

### 1. Clone and Install

```bash
cd "d:/Travel & Ecommerce"
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/travel_ecommerce"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with sample data (optional)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── login/             # Authentication pages
│   ├── signup/
│   ├── travel/            # Travel booking pages
│   ├── shop/              # E-commerce pages
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── travel/           # Travel-specific components
│   └── shop/             # Shop-specific components
├── lib/                  # Utilities
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth configuration
│   └── stripe.ts         # Stripe client
└── types/                # TypeScript types
```

## Default Credentials

After seeding the database, you can use these credentials:

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Database Commands

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma db push` - Push schema changes to database
- `npx prisma generate` - Generate Prisma client
- `npx prisma db seed` - Seed database with sample data

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Hosting

- **Free**: Supabase, Neon, Railway
- **Paid**: AWS RDS, DigitalOcean

## License

MIT
