"""Add sleep-stories category to all sleep story blog posts."""
import os
import re

BLOG_DIR = os.path.join(os.path.dirname(__file__), '..', 'content', 'blog')

SLEEP_FILES = [
    'ancient-egypt-sleep-stories.md',
    'best-history-sleep-stories-youtube.md',
    'celtic-mythology-sleep-stories.md',
    'dark-history-sleep-stories.md',
    'greek-mythology-sleep-stories.md',
    'knights-templar-sleep-story.md',
    'learn-history-while-you-sleep.md',
    'lost-kingdoms-sleep-stories.md',
    'medieval-history-sleep-stories.md',
    'medieval-peasant-life-sleep-story.md',
    'mythology-for-sleep.md',
    'queen-elizabeth-sleep-story.md',
    'ww1-sleep-stories.md',
    'ww2-sleep-stories.md',
] + [f for f in os.listdir(BLOG_DIR) if f.startswith('sleep-story-')]

updated = 0
skipped = 0

for fname in SLEEP_FILES:
    path = os.path.join(BLOG_DIR, fname)
    if not os.path.exists(path):
        print(f'MISSING: {fname}')
        continue
    text = open(path, encoding='utf-8').read()
    if 'sleep-stories' in text:
        skipped += 1
        continue

    # Find categories: ["history"] and add sleep-stories
    def add_sleep(m):
        inner = m.group(2)
        sep = ', ' if inner.strip() else ''
        return m.group(1) + inner + sep + '"sleep-stories"' + m.group(3)

    new_text = re.sub(r'(categories:\s*\[)([^\]]*?)(\])', add_sleep, text)
    if new_text != text:
        open(path, 'w', encoding='utf-8').write(new_text)
        updated += 1
    else:
        print(f'NO MATCH: {fname}')

print(f'Done: {updated} updated, {skipped} already had sleep-stories')
