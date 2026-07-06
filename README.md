# Journey

A bilingual (Farsi/English) purchase website built with Next.js, Prisma, and Auth.js —
home page, product page with a working basket, contact form, and a full admin panel
for managing the product catalog. The seeded product is the iPhone 17 Pro Max.

This repo is also a teaching project: see the accompanying lesson for a step-by-step
walkthrough of how it's built and why.

## Getting started

```bash
npm install
cp .env.example .env      # then fill in AUTH_SECRET (see comment in the file)
npm run db:migrate        # creates prisma/dev.db and applies the schema
npm run db:seed           # creates the admin user + the iPhone 17 Pro Max product
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel is at `/admin/login`
(credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`, default
`admin@journey.dev` / `journey-admin`).

## Scripts

| Command             | What it does                                   |
| -------------------- | ----------------------------------------------- |
| `npm run dev`         | Start the dev server (Turbopack)                |
| `npm run build`       | Production build                                |
| `npm run start`       | Run the production build                        |
| `npm run lint`        | ESLint                                          |
| `npm run db:migrate`  | Apply Prisma migrations (creates `dev.db`)       |
| `npm run db:seed`     | Seed the admin user + iPhone 17 Pro Max product  |
| `npm run db:studio`   | Open Prisma Studio to browse the database        |

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS v4 · Prisma 7 (SQLite,
via the `better-sqlite3` driver adapter) · Auth.js (next-auth v5) for admin login ·
Zod for input validation.
