import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { getAllSlugs, getBookBySlug, getRelatedBooks } from "@/lib/books";
import { BuyButton } from "@/components/BuyButton";
import { StarRating } from "@/components/StarRating";
import { BookGrid } from "@/components/BookGrid";
import { BookCoverImage } from "@/components/BookCoverImage";
import { SectionHeader } from "@/components/SectionHeader";
import { RecentlyViewed, TrackView } from "@/components/RecentlyViewed";
import {
  CATEGORIES,
  getCategoryBySlug,
  getCategoryCssVar,
  primaryCategorySlug,
} from "@/lib/categories";

const CAT_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name])
);

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  const rawDescription = book.description.replace(/<[^>]*>/g, "").trim();
  const description = rawDescription.slice(0, 155).replace(/\s+/g, " ");
  const fullTitle = `${book.title} by ${book.author}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: `https://skriuwer.com/books/${slug}` },
    openGraph: {
      title: book.title,
      description,
      images: book.coverImage && book.coverImage.startsWith("http") ? [{ url: book.coverImage, alt: book.title }] : [],
      type: "website",
      siteName: "Skriuwer.com",
    },
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = getRelatedBooks(book, 5);
  const cleanDescription = stripHtml(book.description);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    image: book.coverImage,
    description: cleanDescription.slice(0, 300),
    author: { "@type": "Person", name: book.author },
    url: `https://skriuwer.com/books/${slug}`,
    ...(book.pages && book.pages > 0 && { numberOfPages: book.pages }),
    ...(book.publishedDate && { datePublished: book.publishedDate }),
    ...(book.language && { inLanguage: book.language }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Amazon" },
      ...(book.asin && {
        url: `https://www.amazon.com/dp/${book.asin}?tag=31813-20`,
      }),
    },
    ...(book.starRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: book.starRating.toString(),
        reviewCount: book.reviewCount.toString(),
      },
    }),
    // Editorial review for own books
    ...(book.isOwnBook && {
      review: {
        "@type": "Review",
        reviewBody: cleanDescription.slice(0, 300),
        reviewRating: {
          "@type": "Rating",
          ratingValue: book.starRating ? book.starRating.toString() : "5",
          bestRating: "5",
        },
        author: {
          "@type": "Organization",
          name: "Skriuwer",
          url: "https://skriuwer.com/about",
        },
        publisher: {
          "@type": "Organization",
          name: "Skriuwer",
          url: "https://skriuwer.com",
        },
      },
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://skriuwer.com" },
      { "@type": "ListItem", position: 2, name: "Books", item: "https://skriuwer.com/books" },
      ...(book.categories[0]
        ? [{ "@type": "ListItem", position: 3, name: book.categories[0].replace(/-/g, " "), item: `https://skriuwer.com/category/${book.categories[0]}` }]
        : []),
      { "@type": "ListItem", position: book.categories[0] ? 4 : 3, name: book.title, item: `https://skriuwer.com/books/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <div
        className="max-w-6xl mx-auto px-4 py-8 hero-glow-cat"
        style={{ "--cat-color": `var(${getCategoryCssVar(primaryCategorySlug(book.categories))})` } as CSSProperties}
      >
        {/* Breadcrumb */}
        <nav className="text-xs text-[var(--color-text-dim)] mb-5">
          <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
          <span className="mx-1.5 opacity-60">/</span>
          <Link href="/books" className="hover:text-[var(--color-orange-light)]">Books</Link>
          {book.categories[0] && (
            <>
              <span className="mx-1.5 opacity-60">/</span>
              <Link href={`/category/${book.categories[0]}`} className="hover:text-[var(--color-orange-light)] capitalize">
                {CAT_NAME_BY_SLUG[book.categories[0]] ?? book.categories[0].replace(/-/g, " ")}
              </Link>
            </>
          )}
          <span className="mx-1.5 opacity-60">/</span>
          <span className="text-[var(--color-text-muted)] line-clamp-1 inline-block max-w-[40ch] align-bottom">
            {book.title}
          </span>
        </nav>

        {/* Product Card */}
        <div className="featured-card">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Cover */}
            <div>
              <BookCoverImage book={book} />
              {book.starRating && (
                <div className="flex justify-center mt-3">
                  <StarRating rating={book.starRating} showNumber />
                  <span className="text-xs text-[var(--color-text-dim)] ml-2">
                    ({book.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {book.isOwnBook && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[color-mix(in_srgb,var(--color-orange)_15%,transparent)] text-[var(--color-orange-light)] border border-[color-mix(in_srgb,var(--color-orange)_30%,transparent)]">
                    ★ Our Pick
                  </span>
                )}
                {book.categories.slice(0, 2).map((c) => (
                  <Link
                    key={c}
                    href={`/category/${c}`}
                    className="cat-chip hover:opacity-85 transition-opacity"
                    style={{ "--cat-color": `var(${getCategoryCssVar(c)})` } as CSSProperties}
                  >
                    <span className="cat-dot" />
                    {CAT_NAME_BY_SLUG[c] ?? c.replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-3">
                {book.title}
              </h1>
              <p className="text-[var(--color-gold)] text-sm font-semibold uppercase tracking-wide mb-4">
                By {book.author}
              </p>

              {book.price && (
                <p className="price text-xl mb-4">
                  {book.starRating ? `From $${book.price} USD` : `$${book.price} USD`}
                </p>
              )}

              {/* Hook */}
              {book.hookText && (
                <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-wide mb-4">
                  {book.hookText}
                </p>
              )}

              {/* Short description */}
              <div className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 line-clamp-6">
                {cleanDescription.length > 500
                  ? `${cleanDescription.slice(0, 500)}…`
                  : cleanDescription}
              </div>

              {/* Buy */}
              <div className="mb-6">
                <BuyButton book={book} />
              </div>

              {/* Book details */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-text-dim)] mb-4">
                {book.pages && book.pages > 0 && (
                  <span>{book.pages} pages</span>
                )}
                {book.publishedDate && (
                  <span>📅 {book.publishedDate.slice(0, 4)}</span>
                )}
                {book.language && book.language !== "en" && (
                  <span>🌐 {book.language.toUpperCase()}</span>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 text-xs text-[var(--color-text-dim)]">
                <span>&#128230; Ships worldwide</span>
                <span>&#10003; 30-day returns</span>
                <span>&#128274; Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="mt-12">
          <SectionHeader title="About this book" />
          {book.description.includes("<") ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          ) : (
            <div className="prose max-w-none">
              {book.description.split(/\n+/).map((para, i) =>
                para.trim() ? <p key={i}>{para.trim()}</p> : null
              )}
            </div>
          )}
        </div>

        {/* Tags (additional tags only, primary categories are already at the top) */}
        {book.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {book.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[var(--color-surface)] text-[var(--color-text-dim)] text-xs rounded-full border border-[var(--color-border)]">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12 pt-10 section-divider">
            <SectionHeader title="You may also like" tone="gold" />
            <BookGrid books={related} columns={5} />
          </section>
        )}

        {/* Recently viewed (client, localStorage) */}
        <RecentlyViewed excludeSlug={book.slug} />

        {/* Record this book as viewed */}
        <TrackView
          slug={book.slug}
          title={book.title}
          coverImage={book.coverImage}
          coverImageFallback={book.coverImageFallback ?? undefined}
          isOwnBook={book.isOwnBook}
        />
      </div>
    </>
  );
}
