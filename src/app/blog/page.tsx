import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog, History, Mythology, Psychology & More",
  description: "300+ articles about ancient history, mythology, language learning, true crime, psychology, science, and business. New posts added regularly.",
  alternates: { canonical: "https://www.skriuwer.com/blog" },
};

const CATEGORY_LABELS: Record<string, string> = {
  mythology: "Mythology",
  history: "History",
  "language-learning": "Language Learning",
  books: "Books",
  philosophy: "Philosophy",
  psychology: "Psychology",
  business: "Business",
  "self-help": "Self-Help",
  "true-crime": "True Crime",
  science: "Science",
  biography: "Biography",
  fiction: "Fiction",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  // Build unique categories from posts
  const allCats = Array.from(
    new Set(posts.flatMap((p) => p.categories))
  ).filter((c) => CATEGORY_LABELS[c]);

  // Group posts by first category for display
  const featured = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Blog</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-8 ml-5">
        {posts.length} articles about history, mythology, and language learning.
      </p>

      {/* Category filter pills */}
      {allCats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-orange)] text-[var(--color-orange)] hover:bg-[var(--color-orange)] hover:text-white transition-colors"
          >
            All Posts
          </Link>
          {allCats.map((cat) => (
            <Link
              key={cat}
              href={`/blog/category/${cat}`}
              className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors"
            >
              {CATEGORY_LABELS[cat] || cat}
            </Link>
          ))}
        </div>
      )}

      {posts.length > 0 ? (
        <>
          {/* Featured posts - larger cards */}
          {featured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {featured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-5 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
                >
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 bg-[var(--color-surface-light)] text-[var(--color-orange-light)] text-xs rounded-full font-semibold capitalize"
                      >
                        {(CATEGORY_LABELS[cat] || cat).replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-bold text-base text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  {post.date && (
                    <p className="text-xs text-[var(--color-text-dim)]">{post.date}</p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Compact list for the rest */}
          <div className="space-y-2">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-4 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors line-clamp-1">
                    {post.title}
                  </h2>
                  {post.date && (
                    <p className="text-xs text-[var(--color-text-dim)] mt-0.5">{post.date}</p>
                  )}
                </div>
                {post.categories.length > 0 && (
                  <span className="flex-shrink-0 px-2 py-0.5 bg-[var(--color-surface-light)] text-[var(--color-orange-light)] text-xs rounded-full capitalize hidden sm:block">
                    {(CATEGORY_LABELS[post.categories[0]] || post.categories[0]).replace(/-/g, " ")}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-[var(--color-text-dim)] py-8">Blog posts coming soon!</p>
      )}
    </div>
  );
}
