# AltivonGlobal main website

React and Vite frontend configured for Cloudflare Workers Static Assets at
https://altivonglobal.com.

## Cloudflare deployment

Connect this repository to Workers Builds, select `main`, and use
`npx wrangler deploy` as the deploy command. Wrangler runs `npm run build`
through its build configuration and publishes `dist/`. No separate dashboard
build command is required. Use Node.js 22.12 or newer.

For a local deployment, authenticate with `npx wrangler login`, then run
`npx wrangler deploy`.

The hostname route is declared in `wrangler.jsonc`. Cloudflare must manage
the active DNS zone for `altivonglobal.com`, with a proxied root DNS record.
The route sends all root-domain requests to the Worker's static assets.

## Current scope

The website preserves the reviewed frontend, scroll sequence, light/dark themes,
and enquiry review flow. Mobile navigation is fixed to the bottom of the viewport.
`VITE_ENQUIRIES_ENABLED` controls form delivery separately from `VITE_CLIENT_PREVIEW`,
which is false in production so public pages are indexable. The enquiry receiver
runs in the Worker and saves to a private Google Sheet through Apps Script,
with team email alerts. See `backend/README.md` for configuration. Credentials,
enquiry records and original source video are excluded from this repository.

Optimized images and film frames are included under `public/`. Original media
remain in the local design checkout for future re-encoding.

## Product catalogues

`src/data/products.ts` holds the three client-supplied product entries. The home
page shows a brief collection; `/products` links to individual detail pages.
Original PDFs and extracted catalogue photographs are served locally under
`public/catalogues` and `public/images`. Do not turn unspecified batch values
or document listings into verified test results or certification claims.

Product identifiers must also be allowed in `api/worker.js` and mapped in
`backend/google-apps-script/Code.gs`. Deploy the Apps Script receiver before
the Worker when extending the product range. Existing Moringa URLs remain valid.

## Search and performance

The build prerenders the React pages into complete HTML with unique metadata,
canonical URLs, social previews and Organization / WebSite / BreadcrumbList /
Product structured data. Prices, reviews and availability are not fabricated.
Initial styles are included in the HTML to avoid blocking mobile first paint on
additional stylesheet requests; React hydrates the existing page content.
`scripts/prepare-preview.mjs` generates `dist/sitemap.xml`, `robots.txt`, cache
headers and a real 404 page. Cloudflare drops trailing slashes to match canonicals.
`public/llms.txt` describes the verified catalogue range; `/llm.txt` redirects to it.

Run `npm run build` followed by `npm run check:seo`. Browser checks in
`scripts/check-seo-browser.js` cover hydration, query-selected enquiries, themes
and mobile bottom navigation without sending an enquiry. Use a fresh production
build before prerendering; this is a build step, not a live server. Search Console
submission and indexing are separate from Lighthouse technical SEO scores.
