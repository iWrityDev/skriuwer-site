import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Gift Guides — Perfect Books for Every Reader",
  description:
    "Find the perfect book as a gift. Curated gift guides for history lovers, mythology fans, book clubs, and more — all available on Amazon with fast shipping.",
  alternates: { canonical: "https://skriuwer.com/gift-guides" },
};

const GUIDES = [
  {
    emoji: "🏛️",
    title: "Best Gifts for History Lovers",
    desc: "Top history books that make exceptional gifts — from ancient civilizations to modern conflicts. Beautifully written and thoroughly researched.",
    href: "/gift-guides/history-lovers",
    tags: ["History", "Nonfiction", "Ancient Civilizations"],
  },
  {
    emoji: "⚡",
    title: "Best Gifts for Mythology Fans",
    desc: "Greek gods, Norse sagas, Egyptian myths. Books for the person who loves ancient stories, fantasy worldbuilding, and the deeper meaning of legend.",
    href: "/gift-guides/mythology-fans",
    tags: ["Mythology", "Greek", "Norse"],
  },
  {
    emoji: "📖",
    title: "Best Books for Book Clubs",
    desc: "Books that generate great discussion: rich characters, moral complexity, fascinating history, and ideas that stick with you long after the last page.",
    href: "/gift-guides/book-club",
    tags: ["Discussion", "Group Reading", "Nonfiction"],
  },
];

export default function GiftGuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)] transition-colors">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)]">Gift Guides</span>
      </nav>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-8 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">Book Gift Guides</h1>
      </div>
      <p className="text-[var(--color-text-muted)] ml-4 mb-10 leading-relaxed max-w-2xl">
        Buying a book as a gift? These curated guides take the guesswork out of it.
        Every book links to Amazon — fast shipping, easy returns, all price points covered.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {GUIDES.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-orange)]/40 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{guide.emoji}</span>
              <h2 className="font-bold text-[var(--color-text)] text-base leading-snug group-hover:text-[var(--color-orange-light)] transition-colors">
                {guide.title}
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{guide.desc}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[11px] font-semibold bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-dim)] rounded uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-sm font-semibold text-[var(--color-orange)] group-hover:text-[var(--color-orange-light)] transition-colors">
              See the guide →
            </span>
          </Link>
        ))}
      </div>

      {/* Tips box */}
      <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl mb-8">
        <h2 className="font-bold text-[var(--color-text)] text-base mb-4">Tips for Buying Books as Gifts</h2>
        <ul className="space-y-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
          <li className="flex gap-2">
            <span className="text-[var(--color-orange)] font-bold flex-shrink-0">✓</span>
            <span>
              <strong className="text-[var(--color-text)]">Match the person&apos;s existing interests</strong> — a history lover will appreciate a well-researched narrative history far more than a self-help book.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-orange)] font-bold flex-shrink-0">✓</span>
            <span>
              <strong className="text-[var(--color-text)]">Check page count</strong> — a 450-page book is a commitment. For casual readers, 200–280 pages is the sweet spot.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-orange)] font-bold flex-shrink-0">✓</span>
            <span>
              <strong className="text-[var(--color-text)]">Reader reviews are your friend</strong> — all books in our guides have 4+ star ratings from real readers.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--color-orange)] font-bold flex-shrink-0">✓</span>
            <span>
              <strong className="text-[var(--color-text)]">Amazon delivers internationally</strong> — if the recipient is abroad, Amazon&apos;s local stores (UK, DE, NL, FR) carry these titles.
            </span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-sm text-[var(--color-text-dim)] mb-4">Looking for something more specific?</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/reading-lists" className="px-4 py-2 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange)]/50 transition-colors">
            All Reading Lists
          </Link>
          <Link href="/bestsellers" className="px-4 py-2 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange)]/50 transition-colors">
            Bestsellers
          </Link>
          <Link href="/search" className="px-4 py-2 border border-[var(--color-border)] rounded text-sm text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange)]/50 transition-colors">
            Search Books
          </Link>
        </div>
      </div>
    </div>
  );
}
