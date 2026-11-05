# Region Packaging website

Next.js 16 (App Router, TypeScript) with Payload CMS built in, self-hosted on our own server. The site's only goal is collecting quote requests.

Everything runs as one Node.js app: the website, the editing admin at `/admin`, and the quote API. Content lives in a SQLite database file and uploaded images in `uploads/` on the server. No outside services are needed (email uses any SMTP mailbox).

## Run it locally

```bash
npm install
cp .env.example .env      # then set PAYLOAD_SECRET to a long random string
npm run migrate           # creates the tables in data/payload.db
npm run seed              # loads the starter content and photos
npm run dev               # site: http://localhost:3000  admin: http://localhost:3000/admin
```

The first visit to `/admin` asks you to create the first admin user.

With `DATABASE_URI` unset, the site runs entirely from the starter content in `content/` instead of the database. The GitHub Pages preview uses this.

## Editing content (`/admin`)

- **Products > Categories / Sub-products**: each has tabs for Main (title, menu group, card text, card photo, menu icon), Gallery & form, Page sections and SEO. Leave a section's heading empty to hide it. How to order, pricing, why us, FAQs and form options fall back to Site settings when empty.
- **Content > Home page**: every home section. **Content > About page**: hero photos, mission and vision, who we are and stats, values (the "What we make" cards and the guides come from the Home page). **Reviews**, **Blog posts**.
- **Settings > Site settings**: top bar, phone, email, mega-menu promo, resources menu, stats, trusted-by logos, Google rating, trust strip, quote-form options, generic product-page sections, Contact Us page (banner, quote card, topic choices), CTA/coupon, footer, social links.
- **Quote requests**: every enquiry from the quote forms and the Contact Us form (those have a Topic), with the customer's artwork (only visible to logged-in staff). Tick "Handled" when done.
- **Content > Simple pages**: text pages at `/slug` (Paper Weight Chart, Privacy Policy, Terms, or new ones). Link to them from Site settings.
- **Settings > Site settings > Other pages**: headings and SEO for Products, FAQs, How To Order and Quote.
- Form labels and button text inside the quote and contact forms are in the code, not the admin.
- Saving anything refreshes the live pages and the sitemap straight away.
- Any image shown as a striped **Placeholder** box is waiting for a photo in the matching field.

## Logins

**Admins** do everything. **Editors** (the SEO team) manage all site content but cannot see quote requests, customer artwork or other logins. The first login made at `/admin` is an admin. Admins can add more under **Settings > Logins**, or from the server, which also prints a random password (running it again resets the password):

```bash
USER_EMAIL=seo@regionpackaging.com USER_ROLE=editor npm run create-user
```

## Search engines

`/sitemap.xml` lists every public page and updates on each save; `/robots.txt` points to it and keeps `/admin` and the API out. While `SITE_NOINDEX=1` is in `.env`, the sitemap is empty and all pages are blocked from search engines: use that until launch, then remove it, run `npm run build` and restart. The GitHub Pages preview is always blocked.

## Quote emails

Set the SMTP variables in `.env` (e.g. Hostinger email: `smtp.hostinger.com`, port 465, the mailbox address and password), plus `QUOTE_FROM_EMAIL` and `QUOTE_TO_EMAIL`. The team gets each enquiry with a link to it in the admin; the customer gets a confirmation. Without SMTP, enquiries are still saved under Quote requests.

## Contact messages in a Google Sheet (optional)

Contact Us messages can also be added as rows to a Google Sheet, alongside being saved under Quote requests:

1. Create the Google Sheet and share it only with the team.
2. In the sheet: **Extensions > Apps Script**. Paste in `scripts/contact-sheet.gs`, change `SECRET` to a long random string, and save.
3. **Deploy > New deployment > Web app**, with *Execute as: Me* and *Who has access: Anyone*. Approve the permission prompt and copy the URL that ends in `/exec`.
4. On the server, put `CONTACT_SHEET_URL=<that URL>` and `CONTACT_SHEET_SECRET=<the same secret>` in `.env`, then restart the app.

New messages appear on a "Contact messages" tab. *Anyone* only lets the website reach the script without a Google login: the secret stops anyone else adding rows, and the sheet stays private.

## The live server (Contabo VPS, Ubuntu 24.04)

Every push to `main` builds the site on GitHub Actions and uploads it to the server (`.github/workflows/deploy.yml`). Nothing is built on the server, and pending database migrations run when the app starts.

- `~/rp/app` (user `rp`): the built site, replaced on every deploy. Never edit it.
- `~/rp/shared`: `.env`, `data/payload.db` and `uploads/`. Deploys never touch this folder. Change a setting in `.env`, then run `sudo systemctl restart rp`.
- `~/rp/backups`: nightly copies of `shared`, made by `/usr/local/bin/rp-backup`.
- The site runs as the systemd service `rp` on `127.0.0.1:3000` (`journalctl -u rp` for its logs). Caddy (`/etc/caddy/Caddyfile`) handles the domain and renews the free HTTPS certificate on its own.
- Only SSH keys can log in, and the firewall allows ports 22, 80 and 443. Security updates install automatically.

**Activity log and versions.** Every change staff make in the admin is recorded in **Settings > Activity log** (admins only), down to the character, by `payload/activityLog.ts`. Entries can't be edited or deleted from the admin. Customers' quote form submissions and scripts aren't logged, as only logged-in people are. Site content also keeps its last 50 versions under each item's **Versions** tab, which can compare and restore them. A new field type needs no change, unless it's a new kind of nested field: `walk()` in that file must know how to go through it.

GitHub settings: variables `DEPLOY_HOST`, `DEPLOY_USER`, `SITE_URL`, `SITE_NOINDEX`; secrets `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS`. `SITE_NOINDEX=1` keeps search engines out. It's read both at build time and by the running site, so at launch delete the GitHub variable and the line in `~/rp/shared/.env`, then re-run the workflow.

After changing collections or fields in `payload/`, run `npx payload migrate:create <name>` (answer "create table" to its questions unless you really renamed something), then `npm run migrate`, and commit the new files in `payload/migrations/`. The database never changes on its own, locally or on the server: after pulling, run `npm run migrate`.

## Design preview (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`: type-check, full production build, then a static copy of the site is published to **https://depthstep.github.io/region-packaging-website/**. Progress is under the repo's **Actions** tab; the link updates a minute or two after a push.

The preview is plain files built from the starter content in `content/` (not the database), so admin edits don't appear there, the quote form shows a "design preview" notice instead of sending, and `/admin` is not included.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colours, type scale, radii) | `app/styles/tokens.css` |
| Shared components (buttons, section header, cards, accordion, placeholders) | `components/ui/`, `components/sections/` |
| Header + mega menus, mobile menu, footer | `components/layout/` |
| Home page sections | `components/home/HomeSections.tsx` |
| Product template (category + sub-product pages) | `components/product/ProductTemplate.tsx` |
| Quote form / API | `components/product/QuoteForm.tsx`, `app/api/quote` |
| About Us page | `app/(site)/about`, `app/styles/about.css` |
| Contact Us page | `app/(site)/contact`, `components/contact/ContactForm.tsx`, `app/styles/contact.css` |
| CMS schema (collections, globals, fields) | `payload.config.ts`, `payload/` |
| Admin routes (generated by Payload) | `app/(payload)/` |
| Starter content (seed + preview) | `content/`, loaded by `scripts/seed.ts` |
| Data loading (Payload or starter content) | `lib/data.ts`, `lib/cms/normalize.ts` |

`reference/backend-original/` is the unzipped original backend, kept for reference only.
