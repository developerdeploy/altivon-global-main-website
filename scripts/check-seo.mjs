import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const read = path => readFileSync(path, "utf8");
const sitemap = read("dist/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 12);
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
for (const url of urls) {
  const { pathname } = new URL(url);
  const html = read(`dist${pathname === "/" ? "" : pathname}/index.html`);
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Unique title: ${pathname}`);
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1: ${pathname}`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`href="${url}"`), `Self-referencing canonical: ${pathname}`);
  assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]{50,}"/);
  assert.doesNotMatch(html, /content="noindex/);
  assert.match(html, /<main[^>]*>[\s\S]+<h1/);
  const json = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  const graph = JSON.parse(json)["@graph"];
  assert.ok(graph.some(item => item["@type"] === "Organization"));
  if (pathname.startsWith("/products/")) {
    const product = graph.find(item => item["@type"] === "Product");
    assert.equal(product.url, url);
    assert.ok(product.image.startsWith("https://altivonglobal.com/images/"));
    assert.equal(product.offers, undefined, "No invented prices or stock claims");
    assert.equal(graph.find(item => item["@type"] === "BreadcrumbList").itemListElement.at(-1).item, url);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/(?:assets|images|brand|fonts)\/[^"?]+)(?:\?[^\"]*)?"/g)) {
    assert.ok(existsSync(`dist${match[1]}`), `Local resource exists: ${match[1]}`);
  }
}
assert.match(read("dist/robots.txt"), /Allow: \/\n/);
assert.doesNotMatch(read("dist/robots.txt"), /Disallow: \/\s*\n/);
assert.match(read("dist/robots.txt"), /Sitemap: https:\/\/altivonglobal.com\/sitemap.xml/);
assert.doesNotMatch(read("dist/_headers").split("/assets/*")[0], /noindex/);
for (const path of ["dist/404.html", "dist/enquiry-received/index.html"]) assert.match(read(path), /content="noindex/);
for (const product of ["moringa", "beetroot", "ashwagandha"]) assert.match(read("dist/llms.txt"), new RegExp(product, "i"));
console.log(`SEO checks passed: ${urls.length} crawlable prerendered pages, unique metadata, schema, sitemap and robots rules.`);
