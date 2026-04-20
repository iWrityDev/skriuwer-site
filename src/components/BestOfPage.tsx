import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { StarRating } from "./StarRating";
import { SectionHeader } from "./SectionHeader";
import { buildAffiliateUrl } from "@/lib/affiliate";
import {
  CATEGORIES,
  getCategoryCssVar,
  primaryCategorySlug,
} from "@/lib/categories";
import type { CSSProperties } from "react";

const CAT_NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name])
);

interface FAQ {
  q: string;
  a: string;
}

interface BestOfPageProps {
  title: string;
  description: string;
  books: Book[];
  breadcrumb: string;
  categoryPage: string;
  categoryLabel: string;
  canonical?: string;
  reviewer?: string;
  updatedDate?: string;
  intro?: string[];
  faq?: FAQ[];
  showComparison?: boolean;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function BestOfPage({
  title,
  description,
  books,
  breadcrumb,
  categoryPage,
  categoryLabel,
  canonical,
  reviewer = "Skriuwer Editors",
  updatedDate = "April 2026",
  intro,
  faq,
  showComparison = false,
}: BestOfPageProps) {
  // Infer a category accent for the whole page from the most common
  // category in the book set, falling back to orange.
  const catSlug = (() => {
    const counts: Record<string, number> = {};
    for (const b of books) {
      for (const c of b.categories) {
        if (c && c !== "general") counts[c] = (counts[c] || 0) + 1;
      }
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] ?? null;
  })();
  const pageStyle = {
    "--cat-color": `var(${getCategoryCssVar(catSlug)})`,
  } as CSSProperties;

  // ── Schema: CollectionPage + ItemList ─────────────────────────────────
  const collectionLd = canonical
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: canonical,
        author: {
          "@type": "Organization",
          name: "Skriuwer",
          url: "https://skriuwer.com/about",
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: books.length,
          itemListElement: books.slice(0, 10).map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: book.title,
            url: `https://skriuwer.com/books/${book.slug}`,
          })),
        },
      }
    : null;

  const faqLd =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }
      : null;

  const topBooks = books.slice(0, 5);

  return (
    <>
      {collectionLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      )}
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <div style={pageStyle}>
        {/* Hero */}
        <section className="hero-glow-cat">
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-8">
            <nav className="text-xs text-[var(--color-text-dim)] mb-5">
              <Link href="/" className="hover:text-[var(--color-orange-light)] transition-colors">Home</Link>
              <span className="mx-1.5 opacity-60">/</span>
              <Link href="/reading-lists" className="hover:text-[var(--color-orange-light)] transition-colors">Reading Lists</Link>
              <span className="mx-1.5 opacity-60">/</span>
              <span className="text-[var(--color-text)]">{breadcrumb}</span>
            </nav>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="cat-chip" style={{ fontSize: 11 }}>
                <span className="cat-dot" />
                {catSlug ? CAT_NAME_BY_SLUG[catSlug] ?? "Reading List" : "Reading List"}
              </span>
              <span className="text-xs text-[var(--color-text-dim)]">
                {books.length} book{books.length === 1 ? "" : "s"}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, color-mix(in srgb, var(--cat-color) 55%, white) 0%, var(--cat-color) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {title}
            </h1>

            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Curated by{" "}
              <Link href="/team" className="font-semibold text-[var(--color-orange-light)] hover:underline">
                {reviewer}
              </Link>
              {" · "}Updated {updatedDate}
              {" · "}
              <Link href="/affiliate-disclosure" className="hover:underline opacity-70">
                Affiliate links
              </Link>
            </p>

            <p className="mt-3 text-base text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              {description}
            </p>

            {intro?.map((p, i) => (
              <p key={i} className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
                {p}
              </p>
            ))}
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 pb-10">
          {/* Quick Comparison Table */}
          {showComparison && topBooks.length > 0 && (
            <div className="mb-10">
              <SectionHeader title="Quick comparison — top 5" size="sm" tone="gold" />
              <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide w-8">#</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide">Book</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden sm:table-cell">Author</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden md:table-cell">Rating</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden md:table-cell">Pages</th>
                      <th className="px-3 py-2.5 w-16" />
                    </tr>
                  </thead>
                  <tbody>
                    {topBooks.map((book, i) => {
                      const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;
                      return (
                        <tr
                          key={book.slug}
                          className="border-b last:border-b-0 border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-colors"
                        >
                          <td className="px-3 py-3">
                            <span
                              className="w-7 h-7 rounded-full text-white text-[11px] font-bold flex items-center justify-center"
                              style={{ background: "var(--color-orange-gradient)" }}
                            >
                              {i + 1}
                            </span>
                          </td>
                          <td className="px-3 py-3 max-w-[180px]">
                            <Link
                              href={`/books/${book.slug}`}
                              className="font-semibold text-[var(--color-text)] hover:text-[var(--color-orange-light)] transition-colors text-sm line-clamp-2 leading-snug"
                            >
                              {book.title}
                            </Link>
                            {book.isOwnBook && (
                              <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-bold bg-[color-mix(in_srgb,var(--color-orange)_15%,transparent)] text-[var(--color-orange-light)] border border-[color-mix(in_srgb,var(--color-orange)_30%,transparent)] rounded">
                                ★ Our Pick
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-[var(--color-text-muted)] text-sm hidden sm:table-cell">{book.author}</td>
                          <td className="px-3 py-3 hidden md:table-cell">
                            {book.starRating ? (
                              <span className="text-[var(--color-gold)] font-semibold text-sm">
                                {book.starRating.toFixed(1)} ★
                              </span>
                            ) : (
                              <span className="text-[var(--color-text-dim)]">—</span>
                            )}
                          </td>
                          <td className="px-3 py-3 text-[var(--color-text-muted)] text-sm hidden md:table-cell">
                            {book.pages && book.pages > 0 ? book.pages : "—"}
                          </td>
                          <td className="px-3 py-3">
                            {amazonUrl && (
                              <a
                                href={amazonUrl}
                                target="_blank"
                                rel="noopener noreferrer nofollow sponsored"
                                className="px-2.5 py-1 text-xs font-bold bg-[var(--color-orange)] text-white rounded hover:bg-[var(--color-orange-light)] transition-colors whitespace-nowrap"
                              >
                                Buy →
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Book list */}
          {books.length > 0 ? (
            <>
              <SectionHeader title="The ranked list" />
              <ol className="space-y-4 mb-10">
                {books.map((book, index) => {
                  const excerpt = stripHtml(book.description).slice(0, 180);
                  const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;
                  const bookCatSlug = primaryCategorySlug(book.categories);
                  const itemStyle = {
                    "--cat-color": `var(${getCategoryCssVar(bookCatSlug)})`,
                  } as CSSProperties;

                  return (
                    <li
                      key={book.slug}
                      style={itemStyle}
                      className="relative flex gap-4 items-start p-4 rounded-xl border border-[var(--color-border)] transition-all hover:-translate-y-0.5"
                      data-rank={index + 1}
                    >
                      {/* Left category accent bar */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl opacity-40"
                        style={{ background: "var(--cat-color)" }}
                      />
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: "var(--color-card-gradient)",
                          zIndex: -1,
                        }}
                      />

                      {/* Rank */}
                      <span
                        className="flex-shrink-0 w-10 h-10 rounded-full text-white font-extrabold text-base flex items-center justify-center leading-none shadow-lg"
                        style={{ background: "var(--color-orange-gradient)", boxShadow: "0 4px 14px rgba(232,100,10,0.3)" }}
                      >
                        {index + 1}
                      </span>

                      {/* Cover */}
                      <div className="flex-shrink-0 w-[64px] h-[96px] relative rounded overflow-hidden bg-[var(--color-surface-light)] flex items-center justify-center">
                        {(() => {
                          const src = book.isOwnBook
                            ? book.coverImage?.startsWith("http")
                              ? book.coverImage
                              : book.coverImageFallback
                            : book.coverImageFallback?.startsWith("http")
                            ? book.coverImageFallback
                            : book.coverImage;
                          return src && src.startsWith("http") ? (
                            <Image
                              src={src}
                              alt={book.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                              unoptimized
                            />
                          ) : (
                            <span className="text-2xl">&#128218;</span>
                          );
                        })()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 relative">
                        <div className="flex items-start justify-between gap-2 mb-0.5">
                          <Link href={`/books/${book.slug}`} className="group flex-1 min-w-0">
                            <h2 className="font-bold text-[var(--color-text)] text-base leading-snug group-hover:text-[var(--color-orange-light)] transition-colors line-clamp-2">
                              {book.title}
                            </h2>
                          </Link>
                          {book.isOwnBook && (
                            <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-bold bg-[color-mix(in_srgb,var(--color-orange)_15%,transparent)] text-[var(--color-orange-light)] border border-[color-mix(in_srgb,var(--color-orange)_30%,transparent)] rounded whitespace-nowrap leading-none mt-0.5">
                              ★ Our Pick
                            </span>
                          )}
                        </div>

                        <p className="text-[var(--color-gold)] text-sm mb-1">{book.author}</p>

                        {book.starRating ? (
                          <div className="flex items-center gap-1.5 mb-1">
                            <StarRating rating={book.starRating} />
                            <span className="text-xs text-[var(--color-text-dim)]">
                              ({book.reviewCount.toLocaleString()} reviews)
                            </span>
                          </div>
                        ) : null}

                        {excerpt && (
                          <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-2">
                            {excerpt}
                            {excerpt.length === 180 ? "…" : ""}
                          </p>
                        )}

                        {amazonUrl && (
                          <a
                            href={amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow sponsored"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white text-sm font-semibold transition-colors"
                          >
                            Buy on Amazon →
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <p className="text-[var(--color-text-dim)] py-8">No books found for this selection.</p>
          )}

          {/* FAQ */}
          {faq && faq.length > 0 && (
            <div className="mb-10 mt-10 pt-10 section-divider">
              <SectionHeader title="Frequently asked questions" tone="teal" />
              <div className="space-y-4">
                {faq.map(({ q, a }, i) => (
                  <details
                    key={i}
                    className="group p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg cursor-pointer hover:border-[var(--color-orange)]/30 transition-colors"
                  >
                    <summary className="font-semibold text-[var(--color-text)] text-sm leading-snug list-none flex items-center justify-between gap-3">
                      {q}
                      <svg
                        className="w-4 h-4 text-[var(--color-text-dim)] flex-shrink-0 transition-transform group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-3">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter — DISABLED (Buttondown endpoint returns 404,
              see note on src/app/page.tsx). Re-enable after setting up a
              real list provider. */}

          {/* Footer links */}
          <div className="border-t border-[var(--color-border)] pt-6 flex flex-wrap gap-4 items-center justify-between">
            <Link
              href={categoryPage}
              className="text-[var(--color-orange-light)] hover:text-[var(--color-orange)] font-medium transition-colors"
            >
              See all {categoryLabel} books →
            </Link>
            <Link
              href="/reading-lists"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition-colors"
            >
              ← More reading lists
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
