# Quick Start Guide

## Important: Directory Path Issue

The current directory name "Travel & Ecommerce" contains spaces and special characters which can cause issues with some npm commands. For best results, consider renaming to `travel-ecommerce` or running commands from a different terminal.

## Setup Steps

### 1. Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
# Database - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://postgres:password@localhost:5432/travel_ecommerce"

# NextAuth - Generate a secret key
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Stripe (use test mode keys for development)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_key_here"
STRIPE_SECRET_KEY="sk_test_your_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Database Setup

**Option A: Using PostgreSQL locally**
1. Install PostgreSQL
2. Create a database: `CREATE DATABASE travel_ecommerce;`
3. Update DATABASE_URL in `.env`

**Option B: Using a cloud database (recommended for quick start)**
- Supabase: https://supabase.com (free tier available)
- Neon: https://neon.tech (free tier available)
- Railway: https://railway.app (free tier available)

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with sample data
npm run prisma:seed
```

If the above commands fail due to path issues, use these alternatives:

```bash
# Generate Prisma Client
node ./node_modules/prisma/build/index.js generate

# Push schema
node ./node_modules/prisma/build/index.js db push

# Seed database
node ./node_modules/tsx/dist/cli.mjs prisma/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Default Login Credentials

After seeding the database:

- **Admin Account**
  - Email: admin@example.com
  - Password: admin123

- **User Account**
  - Email: user@example.com
  - Password: user123

## Stripe Setup (Optional for MVP Testing)

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Stripe Dashboard
3. Add keys to `.env` file
4. Use test card: `4242 4242 4242 4242` with any future expiry and CVC

## Troubleshooting

### Path Issues
If you encounter "not recognized as an internal or external command" errors:
1. Rename the directory to remove spaces: `travel-ecommerce`
2. Or use PowerShell/CMD with quotes around paths
3. Or use Git Bash which handles spaces better

### Database Connection
If you can't connect to the database:
1. Verify PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Ensure database exists: `CREATE DATABASE travel_ecommerce;`

### Module Not Found Errors
If you see "Cannot find module" errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install --legacy-peer-deps --ignore-scripts`
3. Run `npm run prisma:generate`

## Next Steps

1. ✅ Dependencies installed
2. ⏳ Configure `.env` file
3. ⏳ Set up database (local or cloud)
4. ⏳ Run Prisma migrations
5. ⏳ Seed database
6. ⏳ Start development server
7. ⏳ Test authentication
8. ⏳ Test travel booking flow
9. ⏳ Test e-commerce flow

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── travel/       # Travel listing endpoints
│   │   └── products/     # Product endpoints
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── travel/           # Travel browsing
│   ├── shop/             # Product browsing
│   └── page.tsx          # Homepage
├── components/           # React components
│   └── ui/              # Reusable UI components
└── lib/                 # Utilities
    ├── prisma.ts        # Database client
    ├── auth.ts          # Auth configuration
    └── stripe.ts        # Stripe client
```

## Features Implemented

✅ Authentication (Login/Signup)
✅ Travel Listings Page
✅ Shop/Products Page
✅ Homepage with Hero Section
✅ Modern Dark Theme Design
✅ Responsive Layout
✅ Database Schema (Prisma)
✅ API Routes for Travel & Products
✅ Admin Authorization
✅ Sample Data Seed Script

## Features To Be Completed

The following features are defined in the codebase but need additional implementation:

- Travel detail page with booking
- Product detail page with cart
- User dashboard
- Admin panel
- Payment integration
- Booking/Order management

Refer to `implementation_plan.md` for the complete roadmap.
