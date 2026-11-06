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

The custom-domain route is declared in `wrangler.jsonc`. Cloudflare must manage
the active DNS zone for `altivonglobal.com` to attach the domain and certificate.

## Current scope

The website preserves the reviewed frontend, scroll sequence, light/dark themes,
and enquiry review flow. `VITE_CLIENT_PREVIEW=true` keeps enquiry delivery
disabled and retains the existing preview noindex settings. No backend,
database, enquiry records, secrets or original source video are included.

Optimized images and film frames are included under `public/`. Original media
remain in the local design checkout for future re-encoding.
