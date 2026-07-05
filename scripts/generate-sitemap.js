import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function slugify(title = "") {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const baseUrl = "https://defenceroger.com";
const urls = [
  "/",
  "/calculator",
  "/ssb-stories",
  "/mocks",
  "/about",
  "/test-series",
];

const blogsDir = path.join(rootDir, "src", "blogs");
for (const file of fs.readdirSync(blogsDir).filter((name) => name.endsWith(".json")).sort()) {
  const data = JSON.parse(fs.readFileSync(path.join(blogsDir, file), "utf8"));
  urls.push(`/blogs/${slugify(data.title)}`);
}

const storiesDir = path.join(rootDir, "src", "ssb_stories");
for (const file of fs.readdirSync(storiesDir).filter((name) => name.endsWith(".json")).sort()) {
  const data = JSON.parse(fs.readFileSync(path.join(storiesDir, file), "utf8"));
  urls.push(`/ssb-stories/${slugify(data.name)}`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
  .map((url) => `  <url>\n    <loc>${baseUrl}${url}</loc>\n  </url>`)
  .join("\n")}\n</urlset>\n`;

fs.writeFileSync(sitemapPath, xml, "utf8");
console.log(`Wrote ${urls.length} URLs to ${path.relative(rootDir, sitemapPath)}`);
