import type { MetadataRoute } from "next";
import { getAllBooks } from "@/lib/books";
import { CATEGORIES } from "@/lib/categories";
import { getAllBlogSlugs } from "@/lib/blog";

const BLOG_CATEGORIES = [
  "mythology", "history", "language-learning", "books",
  "philosophy", "psychology", "business", "self-help",
  "true-crime", "science", "biography", "fiction",
];

const BEST_OF_SLUGS = [
  "/best-greek-mythology-books",
  "/best-roman-history-books",
  "/best-language-learning-books",
  "/best-frisian-books",
  "/best-mythology-books",
  "/best-history-books",
  "/best-ancient-civilizations-books",
  "/best-bilingual-books",
  "/best-self-help-books",
  "/best-psychology-books",
  "/best-biography-books",
  "/best-business-books",
  "/best-true-crime-books",
  "/best-philosophy-books",
  "/best-science-books",
  "/best-fiction-books",
  "/best-dark-history-books",
  "/best-religion-books",
  "/best-norse-mythology-books",
  "/best-egyptian-mythology-books",
  "/best-stoicism-books",
  "/best-books-for-history-lovers",
  "/best-books-2026",
  "/best-world-war-2-books",
  "/best-leadership-books",
  "/best-mindset-books",
  "/best-thriller-books",
  "/best-conspiracy-books",
  "/best-ancient-egypt-books",
  "/best-viking-books",
  "/best-ancient-rome-books",
  "/best-ancient-greece-books",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.skriuwer.com";
  const books = getAllBooks();

  const bookEntries: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/books/${book.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogCategoryEntries: MetadataRoute.Sitemap = BLOG_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const bestOfEntries: MetadataRoute.Sitemap = BEST_OF_SLUGS.map((slug) => ({
    url: `${baseUrl}${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { path: "/reading-lists", priority: 0.9 },
    { path: "/about", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.4 },
    { path: "/affiliate-disclosure", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
    { path: "/search", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/reading-lists" ? "weekly" : "monthly" as "weekly" | "monthly",
    priority,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bestsellers`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...bestOfEntries,
    ...categoryEntries,
    ...bookEntries,
    ...blogEntries,
    ...blogCategoryEntries,
    ...staticPages,
  ];
}
