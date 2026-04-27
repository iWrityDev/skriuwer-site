import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books on Religion & Spirituality in 2026 | Top Reads Ranked",
  description:
    "The best books on religion and spirituality ranked by reader reviews. Explore faith traditions, biblical history, and spiritual wisdom from across the world's great religions.",
  alternates: { canonical: "https://www.skriuwer.com/best-religion-books" },
  openGraph: {
    title: "Best Books on Religion & Spirituality in 2026 | Top Reads Ranked",
    description: "The best books on religion and spirituality ranked by reader reviews. Explore faith traditions, biblical history, and spiritual wisdom from across the world's great religions.",
    url: "https://www.skriuwer.com/best-religion-books",
    type: "website",
  },
};

export default function BestReligionBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("religion"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books on Religion & Spirituality"
      description="Whether you are exploring faith for the first time or deepening a lifelong practice, the right book can open remarkable doors. These are the best-rated books on religion and spirituality, ranked by readers across all traditions."
      books={books}
      breadcrumb="Best Books on Religion & Spirituality"
      categoryPage="/category/religion"
      categoryLabel="religion & spirituality"
      canonical="https://www.skriuwer.com/best-religion-books"
    />
  );
}
