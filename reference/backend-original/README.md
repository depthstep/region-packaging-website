# Region Packaging backend (Sanity + quote API)
1. Create a Sanity project (`npm create sanity@latest`) and note its project ID. Copy `.env.example` to `.env`.
2. `npm install`, then `npm run studio` to open the editor. Run `npm run import` to load the 8 categories and 32 sub-products as drafts.
3. Copy `app/api/quote/route.ts` into the Next.js site. Add a Resend account and verify your sending domain.
4. Set the env vars in Vercel. The write token must never be exposed to the browser.
