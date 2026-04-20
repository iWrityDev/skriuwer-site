import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found, Skriuwer.com",
  description: "The page you're looking for doesn't exist. Browse our book collection instead.",
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">&#128218;</div>
      <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">Page Not Found</h1>
      <p className="text-[var(--color-text-muted)] mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-primary">
          Go to Homepage
        </Link>
        <Link href="/books" className="btn-outline">
          Browse All Books
        </Link>
        <Link href="/blog" className="btn-outline">
          Read the Blog
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
        {[
          { label: "History Books", href: "/category/history" },
          { label: "Mythology Books", href: "/category/mythology" },
          { label: "Best Sellers", href: "/bestsellers" },
          { label: "Search", href: "/search" },
          { label: "Language Learning", href: "/category/language-learning" },
          { label: "Philosophy Books", href: "/category/philosophy" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] text-[var(--color-text-muted)] hover:text-[var(--color-orange)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
