import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Start Here, Find Your Next Great Book",
  description:
    "New to Skriuwer? Start here. Find the best books by category, browse our top-ranked reading lists, and discover books our editors love.",
  alternates: { canonical: "https://www.skriuwer.com/start-here" },
};

const CATEGORIES = [
  {
    emoji: "🏛️",
    title: "History",
    subtitle: "Ancient civilizations to modern conflicts",
    desc: "The real story of how the world became what it is. Wars, empires, revolutions, and the people who made them.",
    href: "/category/history",
    bestOf: "/best-history-books",
    bestOfLabel: "Best History Books →",
  },
  {
    emoji: "⚡",
    title: "Mythology",
    subtitle: "Gods, heroes, and ancient legends",
    desc: "Greek, Norse, Egyptian, and world mythology, stories that explain everything about human nature and still do, 3,000 years later.",
    href: "/category/mythology",
    bestOf: "/best-mythology-books",
    bestOfLabel: "Best Mythology Books →",
  },
  {
    emoji: "🧠",
    title: "Psychology",
    subtitle: "How the mind really works",
    desc: "Why people do what they do, including you. The science of decision-making, memory, identity, and the surprising irrationality of the human brain.",
    href: "/category/psychology",
    bestOf: "/best-psychology-books",
    bestOfLabel: "Best Psychology Books →",
  },
  {
    emoji: "👤",
    title: "Biography",
    subtitle: "True stories of remarkable lives",
    desc: "Leaders, rebels, scientists, survivors. The best biographies collapse time and let you live inside another person's defining decisions.",
    href: "/category/biography",
    bestOf: "/best-biography-books",
    bestOfLabel: "Best Biography Books →",
  },
  {
    emoji: "🕵️",
    title: "Conspiracy & Dark History",
    subtitle: "What they left out of the textbooks",
    desc: "Cover-ups, hidden agendas, and the real events behind official accounts. Rigorously researched, these are facts, not fiction.",
    href: "/category/conspiracy",
    bestOf: "/best-conspiracy-books",
    bestOfLabel: "Best Conspiracy Books →",
  },
  {
    emoji: "🌍",
    title: "Language Learning",
    subtitle: "Master any language faster",
    desc: "Bilingual readers, grammar guides, and language learning books proven to work, including books in Frisian, Dutch, French, and German.",
    href: "/category/language-learning",
    bestOf: "/best-language-learning-books",
    bestOfLabel: "Best Language Books →",
  },
  {
    emoji: "💡",
    title: "Philosophy & Stoicism",
    subtitle: "Wisdom worth living by",
    desc: "From Plato to Nietzsche, from Marcus Aurelius to modern thinkers. Philosophy that actually changes how you navigate your life.",
    href: "/category/philosophy",
    bestOf: "/best-philosophy-books",
    bestOfLabel: "Best Philosophy Books →",
  },
];

export default function StartHerePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-dim)] mb-8">
        <Link href="/" className="hover:text-[var(--color-orange-light)] transition-colors">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)]">Start Here</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-8 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
          Find Your Next Great Book
        </h1>
      </div>
      <p className="text-[var(--color-text-muted)] ml-4 mb-10 leading-relaxed max-w-2xl">
        Skriuwer.com curates the best books in history, mythology, psychology, language learning, and more.
        Every book links directly to Amazon, no subscriptions, no sign-ups required. Browse by what you love
        below, or use the reading lists to find exactly what you need.
      </p>

      {/* Who we are, mini trust box */}
      <div className="mb-10 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl flex flex-col sm:flex-row gap-4 items-start">
        <span className="text-3xl">🏴󠁮󠁬󠁦󠁲󠁿</span>
        <div>
          <p className="font-semibold text-[var(--color-text)] text-sm mb-1">Built by readers, for readers</p>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            We are a small team of authors and editors based in Friesland, France, and Spain. We publish our own
            history and mythology books under the Skriuwer imprint, and we pick the best third-party books we
            can find. Every buy link is an Amazon affiliate link, we earn a small commission at no extra cost to you.{" "}
            <Link href="/about" className="text-[var(--color-orange-light)] hover:underline font-semibold">
              More about us →
            </Link>
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-orange)]/40 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{cat.emoji}</span>
              <div>
                <h2 className="font-bold text-[var(--color-text)] text-base leading-tight">{cat.title}</h2>
                <p className="text-xs text-[var(--color-orange-light)] font-semibold">{cat.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{cat.desc}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={cat.bestOf}
                className="text-sm font-semibold text-[var(--color-orange)] hover:text-[var(--color-orange-light)] transition-colors"
              >
                {cat.bestOfLabel}
              </Link>
              <Link
                href={cat.href}
                className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-orange-light)] transition-colors"
              >
                Browse all →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Reading lists CTA */}
      <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-orange)]/30 rounded-xl mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">📋</span>
          <h2 className="text-base font-bold text-[var(--color-text)]">30+ Curated Reading Lists</h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
          From{" "}
          <Link href="/best-ancient-rome-books" className="text-[var(--color-orange-light)] hover:underline">
            Best Ancient Rome Books
          </Link>{" "}
          to{" "}
          <Link href="/best-norse-mythology-books" className="text-[var(--color-orange-light)] hover:underline">
            Best Norse Mythology Books
          </Link>{" "}
          to{" "}
          <Link href="/best-true-crime-books" className="text-[var(--color-orange-light)] hover:underline">
            Best True Crime Books
          </Link>{" "}
         , we have a ranked reading list for every niche.
        </p>
        <Link
          href="/reading-lists"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white text-sm font-semibold rounded transition-colors"
        >
          See all reading lists →
        </Link>
      </div>

      {/* Gift guides CTA */}
      <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">🎁</span>
          <h2 className="text-base font-bold text-[var(--color-text)]">Buying a Book as a Gift?</h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
          Our gift guides help you pick the perfect book for the history lover, mythology fan, or bookworm in
          your life, with options at every price point.
        </p>
        <Link
          href="/gift-guides"
          className="text-sm font-semibold text-[var(--color-orange)] hover:text-[var(--color-orange-light)] transition-colors"
        >
          View gift guides →
        </Link>
      </div>
    </div>
  );
}
