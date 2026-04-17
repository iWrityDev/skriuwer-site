import blogData from "../../data/blog-posts.json";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  oldUrl: string;
  categories: string[];
  content: string;
}

const posts: BlogPost[] = (blogData.posts as BlogPost[])
  .sort((a, b) => {
    // Sort by date descending (newest first)
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });

export function getAllBlogPosts(): BlogPost[] {
  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)); // ~200 wpm
}

export function getRelatedBlogPosts(
  currentSlug: string,
  categories: string[],
  limit = 4
): BlogPost[] {
  // Try same category first
  const sameCat = posts.filter(
    (p) => p.slug !== currentSlug && p.categories.some((c) => categories.includes(c))
  );
  if (sameCat.length >= limit) return sameCat.slice(0, limit);
  // Fill remainder with recent posts
  const recent = posts.filter(
    (p) => p.slug !== currentSlug && !sameCat.includes(p)
  ).slice(0, limit - sameCat.length);
  return [...sameCat, ...recent].slice(0, limit);
}
