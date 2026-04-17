import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { StarRating } from "./StarRating";
import { buildAffiliateUrl } from "@/lib/affiliate";

interface BestOfPageProps {
  title: string;
  description: string;
  books: Book[];
  breadcrumb: string;
  categoryPage: string;
  categoryLabel: string;
  canonical?: string;
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
}: BestOfPageProps) {
  const jsonLd = canonical
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: canonical,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: books.slice(0, 10).map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: book.title,
            url: `https://skriuwer.com/books/${book.slug}`,
          })),
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

        {/* H1 with orange accent bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">{title}</h1>
        </div>

        {/* Meta description */}
        <p className="text-[var(--color-text-muted)] mb-8 ml-4 leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Book list */}
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

                  {/* Cover image */}
                  <div className="flex-shrink-0 w-[60px] h-[90px] relative rounded overflow-hidden bg-[var(--color-surface-light)] flex items-center justify-center">
                    {book.coverImage && book.coverImage.startsWith("http") ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="60px"
                        unoptimized
                      />
                    ) : (
                      <span className="text-2xl">&#128218;</span>
                    )}
                  </div>

                  {/* Book info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/books/${book.slug}`} className="group">
                      <h2 className="font-bold text-[var(--color-text)] text-base leading-snug mb-0.5 group-hover:text-[var(--color-orange-light)] transition-colors line-clamp-2">
                        {book.title}
                      </h2>
                    </Link>
                    <p className="text-[var(--color-orange)] text-sm mb-1">{book.author}</p>

                    {/* Stars + review count */}
                    {book.starRating && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <StarRating rating={book.starRating} />
                        <span className="text-xs text-[var(--color-text-dim)]">
                          ({book.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>
                    )}

                    {/* Description excerpt */}
                    {excerpt && (
                      <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-2">
                        {excerpt}
                        {excerpt.length === 160 ? "…" : ""}
                      </p>
                    )}

                    {/* Buy button */}
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
