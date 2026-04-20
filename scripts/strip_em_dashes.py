#!/usr/bin/env python3
"""
Replace real em-dashes (U+2014, &mdash;) in src/ *.tsx / *.ts files
with commas or periods, per the CLAUDE.md voice rule.

v2: dropped the post-cleanup regexes from v1 — the `,\s+\.` cleanup
was eating JS spread syntax `,\n    ...(expr)` and turned `},\n    ...(` into `}...(`.
Now only literal string replacements, no regex. Box-drawing chars
(U+2500 ─, used in decorative comments like `// ── Schema:`) are
NOT the em-dash U+2014 and are left alone.
"""
import os, sys

ROOT = "src"
SKIP_DIRS = {"node_modules", ".next"}
SKIP_FILES = {
    "src/app/privacy-policy/page.tsx",
    "src/app/terms/page.tsx",
    "src/app/affiliate-disclosure/page.tsx",
}

# Order matters: longer patterns first so they match before the short ones.
REPLACEMENTS = [
    ("\u00a0\u2014\u00a0", ", "),       # NBSP em-dash NBSP
    (" \u2014 ", ", "),                   # space em-dash space (most common mid-sentence)
    (" \u2014", ","),                     # space em-dash (trailing)
    ("\u2014 ", ", "),                    # em-dash space (leading)
    ("\u2014", ", "),                     # bare em-dash fallback
    (" &mdash; ", ", "),
    ("&mdash; ", ", "),
    (" &mdash;", ","),
    ("&mdash;", ","),
]

def sweep(path):
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    original = src
    for old, new in REPLACEMENTS:
        src = src.replace(old, new)
    if src != original:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(src)
        return True
    return False

def main():
    changed = []
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    for root, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for fn in files:
            if not (fn.endswith(".tsx") or fn.endswith(".ts")):
                continue
            p = os.path.join(root, fn).replace("\\", "/")
            if p in SKIP_FILES:
                continue
            if sweep(p):
                changed.append(p)
    print(f"Modified {len(changed)} files")
    for p in changed[:10]:
        print(f"  {p}")
    if len(changed) > 10:
        print(f"  ... and {len(changed)-10} more")

if __name__ == "__main__":
    main()
