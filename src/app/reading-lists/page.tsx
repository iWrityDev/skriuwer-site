import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Book Reading Lists — Curated by Category",
  description:
    "Explore our curated reading lists — the best history books, best mythology books, best conspiracy books, best language learning books, and more. Each list ranked by reader popularity.",
  alternates: { canonical: "https://skriuwer.com/reading-lists" },
};

const LISTS = [
  {
    category: "History",
    lists: [
      { title: "Best History Books", href: "/best-history-books", desc: "Top-rated history books of all time" },
      { title: "Best Dark History Books", href: "/best-dark-history-books", desc: "The brutal truths history left out" },
      { title: "Best Conspiracy Books", href: "/best-conspiracy-books", desc: "Cover-ups, hidden history, and power" },
      { title: "Best Books for History Lovers", href: "/best-books-for-history-lovers", desc: "Essential reads for any history buff" },
      { title: "Best Ancient Rome Books", href: "/best-ancient-rome-books", desc: "The Republic, Emperors, and the Fall" },
      { title: "Best Viking Books", href: "/best-viking-books", desc: "Norse raiders, explorers, and gods" },
      { title: "Best World War 2 Books", href: "/best-world-war-2-books", desc: "The definitive WW2 reading list" },
      { title: "Best Ancient Egypt Books", href: "/best-ancient-egypt-books", desc: "Pharaohs, pyramids, and the Nile" },
    ],
  },
  {
    category: "Mythology",
    lists: [
      { title: "Best Mythology Books", href: "/best-mythology-books", desc: "Myths from cultures around the world" },
      { title: "Best Greek Mythology Books", href: "/best-greek-mythology-books", desc: "Gods, heroes, and the Trojan War" },
      { title: "Best Norse Mythology Books", href: "/best-norse-mythology-books", desc: "Odin, Thor, Loki and Ragnarök" },
      { title: "Best Egyptian Mythology Books", href: "/best-egyptian-mythology-books", desc: "Ra, Osiris, and the gods of the Nile" },
    ],
  },
  {
    category: "Religion & Science",
    lists: [
      { title: "Best Religion Books", href: "/best-religion-books", desc: "From the Bible to Eastern thought" },
      { title: "Best Science Books", href: "/best-science-books", desc: "Physics, biology, and the universe" },
    ],
  },
  {
    category: "Language Learning",
    lists: [
      { title: "Best Language Learning Books", href: "/best-language-learning-books", desc: "Master any language faster" },
      { title: "Best Frisian Books", href: "/best-frisian-books", desc: "Literature and learning in Frisian" },
    ],
  },
  {
    category: "Self-Improvement",
    lists: [
      { title: "Best Self-Help Books", href: "/best-self-help-books", desc: "Books that actually change your life" },
    ],
  },
  {
    category: "Annual Lists",
    lists: [
      { title: "Best Books of 2026", href: "/best-books-2026", desc: "The standout reads of the year" },
    ],
  },
];

export default function ReadingListsPage() {
  const totalLists = LISTS.reduce((sum, group) => sum + group.lists.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)]">Reading Lists</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Reading Lists</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-10 ml-5">
        {totalLists} curated reading lists — every book ranked by reader popularity.
      </p>

      <div className="space-y-10">
        {LISTS.map((group) => (
          <section key={group.category}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 bg-[var(--color-orange)] rounded-full" />
              <h2 className="text-lg font-bold text-[var(--color-text)]">{group.category}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.lists.map((list) => (
                <Link
                  key={list.href}
                  href={list.href}
                  className="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors mb-0.5">
                      {list.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-dim)]">{list.desc}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-[var(--color-text-dim)] group-hover:text-[var(--color-orange)] transition-colors flex-shrink-0 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center">
        <p className="text-[var(--color-text-muted)] text-sm mb-4">
          Looking for something specific?
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/books" className="btn-outline text-sm">Browse All Books</Link>
          <Link href="/search" className="btn-outline text-sm">Search Books</Link>
          <Link href="/gift-guides" className="btn-outline text-sm">Gift Guides</Link>
        </div>
      </div>
    </div>
  );
}
