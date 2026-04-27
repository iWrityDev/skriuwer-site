import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Leadership Books, Top Reads for Leaders in 2026",
  description: "The best leadership books of all time, ranked by reader reviews. Whether you lead a team or a country, these books will transform how you think about leadership.",
  alternates: { canonical: "https://www.skriuwer.com/best-leadership-books" },
  openGraph: {
    title: "Best Leadership Books, Top Reads for Leaders in 2026",
    description: "The best leadership books of all time, ranked by reader reviews. Whether you lead a team or a country, these books will transform how you think about leadership.",
    url: "https://www.skriuwer.com/best-leadership-books",
    type: "website",
  },
};

export default function BestLeadershipBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("business"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Leadership Books in 2026"
      description="Great leaders aren't born, they're made by the books they read and the lessons they apply. These are the best leadership books available today, from timeless classics to modern masterworks, ranked by the readers who swear by them. Whether you're managing a small team or leading an organization, these titles will sharpen your vision and strengthen your impact."
      books={books}
      breadcrumb="Best Leadership Books"
      categoryPage="/category/business"
      categoryLabel="business"
      canonical="https://www.skriuwer.com/best-leadership-books"
    />
  );
}
