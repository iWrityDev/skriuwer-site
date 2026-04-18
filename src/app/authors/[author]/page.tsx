import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AUTHORS, getAuthorBySlug } from "@/lib/authors";
import { getAllBooks } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ author: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}): Promise<Metadata> {
  const { author: slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `${author.name} — ${author.role} at Skriuwer`,
    description: `${author.bio[0].slice(0, 155)}`,
    alternates: { canonical: `https://skriuwer.com/authors/${slug}` },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const { author: slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const authorBooks =
    slug === "auke"
      ? getAllBooks()
          .filter((b) => b.isOwnBook)
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 8)
      : getAllBooks()
          .filter((b) =>
            author.categoryLinks
              .map((c) => c.slug)
              .some((s) => b.categories.includes(s))
          )
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    worksFor: {
      "@type": "Organization",
      name: "Skriuwer",
      url: "https://skriuwer.com",
    },
    url: `https://skriuwer.com/authors/${slug}`,
    description: author.bio[0],
    knowsAbout: author.specialties,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-dim)] mb-6">
          <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
          {" / "}
          <Link href="/team" className="hover:text-[var(--color-orange-light)]">Meet the Authors</Link>
          {" / "}
          <span className="text-[var(--color-text)]">{author.name}</span>
        </nav>

        {/* Author header */}
        <div className="p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl mb-8">
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] flex items-center justify-center text-3xl flex-shrink-0">
              {author.flag}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">{author.name}</h1>
              <p className="text-sm font-semibold text-[var(--color-orange-light)] uppercase tracking-wide mt-0.5">
                {author.role}
              </p>
              <p className="text-xs text-[var(--color-text-dim)] mt-1">{author.location}</p>
            </div>
          </div>

          <div className="space-y-4 text-[var(--color-text-muted)] leading-relaxed mb-6">
            {author.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {author.specialties.map((s) => (
              <span
                key={s}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-muted)] uppercase tracking-wide"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Author's books */}
        {authorBooks.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
              <h2 className="text-lg font-bold text-[var(--color-text)]">
                {slug === "auke" ? "Books by Skriuwer" : `${author.name}&apos;s Favourite Categories`}
              </h2>
            </div>
            <div className="space-y-3">
              {authorBooks.map((book) => {
                const amazonUrl = book.asin ? buildAffiliateUrl(book.asin) : null;
                return (
                  <div
                    key={book.slug}
                    className="flex gap-4 items-start p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-orange)]/30 transition-colors"
                  >
                    <div
                      className="flex-shrink-0 relative rounded overflow-hidden bg-[var(--color-surface-light)]"
                      style={{ width: 52, height: 76 }}
                    >
                      {book.coverImage?.startsWith("http") ? (
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                          sizes="52px"
                          unoptimized
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center text-xl">
                          &#128218;
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/books/${book.slug}`}>
                        <h3 className="font-semibold text-sm text-[var(--color-text)] hover:text-[var(--color-orange-light)] transition-colors line-clamp-2 leading-snug mb-1">
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-[var(--color-text-dim)] mb-2">{book.author}</p>
                      {amazonUrl && (
                        <a
                          href={amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-[var(--color-orange)] text-white rounded hover:bg-[var(--color-orange-light)] transition-colors"
                        >
                          Buy on Amazon →
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Category links */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
            <h2 className="text-lg font-bold text-[var(--color-text)]">Explore {author.name}&apos;s Specialties</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {author.categoryLinks.map(({ label, slug: catSlug }) => (
              <Link
                key={catSlug}
                href={`/category/${catSlug}`}
                className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] hover:border-[var(--color-orange)]/40 transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </section>

        {/* Meet the team CTA */}
        <div className="pt-6 border-t border-[var(--color-border)]">
          <Link
            href="/team"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-orange-light)] transition-colors"
          >
            ← Meet the full team
          </Link>
        </div>
      </div>
    </>
  );
}
