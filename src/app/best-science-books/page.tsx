import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Popular Science Books in 2026 | Top Reads on Science & Nature",
  description:
    "The best popular science books ranked by reader reviews. Discover groundbreaking ideas in physics, biology, cosmology, and the natural world, written to captivate every reader.",
  alternates: { canonical: "https://www.skriuwer.com/best-science-books" },
  openGraph: {
    title: "Best Popular Science Books in 2026 | Top Reads on Science & Nature",
    description: "The best popular science books ranked by reader reviews. Discover groundbreaking ideas in physics, biology, cosmology, and the natural world, written to captivate every reader.",
    url: "https://www.skriuwer.com/best-science-books",
    type: "website",
  },
};

export default function BestScienceBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("science"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Popular Science Books"
      description="The best science books make the complexity of the universe feel accessible, even thrilling. These are the top-rated popular science titles, ranked by readers who came away with their minds genuinely expanded."
      books={books}
      breadcrumb="Best Popular Science Books"
      categoryPage="/category/science"
      categoryLabel="science & nature"
      canonical="https://www.skriuwer.com/best-science-books"
    />
  );
}
