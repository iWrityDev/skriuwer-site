"""
Blog scraper: visits all Shopify blog post URLs and extracts content.
Saves each post as a markdown file in content/blog/{slug}.md

MUST be run while Shopify is still live!

Usage: python scripts/scrape_blog.py
"""

import json
import os
import re
import time
from pathlib import Path

SOURCE_DIR = r"C:\Users\aukeh\Downloads\skriuwer_pinterest"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "content", "blog")


def main():
    from playwright.sync_api import sync_playwright

    # Load blog metadata
    with open(os.path.join(SOURCE_DIR, "blog_posts.json"), "r", encoding="utf-8") as f:
        blog_data = json.load(f)

    posts = [
        a for a in blog_data["articles"]
        if a["handle"] != "articles" and a["url"] != "https://skriuwer.com/blogs/articles"
    ]

    print(f"Found {len(posts)} blog posts to scrape")
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scraped = 0
    failed = 0
    skipped = 0

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        )
        page = context.new_page()

        for post in posts:
            output_path = os.path.join(OUTPUT_DIR, f"{post['handle']}.md")

            if os.path.exists(output_path):
                print(f"  SKIP: {post['handle']} (already exists)")
                skipped += 1
                continue

            try:
                print(f"  Scraping: {post['handle']}...")
                page.goto(post["url"], wait_until="domcontentloaded", timeout=30000)
                time.sleep(1)

                # Try common Shopify article selectors
                content = page.evaluate("""() => {
                    const selectors = [
                        'article .rte',
                        'article .article__content',
                        '.article-template__content',
                        '.shopify-section--article .rte',
                        'article .entry-content',
                        '.article__body',
                        'article .content',
                        '[data-article-content]',
                        '.article-content',
                        '.blog-article__content',
                        'article',
                    ];
                    for (const sel of selectors) {
                        const el = document.querySelector(sel);
                        if (el && el.innerHTML.trim().length > 100) {
                            return el.innerHTML.trim();
                        }
                    }
                    const main = document.querySelector('main');
                    return main ? main.innerHTML.trim() : '';
                }""")

                if not content or len(content) < 50:
                    print(f"  WARNING: No content for {post['handle']}")
                    failed += 1
                    continue

                # Clean up title for frontmatter
                title_escaped = post["title"].replace('"', '\\"')

                md = f"""---
title: "{title_escaped}"
date: ""
oldUrl: "{post['url']}"
categories: ["language-learning"]
---

{content}
"""
                with open(output_path, "w", encoding="utf-8") as f:
                    f.write(md)

                scraped += 1
                print(f"  OK: {post['handle']} ({len(content)} chars)")
                time.sleep(0.5)

            except Exception as e:
                print(f"  ERROR: {post['handle']} - {e}")
                failed += 1

        browser.close()

    print(f"\nDone! Scraped: {scraped}, Skipped: {skipped}, Failed: {failed}")
    print(f"Blog posts saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
