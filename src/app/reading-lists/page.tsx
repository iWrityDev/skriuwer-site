import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best Book Reading Lists — Curated by Category",
  description:
    "Explore our curated reading lists — the best history books, best Greek mythology books, best psychology books, and more. Each list is ranked by reader popularity.",
  alternates: { canonical: "https://skriuwer.com/reading-lists" },
};

const LISTS = [
  {
    category: "History",
    lists: [
      { title: "Best History Books", href: "/best-history-books", desc: "Top-rated history books of all time" },
      { title: "Best Roman History Books", href: "/best-roman-history-books", desc: "From the Republic to the Fall of Rome" },
      { title: "Best Ancient Civilizations Books", href: "/best-ancient-civilizations-books", desc: "Egypt, Greece, Mesopotamia and beyond" },
      { title: "Best World War 2 Books", href: "/best-world-war-2-books", desc: "The definitive WW2 reading list" },
      { title: "Best Dark History Books", href: "/best-dark-history-books", desc: "The brutal truths history left out" },
      { title: "Best Books for History Lovers", href: "/best-books-for-history-lovers", desc: "Essential reads for any history buff" },
      { title: "Best Ancient Rome Books", href: "/best-ancient-rome-books", desc: "The Republic, Emperors, and the Fall" },
      { title: "Best Ancient Greece Books", href: "/best-ancient-greece-books", desc: "Athens, Sparta, and Greek philosophy" },
      { title: "Best Ancient Egypt Books", href: "/best-ancient-egypt-books", desc: "Pharaohs, pyramids, and the Nile" },
      { title: "Best Viking Books", href: "/best-viking-books", desc: "Norse raiders, explorers, and gods" },
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
    category: "Mind & Self-Improvement",
    lists: [
      { title: "Best Psychology Books", href: "/best-psychology-books", desc: "Understand the human mind" },
      { title: "Best Self-Help Books", href: "/best-self-help-books", desc: "Books that actually change your life" },
      { title: "Best Philosophy Books", href: "/best-philosophy-books", desc: "Wisdom from Plato to Nietzsche" },
      { title: "Best Stoicism Books", href: "/best-stoicism-books", desc: "Ancient wisdom for modern living" },
      { title: "Best Mindset Books", href: "/best-mindset-books", desc: "Train your brain for success" },
      { title: "Best Leadership Books", href: "/best-leadership-books", desc: "Lead with confidence and clarity" },
    ],
  },
  {
    category: "Business & Money",
    lists: [
      { title: "Best Business Books", href: "/best-business-books", desc: "From startups to global empires" },
    ],
  },
  {
    category: "Dark & Gripping",
    lists: [
      { title: "Best True Crime Books", href: "/best-true-crime-books", desc: "Real murders, heists, and serial killers" },
      { title: "Best Conspiracy Books", href: "/best-conspiracy-books", desc: "Cover-ups, hidden history, and power" },
      { title: "Best Thriller Books", href: "/best-thriller-books", desc: "Page-turners you cannot put down" },
    ],
  },
  {
    category: "Science & Knowledge",
    lists: [
      { title: "Best Science Books", href: "/best-science-books", desc: "Physics, biology, and the universe" },
      { title: "Best Biography Books", href: "/best-biography-books", desc: "True stories of remarkable lives" },
    ],
  },
  {
    category: "Language & Fiction",
    lists: [
      { title: "Best Language Learning Books", href: "/best-language-learning-books", desc: "Master any language faster" },
      { title: "Best Bilingual Books", href: "/best-bilingual-books", desc: "Learn while you read great stories" },
      { title: "Best Frisian Books", href: "/best-frisian-books", desc: "Literature and learning in Frisian" },
      { title: "Best Fiction Books", href: "/best-fiction-books", desc: "Timeless stories and modern classics" },
    ],
  },
  {
    category: "Religion & Spirituality",
    lists: [
      { title: "Best Religion Books", href: "/best-religion-books", desc: "From the Bible to Eastern thought" },
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
      {/* Breadcrumb */}
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
          <Link href="/blog" className="btn-outline text-sm">Read the Blog</Link>
        </div>
      </div>
    </div>
  );
}
