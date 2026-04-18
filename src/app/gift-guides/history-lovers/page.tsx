import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Gifts for History Lovers — Books They'll Actually Read",
  description:
    "The best history books to give as gifts in 2026. Top-rated, beautifully written, and available on Amazon with fast shipping. Curated for anyone who loves history.",
  alternates: { canonical: "https://skriuwer.com/gift-guides/history-lovers" },
};

const INTRO = [
  "Giving a book to a history lover is one of the best gifts you can give — because unlike most gifts, this one keeps working for weeks. The history books on this list were chosen specifically as gifts: they are accessible enough to be enjoyed by anyone who's curious about history (not just academics), substantial enough to feel like a real present, and well-written enough that they won't end up on a shelf unread.",
  "All books link to Amazon, where you can check current prices, shipping times, and sometimes find hardcover editions that look great on a shelf. Most of these are paperbacks in the $12–$18 range, making them excellent value.",
];

export default function GiftHistoryLoversPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 12);

  return (
    <BestOfPage
      title="Best Gifts for History Lovers"
      description="Top-rated history books that make exceptional gifts — beautifully written, well-researched, and accessible to any curious reader. All available on Amazon."
      books={books}
      breadcrumb="History Lover Gifts"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/gift-guides/history-lovers"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      showComparison
    />
  );
}
