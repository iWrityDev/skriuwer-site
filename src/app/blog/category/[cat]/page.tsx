import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts } from "@/lib/blog";

const CATEGORY_LABELS: Record<string, string> = {
  mythology: "Mythology",
  history: "History",
  "sleep-stories": "Sleep Stories",
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

const VALID_CATS = Object.keys(CATEGORY_LABELS);

export function generateStaticParams() {
  return VALID_CATS.map((cat) => ({ cat }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat];
  if (!label) return {};
  return {
    title: `${label} Articles`,
    description: `Blog posts about ${label.toLowerCase()}, history, mythology, language, and more at Skriuwer.com.`,
    alternates: { canonical: `https://www.skriuwer.com/blog/category/${cat}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const label = CATEGORY_LABELS[cat];
  if (!label) notFound();

  const all = getAllBlogPosts();
  const posts = all.filter((p) => p.categories.includes(cat));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <Link href="/blog" className="hover:text-[var(--color-orange-light)]">Blog</Link>
        {" / "}
        <span className="text-[var(--color-text)]">{label}</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">{label} Articles</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-8 ml-5">
        {posts.length} articles about {label.toLowerCase()}.
      </p>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/blog"
          className="px-3 py-1.5 text-xs font-semibold rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] transition-colors"
        >
          All Posts
        </Link>
        {VALID_CATS.map((c) => (
          <Link
            key={c}
            href={`/blog/category/${c}`}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
              c === cat
                ? "border-[var(--color-orange)] text-[var(--color-orange)] bg-[rgba(232,100,10,0.08)]"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)]"
            }`}
          >
            {CATEGORY_LABELS[c]}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="space-y-2">
          {posts.map((post) => (
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
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[var(--color-text-dim)] py-8">No articles in this category yet.</p>
      )}
    </div>
  );
}
