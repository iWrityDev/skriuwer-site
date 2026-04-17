"""
Converts content/blog/*.md files into data/blog-posts.json
so Next.js can import the data at build time (no fs.readFileSync needed).

Usage: python scripts/build_blog_json.py
"""

import json
import os
import re

BLOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "content", "blog")
OUTPUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "blog-posts.json")


def parse_frontmatter(raw):
    match = re.match(r'^---\n(.*?)\n---\n?(.*)', raw, re.DOTALL)
    if not match:
        return {}, raw

    meta = {}
    for line in match.group(1).split('\n'):
        parts = line.split(': ', 1)
        if len(parts) == 2:
            key = parts[0].strip()
            val = parts[1].strip().strip('"')
            meta[key] = val

    return meta, match.group(2)


def main():
    posts = []

    if not os.path.exists(BLOG_DIR):
        print("No blog directory found")
        return

    files = sorted([f for f in os.listdir(BLOG_DIR) if f.endswith('.md') or f.endswith('.mdx')])

    for f in files:
        filepath = os.path.join(BLOG_DIR, f)
        with open(filepath, 'r', encoding='utf-8') as fh:
            raw = fh.read()

        meta, content = parse_frontmatter(raw)
        slug = re.sub(r'\.mdx?$', '', f)

        categories = meta.get('categories', '[]')
        categories = [c.strip().strip('"') for c in categories.strip('[]').split(',') if c.strip()]

        posts.append({
            'slug': slug,
            'title': meta.get('title', slug),
            'date': meta.get('date', ''),
            'oldUrl': meta.get('oldUrl', ''),
            'categories': categories,
            'content': content.strip(),
        })

    with open(OUTPUT, 'w', encoding='utf-8') as fh:
        json.dump({'posts': posts}, fh, ensure_ascii=False)

    print(f"Built {len(posts)} blog posts -> {OUTPUT}")
    # Print file size
    size_mb = os.path.getsize(OUTPUT) / 1024 / 1024
    print(f"File size: {size_mb:.1f} MB")


if __name__ == '__main__':
    main()
