# Region Packaging website

Next.js 16 (App Router, TypeScript) + Sanity CMS + Resend, deployed on Vercel. The site's only goal is collecting quote requests.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

With no Sanity project ID set, the site runs entirely from the local seed content in `content/` (the Figma copy, the Figma photos and all 8 categories / 32 sub-products). The quote form works too: submissions are validated and printed to the terminal instead of being emailed.

## Connect the CMS (Sanity)

1. Create a project at sanity.io/manage (or `npx sanity init --bare`). Note the project ID.
2. Copy `.env.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In sanity.io/manage > API:
   - **CORS origins**: add `http://localhost:3000` and your live domain (allow credentials).
   - **Tokens**: create an *Editor* token and set it as `SANITY_API_WRITE_TOKEN` (server-only; used to store quote requests and artwork).
4. Load the starter content (all pages, photos uploaded as assets): `npm run seed:import`.
   This **replaces** documents with the same IDs, so run it once at the start, not after editors have made changes.
5. Open the editor at http://localhost:3000/studio (also available on the live site at `/studio`).

### Instant updates (ISR webhook)

Pages are static and refresh hourly on their own. For instant updates after publishing:
sanity.io/manage > API > Webhooks > Create:
- URL: `https://YOUR-DOMAIN/api/revalidate`
- Trigger on: Create, Update, Delete. Filter: leave empty. Projection: `{_type}`
- Secret: a long random string, also set as `SANITY_REVALIDATE_SECRET` in Vercel.

## Quote emails (Resend)

1. Create a Resend account and verify your sending domain.
2. Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL` (comma-separate several inboxes) and `QUOTE_FROM_EMAIL` (an address on the verified domain).

Each enquiry is saved in Sanity under **Quote requests** (when the write token is set) and emailed to the team, with a confirmation email to the customer.

## Artwork uploads up to 15MB

Vercel limits a request to the site to 4.5MB. To accept 15MB files, create a Blob store (Vercel > Storage > Blob) and connect it to the project; that adds `BLOB_READ_WRITE_TOKEN`. Files then upload straight from the browser to Blob storage. Without it, files go through `/api/quote` and anything over ~4.5MB is rejected on Vercel (local dev has no limit).

## Deploy (Vercel)

Import the repo in Vercel (framework preset: Next.js), add every variable from `.env.example`, and deploy. Set `NEXT_PUBLIC_SITE_URL` to the live URL.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colours, type scale, radii) | `app/styles/tokens.css` |
| Shared components (buttons, section header, cards, accordion, placeholders) | `components/ui/`, `components/sections/` |
| Header + mega menus, footer | `components/layout/` |
| Home page sections | `components/home/HomeSections.tsx` |
| Product template (category + sub-product pages) | `components/product/ProductTemplate.tsx` |
| Quote form / APIs | `components/product/QuoteForm.tsx`, `app/api/quote`, `app/api/artwork` |
| CMS schemas | `sanity/schemas/` |
| Local seed content (preview + CMS import) | `content/` |
| Data loading (Sanity or seed) | `lib/data.ts` |

### Editing content in the Studio

- **Site settings**: top bar, phone, email, mega-menu promo, resources menu, stats, trusted-by logos, Google rating, reviews heading, trust strip, quote-form options, generic product-page sections (how to order, pricing, why us, FAQs), CTA/coupon, footer, social links.
- **Home page**: every home section.
- **Categories / Sub-products**: same fields. Leave a section empty to hide it. How to order, pricing, why us, FAQs and form options fall back to Site settings when empty.
- Any image shown as a striped **Placeholder** box is waiting for a photo in the matching CMS field.

`reference/backend-original/` is the unzipped original backend, kept for reference only.
