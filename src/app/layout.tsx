import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Skriuwer.com - The Online Bookstore",
    template: "%s – Skriuwer.com",
  },
  description:
    "Discover bestselling books across history, mythology, language learning, and more. Boldly written. Independently published.",
  metadataBase: new URL("https://skriuwer.com"),
  openGraph: { siteName: "Skriuwer.com", type: "website" },
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
            <Link href="/" className="flex items-center gap-3">
              <Logo size={44} />
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
                    { label: "Mythology", slug: "mythology" },
                    { label: "Language Learning", slug: "language-learning" },
                    { label: "Frisian Language", slug: "frisian" },
                    { label: "Philosophy", slug: "philosophy" },
                    { label: "Psychology & Mind", slug: "psychology" },
                    { label: "Self-Help", slug: "self-help" },
                    { label: "Business & Finance", slug: "business" },
                    { label: "Biography & Memoir", slug: "biography" },
                    { label: "True Crime", slug: "true-crime" },
                    { label: "Science & Nature", slug: "science" },
                    { label: "Fiction", slug: "fiction" },
                    { label: "Dark History", slug: "dark-history" },
                    { label: "Religion & Spirituality", slug: "religion" },
                    { label: "Conspiracy", slug: "conspiracy" },
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
                  <Link href="/books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">All Books</Link>
                  <Link href="/bestsellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Bestsellers</Link>
                  <Link href="/category/history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">History Books</Link>
                  <Link href="/category/mythology" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Mythology Books</Link>
                  <Link href="/category/language-learning" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Language Learning</Link>
                  <Link href="/category/dark-history" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Dark History</Link>
                  <Link href="/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Blog</Link>
                  <Link href="/search" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Search</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Best Of Lists</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/best-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best History Books</Link>
                  <Link href="/best-greek-mythology-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Greek Mythology Books</Link>
                  <Link href="/best-roman-history-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Roman History Books</Link>
                  <Link href="/best-psychology-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Psychology Books</Link>
                  <Link href="/best-business-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Business Books</Link>
                  <Link href="/best-conspiracy-books" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Conspiracy Books</Link>
                  <Link href="/best-books-2026" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">Best Books of 2026</Link>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[var(--color-text)]">Company</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition">About Us</Link>
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
                  <p>Splitting 1, 9281 KJ</p>
                  <p>Harkema, Friesland, Netherlands</p>
                  <p className="mt-3">
                    <a href="mailto:kontakt@skriuwer.com" className="text-[var(--color-orange-light)] hover:underline">
                      kontakt@skriuwer.com
                    </a>
                  </p>
                  <p>WhatsApp: +31 630771404</p>
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
