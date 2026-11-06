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
and enquiry review flow. `VITE_ENQUIRIES_ENABLED` controls form delivery separately
from the existing `VITE_CLIENT_PREVIEW` noindex setting. The enquiry receiver
runs in the Worker and saves to a private Google Sheet through Apps Script,
with team email alerts. See `backend/README.md` for configuration. Credentials,
enquiry records and original source video are excluded from this repository.

Optimized images and film frames are included under `public/`. Original media
remain in the local design checkout for future re-encoding.
