# Region Packaging: website build spec

Decisions and design facts gathered so far, for whoever builds the site next.

## Decisions
- Goal: quote requests only, sent to email (recipient address still to come). No cart or checkout. The cart, Sign In and payment logos in the design have no function yet; confirm whether to keep them.
- Desktop first. Mobile and tablet designs are not confirmed.
- Stack: Next.js (App Router, TypeScript) + Sanity CMS + Vercel. Quote emails via Resend. Images through the Sanity CDN / next/image.
- Products change weekly, so all content (categories, products, menu, home sections, reviews, FAQs, site settings) lives in the CMS. Pages use on-demand revalidation from a Sanity webhook.
- Use placeholders for photos and for icons not yet supplied.

## Figma
- File key `IrUtPPRWQxs5bZlfoO6DaD`. Pages: Style Guide and Dev space (208:67), Visual Design (0:1), Extras (16:260).
- Frames on Visual Design: Nav-bar 193:1446, Home Page 87:24 (1690 x 12272), Product Page 193:692 (1690 x 15778).
- Artboard is 1690 wide. The content column runs from x=245 to x=1445, so the container is 1200px.
- Free Figma plan: the connector allows very few calls per month. Image and SVG download links from Figma are blocked in the cloud workspace, so export photos and icons by hand.
- Full page copy is in `claude/design-copy.md`.

## Design tokens
- Font: Archivo (Google Fonts). Headings are Bold and UPPERCASE with line-height about 0.95. Body is Regular.
- Type scale: H1 40, H2 35, H3 25, H4 22, P1 18, P2 16, P3 14 (px). Hero body is 18px with a 22.76px line height.
- Colors:
  - Primary Blue `#012F8D`
  - Sky Accent `#8FB8FF`
  - Light Background `#F1EEE5`
  - Stroke `#CBCBCB`
  - Black `#000000`
  - Body text black at 70% (`rgba(0,0,0,.7)`, about `#4D4D4D`)
  - On dark backgrounds, body text is white at 70%
  - FSC banner uses a pale green background and a dark green badge
- Buttons are pills (radius 35px, padding 15px 30px, 20px text): primary filled blue, secondary outlined blue.
- Section eyebrows are small Sky Accent text above each H2. Cards are Light Background with large radius (about 30px).

## Pages and sections
**Header (all pages):** sky top bar (promo text with sparkle, search, cart, Sign In), then a white bar with logo, Custom Boxes / Boxes By Industry / Resources dropdowns, phone, and an outlined Get a Quote button. The mega menu has columns of icon + item with a blue promo card ("Free custom dieline & 3D mockup", button "Choose Your Box"). The design's menu items are placeholders. Use the 8 categories / 32 sub-products from the Sub Products sheet: Mailer, Folding Cartons and Rigid under Custom Boxes; Apparel, Cosmetic, Food, Soap and Candle under By Industry. Resources: Blogs, FAQs, How To Order, Paper Weight Chart.

**Home:**
1. Hero: beige, rating line, H1, intro, CTA, three stats, image slider with arrows.
2. Trusted-by brand strip.
3. Choose Your Box: six cards.
4. Order in 4 steps: beige.
5. Custom Boxes by Industry: pill tabs and three cards.
6. Order Any Quantity: text plus four feature cards.
7. Packaging Design, Done For You: blue dieline panel plus sky panel with three bullets.
8. Eco-friendly / FSC banner.
9. Custom Boxes With Your Logo: beige, text, bullets and image.
10. Reviews: Google summary and six cards.
11. Free sample pack banner.
12. FAQ accordion.
13. Packaging, Explained: three blog cards.
14. Ready to manufacture CTA with FIRST10 coupon.
15. Footer.

**Product template** (designed as Custom Mailer Boxes; the breadcrumb Home / Custom Boxes / Custom Mailer Boxes shows it is the category page; reuse the same template for sub-products):
1. Gallery with thumbnails, sticky while scrolling.
2. Quote form card:
   - Title, rating, description and three checks
   - Selects: Material, Size, Printing, Production Speed, Quantity, Design
   - Artwork upload (PDF/EPS/PNG/JPG, max 15MB)
   - Name, phone, email and message fields
   - "Send Inquiry" button and an "order a free sample" link
3. Trust strip: five icons.
4. Explore styles: sub-product cards with "Customize Now".
5. Overview: three images plus text.
6. Benefits: text plus four cards.
7. Specs table and Popular Stock Sizes table.
8. Materials: three cards with badges.
9. Printing & finishing.
10. Industries & use cases: pills.
11. How to order: four numbered steps on sky.
12. Pricing: blue, with three cards.
13. Why choose us: three cards.
14. Reviews.
15. Related products carousel.
16. FAQ.
17. CTA and footer.

Mailer-specific text blocks under sections 7, 8, 10, 11 and 13 should be CMS fields.

## Assets received
- Logo `Group 20.svg`.
- Menu icons: `mailer-box 1.svg`, `burger-box 1.svg`, `box-insert 1.svg`, and `Path 7419.svg` (possibly the gift box; confirm).
- Still missing: step, feature, trust and benefit icons; the FSC badge; social icons; payment logos; all photos; the real menu structure; the FAQ answers beyond the minimum-order question; the quote recipient email.
- The phone number, reviews, brand names and stats in the design are placeholders.

## Backend already written
Sanity schemas (category, product, siteSettings, quoteRequest), seed data from the sheet, and the `/api/quote` route (zod validation, honeypot, artwork upload to Sanity, team and customer emails via Resend) are in `region-backend.zip` from the chat. Plan to extend the schemas so categories and products share the rich product-page fields.
