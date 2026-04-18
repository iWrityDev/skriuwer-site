import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { StarRating } from "./StarRating";
import { buildAffiliateUrl } from "@/lib/affiliate";

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
  /** Who curated this list — shown in the byline */
  reviewer?: string;
  /** Last-updated label shown in byline */
  updatedDate?: string;
  /** Extra intro paragraphs below the description */
  intro?: string[];
  /** FAQ items rendered with FAQPage schema */
  faq?: FAQ[];
  /** Show a quick-scan comparison table for the top 5 books */
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

  // ── Schema: FAQPage ────────────────────────────────────────────────────
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
        />
      )}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-dim)] mb-6">
          <Link href="/" className="hover:text-[var(--color-orange-light)] transition-colors">
            Home
          </Link>
          {" / "}
          <Link href="/reading-lists" className="hover:text-[var(--color-orange-light)] transition-colors">
            Reading Lists
          </Link>
          {" / "}
          <span className="text-[var(--color-text)]">{breadcrumb}</span>
        </nav>

        {/* H1 */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">{title}</h1>
        </div>

        {/* Reviewer byline */}
        <div className="flex items-center gap-2 mb-5 ml-4">
          <span className="text-xs text-[var(--color-text-dim)]">
            Curated by{" "}
            <Link href="/team" className="font-semibold text-[var(--color-orange-light)] hover:underline">
              {reviewer}
            </Link>
            {" · "}Updated {updatedDate}
            {" · "}
            <Link href="/affiliate-disclosure" className="hover:underline opacity-70">
              Affiliate links
            </Link>
          </span>
        </div>

        {/* Description */}
        <p className="text-[var(--color-text-muted)] mb-4 ml-4 leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Optional extra intro paragraphs */}
        {intro?.map((p, i) => (
          <p key={i} className="text-[var(--color-text-muted)] mb-4 ml-4 leading-relaxed max-w-2xl">
            {p}
          </p>
        ))}

        {/* ── Quick Comparison Table ─────────────────────────────────────── */}
        {showComparison && topBooks.length > 0 && (
          <div className="mb-10 ml-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-5 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
              <h2 className="text-base font-bold text-[var(--color-text)]">Quick Comparison — Top 5</h2>
            </div>
            <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide w-8">
                      #
                    </th>
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide">
                      Book
                    </th>
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden sm:table-cell">
                      Author
                    </th>
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden md:table-cell">
                      Rating
                    </th>
                    <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-[var(--color-text-dim)] uppercase tracking-wide hidden md:table-cell">
                      Pages
                    </th>
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
                          <span className="w-6 h-6 rounded-full bg-[var(--color-orange)] text-white text-[11px] font-bold flex items-center justify-center">
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
                            <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-bold bg-[var(--color-orange)]/10 text-[var(--color-orange)] border border-[var(--color-orange)]/30 rounded">
                              ★ Our Pick
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-[var(--color-text-muted)] text-sm hidden sm:table-cell">
                          {book.author}
                        </td>
                        <td className="px-3 py-3 hidden md:table-cell">
                          {book.starRating ? (
                            <span className="text-[var(--color-orange)] font-semibold text-sm">
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

        {/* ── Book list ──────────────────────────────────────────────────── */}
        {books.length > 0 ? (
          <ol className="space-y-4 mb-10">
            {books.map((book, index) => {
              const excerpt = stripHtml(book.description).slice(0, 160);
              const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;

              return (
                <li
                  key={book.slug}
                  className="flex gap-4 items-start p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-orange)]/30 transition-colors"
                >
                  {/* Number badge */}
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-orange)] text-white font-bold text-lg flex items-center justify-center leading-none">
                    {index + 1}
                  </span>

                  {/* Cover */}
                  <div className="flex-shrink-0 w-[60px] h-[90px] relative rounded overflow-hidden bg-[var(--color-surface-light)] flex items-center justify-center">
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
                          sizes="60px"
                          unoptimized
                        />
                      ) : (
                        <span className="text-2xl">&#128218;</span>
                      );
                    })()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <Link href={`/books/${book.slug}`} className="group flex-1 min-w-0">
                        <h2 className="font-bold text-[var(--color-text)] text-base leading-snug group-hover:text-[var(--color-orange-light)] transition-colors line-clamp-2">
                          {book.title}
                        </h2>
                      </Link>
                      {book.isOwnBook && (
                        <span className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-bold bg-[var(--color-orange)]/10 text-[var(--color-orange)] border border-[var(--color-orange)]/30 rounded whitespace-nowrap leading-none mt-0.5">
                          ★ Our Pick
                        </span>
                      )}
                    </div>

                    <p className="text-[var(--color-orange)] text-sm mb-1">{book.author}</p>

                    {book.starRating && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <StarRating rating={book.starRating} />
                        <span className="text-xs text-[var(--color-text-dim)]">
                          ({book.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>
                    )}

                    {excerpt && (
                      <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-2">
                        {excerpt}
                        {excerpt.length === 160 ? "…" : ""}
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
        ) : (
          <p className="text-[var(--color-text-dim)] py-8">No books found for this selection.</p>
        )}

        {/* ── FAQ Section ────────────────────────────────────────────────── */}
        {faq && faq.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
              <h2 className="text-xl font-bold text-[var(--color-text)]">Frequently Asked Questions</h2>
            </div>
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

        {/* ── Email Signup ──────────────────────────────────────────────── */}
        {/* To activate: replace YOUR_FORM_ID with your Formspree form ID from formspree.io */}
        <div className="mb-10 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">📚</span>
            <h2 className="text-base font-bold text-[var(--color-text)]">Get Our Weekly Book Picks</h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            One email per week. The best books in history, mythology, psychology, and more — handpicked by our editors.
          </p>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 text-sm bg-[var(--color-bg,#0f0f0f)] border border-[var(--color-border)] rounded text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:border-[var(--color-orange)] transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[var(--color-orange)] hover:bg-[var(--color-orange-light)] text-white text-sm font-semibold rounded transition-colors whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>
          <p className="text-xs text-[var(--color-text-dim)] mt-2">No spam. Unsubscribe any time.</p>
        </div>

        {/* Footer links */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-wrap gap-4 items-center justify-between">
          <Link
            href={categoryPage}
            className="text-[var(--color-orange)] hover:text-[var(--color-orange-light)] font-medium transition-colors"
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
    </>
  );
}
