"""
ping_google_index.py
---------------------
Submits blog post and book URLs to Google's Indexing API so they are
crawled and indexed within minutes rather than days.

Usage:
    python scripts/ping_google_index.py              # submit ALL URLs
    python scripts/ping_google_index.py --new-only   # only submit URLs not yet pinged

Requirements:
    pip install google-auth requests

Environment variables:
    GOOGLE_SERVICE_ACCOUNT_JSON   Path to the downloaded service account key file
                                  (optional — falls back to sitemap ping if absent)

------------------------------------------------------------------------
GOOGLE SERVICE ACCOUNT SETUP (one-time, ~5 minutes)
------------------------------------------------------------------------
1. Go to https://console.cloud.google.com/ and open (or create) a project.

2. Enable the "Web Search Indexing API":
   APIs & Services → Library → search "Web Search Indexing API" → Enable.

3. Create a Service Account:
   APIs & Services → Credentials → + Create Credentials → Service Account.
   Give it any name (e.g. "indexing-bot"), click Done.

4. Create a JSON key for that service account:
   Click the service account → Keys tab → Add Key → Create new key → JSON.
   Download the file and save it somewhere safe, e.g.:
       C:\\Users\\aukeh\\secrets\\google-indexing-sa.json

5. Add the service account as a verified owner of your site in Google
   Search Console:
   https://search.google.com/search-console/
   → Your property → Settings → Users and permissions → Add user
   Enter the service account email (looks like xxx@yyy.iam.gserviceaccount.com)
   and set permission to "Owner".

6. Set the environment variable:
   set GOOGLE_SERVICE_ACCOUNT_JSON=C:\\Users\\aukeh\\secrets\\google-indexing-sa.json
   (add to your .env or System Environment Variables for persistence)

7. Run: python scripts/ping_google_index.py --new-only

------------------------------------------------------------------------
Rate limits:
   Free tier: 200 URL submissions per day.
   This script sleeps 1 second between requests and stops at 200.
------------------------------------------------------------------------
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

import requests

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).parent.parent
BLOG_JSON = REPO_ROOT / "data" / "blog-posts.json"
BOOKS_JSON = REPO_ROOT / "data" / "books.json"
INDEXED_JSON = Path(__file__).parent / "indexed_urls.json"

BASE_URL = "https://skriuwer.com"
INDEXING_API = "https://indexing.googleapis.com/v3/urlNotifications:publish"
INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing"
SITEMAP_PING = "https://www.google.com/ping?sitemap=https://skriuwer.com/sitemap.xml"
DAILY_LIMIT = 200


# ---------------------------------------------------------------------------
# URL helpers
# ---------------------------------------------------------------------------

def collect_urls() -> list[str]:
    """Build the full list of URLs from blog posts and books."""
    urls = []

    if BLOG_JSON.exists():
        data = json.loads(BLOG_JSON.read_text(encoding="utf-8"))
        posts = data.get("posts", data) if isinstance(data, dict) else data
        for post in posts:
            slug = post.get("slug", "")
            if slug:
                urls.append(f"{BASE_URL}/blog/{slug}")
    else:
        print(f"WARNING: {BLOG_JSON} not found — skipping blog posts.", file=sys.stderr)

    if BOOKS_JSON.exists():
        data = json.loads(BOOKS_JSON.read_text(encoding="utf-8"))
        books = data.get("books", data) if isinstance(data, dict) else data
        for book in books:
            slug = book.get("slug", "")
            if slug:
                urls.append(f"{BASE_URL}/books/{slug}")
    else:
        print(f"WARNING: {BOOKS_JSON} not found — skipping books.", file=sys.stderr)

    return urls


def load_indexed_urls() -> list[str]:
    if INDEXED_JSON.exists():
        return json.loads(INDEXED_JSON.read_text(encoding="utf-8"))
    return []


def save_indexed_urls(indexed: list[str]) -> None:
    INDEXED_JSON.write_text(json.dumps(indexed, indent=2), encoding="utf-8")


# ---------------------------------------------------------------------------
# Authentication
# ---------------------------------------------------------------------------

def get_auth_token(sa_json_path: str) -> str | None:
    """Return a Bearer token using google-auth service account credentials."""
    try:
        from google.oauth2 import service_account
        from google.auth.transport.requests import Request as GoogleRequest

        creds = service_account.Credentials.from_service_account_file(
            sa_json_path,
            scopes=[INDEXING_SCOPE],
        )
        creds.refresh(GoogleRequest())
        return creds.token
    except ImportError:
        print(
            "ERROR: google-auth not installed. Run: pip install google-auth",
            file=sys.stderr,
        )
        return None
    except Exception as exc:
        print(f"ERROR obtaining auth token: {exc}", file=sys.stderr)
        return None


# ---------------------------------------------------------------------------
# Submission
# ---------------------------------------------------------------------------

def submit_url(url: str, token: str) -> bool:
    """POST a single URL to the Indexing API. Returns True on success."""
    payload = {"url": url, "type": "URL_UPDATED"}
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    resp = requests.post(INDEXING_API, json=payload, headers=headers, timeout=15)
    if resp.status_code in (200, 204):
        return True
    print(f"  WARN {resp.status_code} for {url}: {resp.text[:200]}", file=sys.stderr)
    return False


def fallback_sitemap_ping() -> None:
    """Ping Google with the sitemap URL (no auth needed, slower effect)."""
    print("No service account configured — falling back to sitemap ping...")
    try:
        resp = requests.get(SITEMAP_PING, timeout=15)
        if resp.status_code == 200:
            print(f"Sitemap ping successful: {SITEMAP_PING}")
        else:
            print(f"Sitemap ping returned HTTP {resp.status_code}")
    except Exception as exc:
        print(f"Sitemap ping failed: {exc}", file=sys.stderr)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Submit URLs to Google Indexing API"
    )
    parser.add_argument(
        "--new-only",
        action="store_true",
        help="Only submit URLs not already in indexed_urls.json",
    )
    args = parser.parse_args()

    sa_path = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()

    all_urls = collect_urls()
    print(f"Total URLs found: {len(all_urls)}")

    if args.new_only:
        already_indexed = set(load_indexed_urls())
        urls_to_submit = [u for u in all_urls if u not in already_indexed]
        print(f"New URLs to submit: {len(urls_to_submit)}")
    else:
        urls_to_submit = all_urls
        print(f"URLs to submit: {len(urls_to_submit)}")

    if not urls_to_submit:
        print("Nothing to submit.")
        return

    # ---- No service account: fall back to sitemap ping ----
    if not sa_path or not Path(sa_path).is_file():
        if sa_path:
            print(f"WARNING: Service account file not found at: {sa_path}")
        fallback_sitemap_ping()
        return

    # ---- Authenticated submissions ----
    token = get_auth_token(sa_path)
    if token is None:
        fallback_sitemap_ping()
        return

    already_indexed = load_indexed_urls() if args.new_only else load_indexed_urls()
    newly_indexed: list[str] = []
    submitted = 0
    failed = 0

    for url in urls_to_submit:
        if submitted >= DAILY_LIMIT:
            print(f"Daily limit of {DAILY_LIMIT} reached. Stopping.")
            break

        ok = submit_url(url, token)
        if ok:
            print(f"  Submitted: {url}")
            newly_indexed.append(url)
            submitted += 1
        else:
            failed += 1

        time.sleep(1)  # respect rate limit

    # Persist all successfully submitted URLs (merge with existing list)
    all_indexed = list(dict.fromkeys(already_indexed + newly_indexed))
    save_indexed_urls(all_indexed)

    print(f"\nSubmitted {submitted} new URL(s) to Google Indexing API.")
    if failed:
        print(f"Failed: {failed} URL(s) — check warnings above.")


if __name__ == "__main__":
    main()
