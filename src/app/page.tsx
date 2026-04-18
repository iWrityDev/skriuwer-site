import Link from "next/link";
import Image from "next/image";
import { BookGrid } from "@/components/BookGrid";
import { SearchBar } from "@/components/SearchBar";
import { StarRating } from "@/components/StarRating";
import { getFeaturedBooks, getBestsellers, getAllBooks, getRecentlyAdded } from "@/lib/books";
import { getAllBlogPosts } from "@/lib/blog";
import { buildAffiliateUrl } from "@/lib/affiliate";
import { CATEGORIES } from "@/lib/categories";
import type { Book } from "@/lib/types";

function FeaturedBook({ book }: { book: Book }) {
  return (
    <div className="featured-card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[var(--color-orange)]">&#9813;</span>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--color-orange)]">
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
  url: "https://skriuwer.com",
  description: "An affiliate book discovery site specializing in history, mythology, language learning, and more.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Splitting 1",
    postalCode: "9281 KJ",
    addressLocality: "Harkema",
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
  url: "https://skriuwer.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://skriuwer.com/search?q={search_term_string}",
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

  // Pick a featured book — own book, English, with cover and description
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <div>
      {/* Search */}
      <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] py-3.5 px-6 flex justify-center">
        <SearchBar variant="hero" items={searchItems} />
      </div>

      {/* Featured Book */}
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-6">
        <FeaturedBook book={featuredBook} />
      </section>

      {/* New Arrivals */}
      {recentlyAdded.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
              <h2 className="text-xl font-bold text-[var(--color-text)]">New Arrivals</h2>
            </div>
            <Link href="/books" className="text-sm text-[var(--color-orange)] hover:underline">
              Browse all &rarr;
            </Link>
          </div>
          <BookGrid books={recentlyAdded} columns={4} />
        </section>
      )}

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
              <h2 className="text-xl font-bold text-[var(--color-text)]">Most Reviewed</h2>
            </div>
            <Link href="/bestsellers" className="text-sm text-[var(--color-orange)] hover:underline">
              View all &rarr;
            </Link>
          </div>
          <BookGrid books={bestsellers} columns={4} />
        </section>
      )}

      {/* Our Books */}
      <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
            <h2 className="text-xl font-bold text-[var(--color-text)]">Our Books</h2>
          </div>
          <Link href="/books" className="text-sm text-[var(--color-orange)] hover:underline">
            View all &rarr;
          </Link>
        </div>
        <BookGrid books={featured.slice(0, 20)} columns={5} />
        <div className="text-center mt-8">
          <Link href="/books" className="btn-outline">VIEW ALL BOOKS</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
          <h2 className="text-xl font-bold text-[var(--color-text)]">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors"
            >
              <h3 className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-snug line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Lists */}
      <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
          <h2 className="text-xl font-bold text-[var(--color-text)]">Popular Reading Lists</h2>
        </div>
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
              className="group flex flex-col p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors"
            >
              <span className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors mb-1">
                {item.label}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">{item.sub}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog Highlights */}
      {recentPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
              <h2 className="text-xl font-bold text-[var(--color-text)]">From the Blog</h2>
            </div>
            <Link href="/blog" className="text-sm text-[var(--color-orange)] hover:underline">
              Read all articles &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
              >
                {post.categories.length > 0 && (
                  <span className="inline-block px-2 py-0.5 bg-[var(--color-surface-light)] text-[var(--color-orange-light)] text-xs rounded-full font-semibold capitalize mb-3">
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
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-10 section-divider">
        <div className="max-w-2xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-orange)",
              boxShadow: "0 0 32px rgba(232,100,10,0.12)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">&#128218;</span>
              <h2 className="text-xl font-bold text-[var(--color-text)]">Get Weekly Book Recommendations</h2>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm mb-1">
              Discover the best new books in history, mythology, and more &mdash; straight to your inbox.
            </p>
            <p className="text-[var(--color-text-dim)] text-xs mb-6">
              Join readers discovering the best books in history, mythology &amp; more.
            </p>
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/skriuwer"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg text-sm bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-orange)] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-light)] transition-colors whitespace-nowrap"
              >
                Subscribe Free
              </button>
            </form>
            <p className="mt-4 text-[var(--color-text-dim)] text-xs">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-6 py-14 text-center section-divider">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
          Preserving the Frisian Language
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-3">
          At Skriuwer.com &mdash; meaning &ldquo;writer&rdquo; in Frisian &mdash; we believe that language is
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
