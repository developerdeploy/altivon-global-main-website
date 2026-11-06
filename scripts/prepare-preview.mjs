import { mkdirSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createServer, loadEnv } from "vite";

const routes = ["", "products", "products/moringa-leaf-powder", "products/beetroot-powder", "products/ashwagandha-powder", "quality-documentation", "bulk-supply", "global-markets", "about", "request-quote", "contact", "privacy-policy", "enquiry-received"];
const env = loadEnv("production", process.cwd(), "VITE_");
const preview = env.VITE_CLIENT_PREVIEW === "true";
const origin = (env.VITE_SITE_URL || "https://altivonglobal.com").replace(/\/$/, "");
const base = (process.env.SITE_BASE_PATH || "/").replace(/\/$/, "");
const template = readFileSync("dist/index.html", "utf8")
  .replace(/<title>[\s\S]*?<\/title>/g, "")
  .replace(/<meta\b[^>]*(?:name="(?:robots|description|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g, "")
  // Keep the first paint independent of stylesheet round trips on mobile connections.
  .replace(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g, (_, href) => `<style data-critical>${readFileSync(resolve("dist", href.slice(base.length).replace(/^\//, "")), "utf8")}</style>`);
const assets = readdirSync("dist/assets");
const server = await createServer({ mode: "production", ssr: { noExternal: ["react-helmet-async"] }, server: { middlewareMode: true, watch: null }, appType: "custom", optimizeDeps: { noDiscovery: true, include: [] } });
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
  for (const route of [...routes, "404"]) {
    const result = await render(`/${route}`);
    const moduleName = route.startsWith("products/") ? "ProductDetailPage" : ({ "": "HomePage", products: "ProductsPage", "quality-documentation": "QualityDocumentationPage", "bulk-supply": "BulkSupplyPage", "global-markets": "GlobalMarketsPage", about: "AboutPage", "request-quote": "RequestQuotePage", contact: "ContactPage", "privacy-policy": "PrivacyPolicyPage", "enquiry-received": "EnquiryReceivedPage", "404": "NotFoundPage" })[route];
    const routeAsset = assets.find(file => file.startsWith(`${moduleName}-`) && file.endsWith(".js"));
    const routeCss = assets.find(file => file.startsWith(`${moduleName}-`) && file.endsWith(".css"));
    const resourceHints = result.html.match(/<link\b[^>]*rel="preload"[^>]*\/>/g) || [];
    const content = result.html.replace(/<link\b[^>]*rel="preload"[^>]*\/>/g, "");
    const hints = [
      ...resourceHints,
      ...(routeAsset ? [`<link rel="modulepreload" href="${base}/assets/${routeAsset}">`] : []),
      ...(routeCss ? [`<link rel="stylesheet" href="${base}/assets/${routeCss}">`] : []),
      ...(route === "" ? [`<link rel="preload" href="${base}/fonts/barlow-condensed-extrabold.woff2" as="font" type="font/woff2" crossorigin>`] : []),
    ].join("\n");
    const html = template.replace("</head>", `${result.head}\n${hints}\n</head>`).replace('<div id="root"></div>', `<div id="root">${content}</div>`);
    if (route === "404") writeFileSync("dist/404.html", html);
    else {
      const directory = resolve("dist", route);
      mkdirSync(directory, { recursive: true });
      writeFileSync(resolve(directory, "index.html"), html);
    }
  }
  const indexable = routes.filter(route => route !== "enquiry-received");
  writeFileSync("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(route => `  <url><loc>${origin}/${route}</loc></url>`).join("\n")}\n</urlset>\n`);
  writeFileSync("dist/robots.txt", preview ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /enquiry-received\nDisallow: /server/\n\nSitemap: ${origin}/sitemap.xml\n`);
  writeFileSync("dist/_headers", `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n${preview ? "  X-Robots-Tag: noindex, nofollow\n" : ""}\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n\n/brand/*\n  Cache-Control: public, max-age=2592000\n\n/images/*\n  Cache-Control: public, max-age=2592000\n\n/frames/*\n  Cache-Control: public, max-age=2592000\n\n/enquiry-received\n  X-Robots-Tag: noindex, follow\n\n/404.html\n  X-Robots-Tag: noindex, follow\n`);
  console.log(`Prerendered ${routes.length + 1} pages with crawlable content and unique metadata.`);
} finally {
  await server.close();
}
