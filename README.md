# Pet Marketplace Starter (Next.js + Supabase)

A minimal, no-hassle Latvian pet marketplace:
- Listings feed
- Post listing form with legal checkbox
- Report button
- Basic Terms & Privacy pages

## 1) Create accounts
- GitHub (free)
- Vercel (free) → will host your website
- Supabase (free) → database + storage

## 2) Create Supabase project
- Go to Supabase → New Project
- In SQL editor, paste **`/supabase/schema.sql`** (from this repo)
- Create a Storage bucket named **`listing-images`** and make it **Public**

## 3) Get your Supabase keys
- In Supabase → Settings → API:
  - copy **Project URL**
  - copy **anon public key**
- Put them into Vercel environment:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4) Deploy
- Push this project to your GitHub
- On Vercel: "Import Project" → select your repo → set environment variables
- After deploy, open your site URL

## 5) Local run (optional)
```bash
npm install
cp .env.example .env.local # then fill your keys
npm run dev
```
Open http://localhost:3000

## 6) Legal basics
When sellers post, they must tick the checkbox:
> I confirm this animal is microchipped, vaccinated (if applicable), registered according to Latvian law, and meets the legal age for sale. I understand I am responsible for compliance and that the platform is only a classifieds service.

Add your company details on the Terms & Privacy pages.

## 7) Hardening (later, optional)
- Enable RLS policies and auth for posting
- Add admin dashboard to remove reported listings
- Add Stripe for paid "featured" listings
