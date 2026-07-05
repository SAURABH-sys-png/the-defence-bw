import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import blogs from "../src/blogs/index.js";

const hostname = "https://defenceroger.com";

const sitemap = new SitemapStream({ hostname });

sitemap.write({ url: "/", changefreq: "daily", priority: 1.0 });
sitemap.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
sitemap.write({ url: "/calculator", changefreq: "weekly", priority: 0.9 });
sitemap.write({ url: "/mocks", changefreq: "weekly", priority: 0.8 });
sitemap.write({ url: "/ssb-stories", changefreq: "weekly", priority: 0.8 });

blogs.forEach((blog) => {
  sitemap.write({
    url: `/blogs/${blog.slug}`,
    changefreq: "monthly",
    priority: 0.8,
  });
});

sitemap.end();

streamToPromise(sitemap).then((sm) => {
  createWriteStream("./public/sitemap.xml").write(sm.toString());
});
