/**
 * Blog scraper: visits all 116 Shopify blog post URLs and extracts the full HTML content.
 * Saves each post as a markdown file in content/blog/{slug}.md
 *
 * MUST be run before canceling Shopify!
 *
 * Prerequisites: npm install playwright
 * Usage: npx tsx scripts/scrape-blog.ts
 */

import fs from "fs";
import path from "path";

// We dynamically import playwright since it may not be installed yet
async function main() {
  const { chromium } = await import("playwright");

  const sourceDir = "C:/Users/aukeh/Downloads/skriuwer_pinterest";
  const outputDir = path.join(__dirname, "..", "content", "blog");

  // Load blog post metadata
  const blogData: {
    articles: { title: string; handle: string; url: string }[];
  } = JSON.parse(
    fs.readFileSync(path.join(sourceDir, "blog_posts.json"), "utf-8")
  );

  // Filter out the index page
  const posts = blogData.articles.filter(
    (a) => a.handle !== "articles" && a.url !== "https://skriuwer.com/blogs/articles"
  );

  console.log(`Found ${posts.length} blog posts to scrape`);
  fs.mkdirSync(outputDir, { recursive: true });

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let scraped = 0;
  let failed = 0;

  for (const post of posts) {
    const outputPath = path.join(outputDir, `${post.handle}.md`);

    // Skip if already scraped
    if (fs.existsSync(outputPath)) {
      console.log(`  SKIP: ${post.handle} (already exists)`);
      scraped++;
      continue;
    }

    try {
      console.log(`  Scraping: ${post.url}`);
      await page.goto(post.url, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Try common Shopify blog article selectors
      const content = await page.evaluate(() => {
        const selectors = [
          "article .rte",
          "article .article__content",
          ".article-template__content",
          ".shopify-section--article .rte",
          "article .entry-content",
          ".article__body",
          "article .content",
          "[data-article-content]",
          ".article-content",
          "article",
        ];

        for (const sel of selectors) {
          const el = document.querySelector(sel);
          if (el && el.innerHTML.trim().length > 100) {
            return el.innerHTML.trim();
          }
        }

        // Fallback: get main content area
        const main = document.querySelector("main");
        return main ? main.innerHTML.trim() : "";
      });

      if (!content || content.length < 50) {
        console.log(`  WARNING: No content found for ${post.handle}`);
        failed++;
        continue;
      }

      // Write markdown file with frontmatter
      const md = `---
title: "${post.title.replace(/"/g, '\\"')}"
date: ""
oldUrl: "${post.url}"
categories: ["language-learning"]
---

${content}
`;

      fs.writeFileSync(outputPath, md);
      scraped++;
      console.log(`  OK: ${post.handle} (${content.length} chars)`);

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.log(`  ERROR: ${post.handle} - ${err}`);
      failed++;
    }
  }

  await browser.close();

  console.log(`\nDone! Scraped: ${scraped}, Failed: ${failed}`);
  console.log(`Blog posts saved to: ${outputDir}`);
}

main().catch(console.error);
