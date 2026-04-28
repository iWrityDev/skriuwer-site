import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.skriuwer.com",
    languages: {
      en: "https://www.skriuwer.com",
      de: "https://www.skriuwer.com/de",
      nl: "https://www.skriuwer.com/nl",
      fr: "https://www.skriuwer.com/fr",
      es: "https://www.skriuwer.com/es",
      it: "https://www.skriuwer.com/it",
      pt: "https://www.skriuwer.com/pt",
    },
  },
};
import { BookGrid } from "@/components/BookGrid";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeader } from "@/components/SectionHeader";
import { StarRating } from "@/components/StarRating";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { getFeaturedBooks, getBestsellers, getAllBooks, getRecentlyAdded } from "@/lib/books";
import { getAllBlogPosts } from "@/lib/blog";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { CATEGORIES, getCategoryCssVar } from "@/lib/categories";
import type { Book } from "@/lib/types";
import type { CSSProperties } from "react";

function FeaturedBook({ book }: { book: Book }) {
  return (
    <div className="featured-card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[var(--color-gold)]">&#9813;</span>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-gold)]">
          Featured This Week
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <div>
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[var(--color-surface-light)] flex items-center justify-center">
            {book.coverImage && book.coverImage.startsWith("http") ? (
              <Image
                src={book.coverImage}
                alt={book.title}
                fill
                className="object-cover"
                sizes="240px"
                priority
                unoptimized
              />
            ) : (
              <span className="text-6xl">📚</span>
            )}
          </div>
          {book.starRating && (
            <div className="flex justify-center mt-3">
              <StarRating rating={book.starRating} />
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
            {book.title}
          </h2>
          <p className="text-[var(--color-orange)] text-sm font-semibold uppercase tracking-wide mb-4">
            By {book.author}
          </p>
          {book.hookText && (
            <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-wide mb-4">
              {book.hookText}
            </p>
          )}
          <div
            className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 line-clamp-5"
            dangerouslySetInnerHTML={{
              __html: book.description.replace(/<[^>]*>/g, " ").slice(0, 400) + "...",
            }}
          />
          <p className="text-[var(--color-text-dim)] text-sm mb-6">
            <Link href={`/books/${book.slug}`} className="text-[var(--color-orange)] hover:underline">
              Read more &darr;
            </Link>
          </p>
          <div className="flex flex-wrap gap-3">
            {book.asin && (
              <a
                href={buildAffiliateUrl(book.asin)}
                className="btn-primary"
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                View on Amazon
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <Link href={`/books/${book.slug}`} className="btn-outline">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skriuwer.com",
  url: "https://www.skriuwer.com",
  description: "An affiliate book discovery site specializing in history, mythology, language learning, and more.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Friesland",
    addressCountry: "NL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "kontakt@skriuwer.com",
    contactType: "customer service",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Skriuwer.com",
  url: "https://www.skriuwer.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.skriuwer.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  const featured = getFeaturedBooks(25);
  const bestsellers = getBestsellers(12);
  const recentlyAdded = getRecentlyAdded(8);
  const allBooks = getAllBooks();
  const recentPosts = getAllBlogPosts().slice(0, 6);
  const searchItems = allBooks.map((b) => ({
    slug: b.slug,
    title: b.title,
    author: b.author,
    categories: b.categories,
  }));

  // Pick a featured book, own book, English, with cover and description
  const featuredBook =
    featured
      .filter(
        (b) =>
          b.language === "en" &&
          b.description.length > 100 &&
          b.coverImage &&
          b.coverImage.startsWith("http")
      )
      .sort((a, b) => b.reviewCount - a.reviewCount)[0] ||
    featured.find((b) => b.language === "en" && b.description.length > 100 && b.coverImage) ||
    featured.find((b) => b.description.length > 100 && b.coverImage) ||
    featured[0];

  const ownBookCount = allBooks.filter((b) => b.isOwnBook).length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <div>
      {/* Hero */}
      <section className="hero-glow relative">
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-gold-dim)] text-[var(--color-gold)] border border-[color-mix(in_srgb,var(--color-gold)_25%,transparent)]">
            ♕ Skriuwer.com
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-[1.1] tracking-tight">
            Find your next
            <span
              className="relative inline-block mx-2"
              style={{
                backgroundImage: "var(--color-orange-gradient)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              unforgettable read.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
            {allBooks.length}+ curated titles across history, mythology, language learning,
            true crime and more. {ownBookCount} of them written by us, every one of them
            worth your time.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/books" className="btn-primary">Browse all books</Link>
            <Link href="/start-here" className="btn-outline">Start here</Link>
          </div>
        </div>

        {/* Search bar, visually attached to the hero */}
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl py-3.5 px-6 flex justify-center">
            <SearchBar variant="hero" items={searchItems} />
          </div>
        </div>
      </section>

      {/* Featured Book */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <FeaturedBook book={featuredBook} />
      </section>

      {/* Recently viewed, only renders for returning visitors with localStorage */}
      <div className="max-w-7xl mx-auto px-4">
        <RecentlyViewed title="Pick up where you left off" />
      </div>

      {/* New Arrivals */}
      {recentlyAdded.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <SectionHeader
            title="New Arrivals"
            tone="teal"
            link={{ href: "/books", label: "Browse all" }}
          />
          <BookGrid books={recentlyAdded} columns={4} />
        </section>
      )}

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto pt-10 pb-10 mt-4 section-divider">
          <div className="px-4">
            <SectionHeader
              title="Most Popular Books"
              tone="gold"
              link={{ href: "/bestsellers", label: "View all" }}
            />
            <BookGrid books={bestsellers} columns={4} />
          </div>
        </section>
      )}

      {/* Our Books */}
      <section className="max-w-7xl mx-auto pt-10 pb-10 mt-4 section-divider">
        <div className="px-4">
          <SectionHeader
            title="Our Books"
            icon="★"
            link={{ href: "/books", label: "View all" }}
            subtitle={`${ownBookCount} books written and published under Skriuwer.com`}
          />
          <BookGrid books={featured.slice(0, 20)} columns={5} />
          <div className="text-center mt-8">
            <Link href="/books" className="btn-outline">VIEW ALL BOOKS</Link>
          </div>
        </div>
      </section>

      {/* Categories with per-category color */}
      <section className="max-w-7xl mx-auto pt-10 pb-10 mt-4 section-divider">
        <div className="px-4">
          <SectionHeader
            title="Browse by Category"
            tone="teal"
            subtitle="Every category has its own hand-picked collection."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => {
              const style = {
                "--cat-color": `var(${getCategoryCssVar(cat.slug)})`,
              } as CSSProperties;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  style={style}
                  className="group relative p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] transition-all hover:-translate-y-0.5"
                  data-cat={cat.slug}
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ background: "var(--cat-color)" }}
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="cat-dot" />
                    <h3 className="font-bold text-sm text-[var(--color-text)] transition-colors" style={{ color: "inherit" }}>
                      <span className="group-hover:text-[color-mix(in_srgb,var(--cat-color)_75%,white)] transition-colors">
                        {cat.name}
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] leading-snug line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Lists */}
      <section className="max-w-7xl mx-auto pt-10 pb-10 mt-4 section-divider">
        <div className="px-4">
          <SectionHeader title="Popular Reading Lists" tone="gold" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "Best History Books", sub: "Ancient civilizations to modern conflicts", href: "/best-history-books" },
              { label: "Best Biography Books", sub: "Lives that shaped the world", href: "/best-biography-books" },
              { label: "Best Business Books", sub: "Strategy, money, and leadership", href: "/best-business-books" },
              { label: "Best Language Learning Books", sub: "Learn faster, remember more", href: "/best-language-learning-books" },
              { label: "Best Science Books", sub: "How the world actually works", href: "/best-science-books" },
              { label: "Best Philosophy Books", sub: "Ideas that changed everything", href: "/best-philosophy-books" },
              { label: "Best Psychology Books", sub: "The mind, behaviour, and influence", href: "/best-psychology-books" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors"
              >
                <span className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-gold)] transition-colors mb-1">
                  {item.label}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{item.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Highlights */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto pt-10 pb-10 mt-4 section-divider">
          <div className="px-4">
            <SectionHeader
              title="From the Blog"
              link={{ href: "/blog", label: "Read all articles" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
                >
                  {post.categories.length > 0 && (
                    <span className="inline-block px-2 py-0.5 bg-[var(--color-surface-light)] text-[var(--color-gold)] text-xs rounded-full font-semibold capitalize mb-3">
                      {post.categories[0].replace(/-/g, " ")}
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.date && (
                    <p className="text-xs text-[var(--color-text-dim)]">{post.date}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter, DISABLED
          The Buttondown endpoint buttondown.email/api/emails/embed-subscribe/skriuwer
          returns 404 (the 'skriuwer' tenant doesn't exist), so every subscribe
          attempt went into the void. Block is hidden until a real list is set up.
          To re-enable: create a Buttondown account (or Mailchimp/ConvertKit),
          confirm the action URL works, then uncomment this block with the
          real endpoint. */}

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-6 py-14 text-center mt-4 section-divider">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Preserving the Frisian Language
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-3">
          At Skriuwer.com, meaning &ldquo;writer&rdquo; in Frisian, we believe that language is
          living heritage. Every book we publish contributes to keeping Frisian culture alive.
        </p>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
          You can also contribute by learning Frisian at{" "}
          <a href="https://learnfrisian.com" className="text-[var(--color-orange)] hover:underline" target="_blank" rel="noopener">
            learnfrisian.com
          </a>
        </p>
      </section>
    </div>
    </>
  );
}
