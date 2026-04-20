import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Skriuwer.com — Book Recommendations & Reviews",
    template: "%s – Skriuwer.com",
  },
  description:
    "Discover the best books across history, mythology, language learning, psychology, true crime, and more. Curated lists with Amazon affiliate links.",
  metadataBase: new URL("https://skriuwer.com"),
  openGraph: {
    siteName: "Skriuwer.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@skriuwer",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://skriuwer.com/feed.xml",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={40} />
              <span
                className="text-[1.15rem] font-extrabold text-[var(--color-orange-light)] hidden sm:inline"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", letterSpacing: "-0.01em" }}
              >
                Skriuwer
                <span
                  className="text-[var(--color-text-dim)] font-normal"
                  style={{ fontStyle: "normal", fontSize: "0.75em" }}
                >
                  .com
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-semibold uppercase tracking-wider ml-8">
              <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                Shop
              </Link>
              <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                Bestsellers
              </Link>
              {/* Categories dropdown */}
              <div className="relative group hidden sm:block">
                <button className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition cursor-pointer bg-transparent border-0 p-0 font-semibold uppercase tracking-wider text-sm">
                  Categories ▾
                </button>
                <div className="absolute top-full left-0 mt-1 w-52 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
                  {[
                    { label: "History", slug: "history" },
                    { label: "Dark History", slug: "dark-history" },
                    { label: "Conspiracy", slug: "conspiracy" },
                    { label: "Mythology", slug: "mythology" },
                    { label: "Religion & Spirituality", slug: "religion" },
                    { label: "Science & Nature", slug: "science" },
                    { label: "Language Learning", slug: "language-learning" },
                    { label: "Frisian Language", slug: "frisian" },
                    { label: "Self-Help", slug: "self-help" },
                  ].map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface-light)] transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/reading-lists" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                Reading Lists
              </Link>
              <Link href="/gift-guides" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                Gift Guides
              </Link>
              <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition hidden sm:inline">
                Blog
              </Link>
            </div>
            <div className="ml-auto flex items-center gap-3">
              {/* Search icon - desktop */}
              <Link
                href="/search"
                className="hidden sm:flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition text-sm"
                aria-label="Search books"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              {/* Mobile: hamburger */}
              <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition sm:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Browse</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/start-here" className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition font-semibold">Start Here</Link>
                  <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">All Books</Link>
                  <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Bestsellers</Link>
                  <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">History Books</Link>
                  <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mythology Books</Link>
                  <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Language Learning</Link>
                  <Link href="/gift-guides" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Gift Guides</Link>
                  <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                  <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Search</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Best Of Lists</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/best-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best History Books</Link>
                  <Link href="/best-mythology-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Mythology Books</Link>
                  <Link href="/best-conspiracy-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Conspiracy Books</Link>
                  <Link href="/best-dark-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Dark History Books</Link>
                  <Link href="/best-language-learning-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Language Learning Books</Link>
                  <Link href="/best-religion-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Religion Books</Link>
                  <Link href="/best-science-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Science Books</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Company</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">About Us</Link>
                  <Link href="/team" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Meet the Authors</Link>
                  <Link href="/authors/auke" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Auke</Link>
                  <Link href="/authors/jennifer-joseph" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Jennifer Joseph</Link>
                  <Link href="/authors/yahia-fathy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Author: Yahia Fathy</Link>
                  <Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Contact</Link>
                  <Link href="/affiliate-disclosure" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Affiliate Disclosure</Link>
                  <Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Privacy Policy</Link>
                  <Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Terms of Service</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Contact</h3>
                <div className="text-sm text-[var(--color-text-muted)] space-y-1">
                  <p className="font-semibold text-[var(--color-text)]">Skriuwer.com</p>
                  <p>Friesland, Netherlands</p>
                  <p className="mt-3">
                    <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
                      kontakt@skriuwer.com
                    </a>
                  </p>
                </div>
                {/* Social media */}
                <div className="flex gap-3 mt-5">
                  <a
                    href="https://www.facebook.com/learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@learnfrisian"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:bg-[var(--color-surface)] transition-colors border border-[var(--color-border)]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-dim)]">
              <p>As an Amazon Associate, Skriuwer earns from qualifying purchases. Book prices and availability are subject to change.</p>
              <p className="mt-1">&copy; {new Date().getFullYear()} Skriuwer.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
