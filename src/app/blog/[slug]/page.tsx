import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllBlogSlugs, getBlogPostBySlug, getRelatedBlogPosts, getReadingTime } from "@/lib/blog";
import { getRelatedBooksForBlog } from "@/lib/books";
import { buildAffiliateUrl } from "@/lib/affiliate";
import type { Book } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  mythology: "Mythology",
  history: "History",
  "language-learning": "Language Learning",
  books: "Books",
  philosophy: "Philosophy",
  psychology: "Psychology",
  business: "Business",
  "true-crime": "True Crime",
  "self-help": "Self-Help",
  science: "Science",
  biography: "Biography",
  fiction: "Fiction",
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  const plainText = post.content.replace(/<[^>]*>/g, "").trim();
  const description = plainText.slice(0, 155).replace(/\s+/g, " ");
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      siteName: "Skriuwer.com",
    },
    alternates: {
      canonical: `https://skriuwer.com/blog/${slug}`,
    },
  };
}

function RelatedBookCard({ book }: { book: Book }) {
  return (
    <div className="flex gap-3 p-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-orange)] transition-colors">
      <Link href={`/books/${book.slug}`} className="flex-shrink-0">
        {book.coverImage ? (
          <div className="relative rounded overflow-hidden" style={{ width: 64, height: 90 }}>
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized
            />
          </div>
        ) : (
          <div
            className="rounded flex items-center justify-center bg-[var(--color-surface-light)] text-[var(--color-text-dim)] text-xs"
            style={{ width: 64, height: 90 }}
          >
            No cover
          </div>
        )}
      </Link>

      <div className="flex flex-col justify-between min-w-0 flex-1">
        <div>
          <Link href={`/books/${book.slug}`}>
            <h4 className="font-bold text-white text-sm leading-snug line-clamp-2 hover:text-[var(--color-orange)] transition-colors mb-1">
              {book.title}
            </h4>
          </Link>
          <p className="text-xs font-semibold text-[var(--color-orange)] truncate">
            {book.author}
          </p>
        </div>
        {book.asin && (
          <a
            href={buildAffiliateUrl(book.asin)}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="mt-2 inline-block text-xs font-semibold text-[var(--color-orange)] border border-[var(--color-orange)] rounded px-2 py-1 hover:bg-[var(--color-orange)] hover:text-white transition-colors self-start"
          >
            Buy on Amazon
          </a>
        )}
      </div>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedBooks = getRelatedBooksForBlog(post.categories ?? [], 4);
  const morePosts = getRelatedBlogPosts(slug, post.categories ?? [], 4);
  const readingTime = getReadingTime(post.content);

  const description = post.content.replace(/<[^>]*>/g, "").trim().slice(0, 155).replace(/\s+/g, " ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://skriuwer.com/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "Skriuwer",
      url: "https://skriuwer.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Skriuwer.com",
      url: "https://skriuwer.com",
      logo: {
        "@type": "ImageObject",
        url: "https://skriuwer.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://skriuwer.com/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-[var(--color-text-dim)] mb-6">
          <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
          {" / "}
          <Link href="/blog" className="hover:text-[var(--color-orange-light)]">Blog</Link>
          {post.categories[0] && (
            <>
              {" / "}
              <Link
                href={`/blog/category/${post.categories[0]}`}
                className="hover:text-[var(--color-orange-light)] capitalize"
              >
                {CATEGORY_LABELS[post.categories[0]] || post.categories[0]}
              </Link>
            </>
          )}
        </nav>

        {/* Category badges */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog/category/${cat}`}
                className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-surface-light)] text-[var(--color-orange-light)] hover:text-white hover:bg-[var(--color-orange)] transition-colors capitalize"
              >
                {CATEGORY_LABELS[cat] || cat}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-sm text-[var(--color-text-dim)] mb-8">
          {post.date && <span>Published {post.date}</span>}
          <span>&middot;</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Article content */}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
              <h2 className="text-xl font-bold text-white">Books You Might Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBooks.map((book) => (
                <RelatedBookCard key={book.slug} book={book} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/books" className="text-sm text-[var(--color-orange)] hover:underline">
                Browse all books &rarr;
              </Link>
            </div>
          </section>
        )}

        {/* More Articles */}
        {morePosts.length > 0 && (
          <section className="mt-12 pt-10 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full flex-shrink-0" />
              <h2 className="text-xl font-bold text-white">More Articles</h2>
            </div>
            <div className="space-y-2">
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
                >
                  <span className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors line-clamp-1 flex-1 mr-4">
                    {p.title}
                  </span>
                  {p.date && (
                    <span className="text-xs text-[var(--color-text-dim)] flex-shrink-0">{p.date}</span>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/blog" className="text-sm text-[var(--color-orange)] hover:underline">
                View all articles &rarr;
              </Link>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
