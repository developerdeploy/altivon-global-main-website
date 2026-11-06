import {
  copyFileSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { resolve } from "node:path";

// Preserve direct links on static hosting without needing a Node backend.
const routes = [
  "products/moringa-leaf-powder",
  "quality-documentation",
  "bulk-supply",
  "global-markets",
  "about",
  "request-quote",
  "contact",
  "privacy-policy",
  "enquiry-received",
  "moringa-oleifera",
  "products/moringa-oleifera",
  "moringa-leaf-powder",
];
const baseHtml = readFileSync(resolve("dist/index.html"), "utf8");
const assets = readdirSync(resolve("dist/assets"));
const base = (process.env.SITE_BASE_PATH || "/").replace(/\/$/, "");
const productRoutes = new Set([
  "products/moringa-leaf-powder",
  "moringa-oleifera",
  "products/moringa-oleifera",
  "moringa-leaf-powder",
]);
const routeModules = {
  "": "HomePage",
  "quality-documentation": "QualityDocumentationPage",
  "bulk-supply": "BulkSupplyPage",
  "global-markets": "GlobalMarketsPage",
  about: "AboutPage",
  "request-quote": "RequestQuotePage",
  contact: "ContactPage",
  "privacy-policy": "PrivacyPolicyPage",
  "enquiry-received": "EnquiryReceivedPage",
};
function pageHtml(route) {
  const moduleName = productRoutes.has(route)
    ? "MoringaProductPage"
    : routeModules[route];
  const names = [
    moduleName,
    "images",
    ...(route === "" || productRoutes.has(route) ? ["ProductImage"] : []),
  ];
  const links = names
    .map((name) =>
      assets.find(
        (file) => file.startsWith(`${name}-`) && file.endsWith(".js"),
      ),
    )
    .filter(Boolean)
    .map((file) => `<link rel="modulepreload" href="${base}/assets/${file}">`);
  if (productRoutes.has(route))
    links.push(
      `<link rel="preload" as="image" href="${base}/images/moringa-studio-powder-960.webp" imagesrcset="${base}/images/moringa-studio-powder-320.webp 320w, ${base}/images/moringa-studio-powder-512.webp 512w, ${base}/images/moringa-studio-powder-960.webp 960w, ${base}/images/moringa-studio-powder-1440.webp 1440w" imagesizes="(max-width: 767px) 92vw, 50vw" fetchpriority="high">`,
    );
  return baseHtml.replace("</head>", `${links.join("\n")}\n</head>`);
}
for (const route of routes) {
  const directory = resolve("dist", route);
  mkdirSync(directory, { recursive: true });
  writeFileSync(resolve(directory, "index.html"), pageHtml(route));
}
writeFileSync(resolve("dist/index.html"), pageHtml(""));
writeFileSync(resolve("dist/robots.txt"), "User-agent: *\nDisallow: /\n");
writeFileSync(
  resolve("dist/_headers"),
  "/*\n  X-Robots-Tag: noindex, nofollow\n",
);
copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"));
writeFileSync(resolve("dist/.nojekyll"), "");
console.log(`Prepared ${routes.length + 1} preview routes.`);
