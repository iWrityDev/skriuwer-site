import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best History Books in 2026 — Ranked by 100,000+ Readers",
  description:
    "The 15 best history books of 2026 — ranked by reader reviews. Ancient civilizations, wars, empires, and the events that shaped the modern world. Each pick reviewed by our editors.",
  alternates: { canonical: "https://skriuwer.com/best-history-books" },
};

const INTRO = [
  "History is not a collection of dates — it is a series of decisions made by real people under impossible pressure, and understanding those decisions is the fastest way to understand the world you live in today. The best history books don't just recount what happened; they explain why it happened, who benefited, who suffered, and what echoes of those events still reverberate in our politics, borders, and beliefs.",
  "We reviewed hundreds of history books across ancient civilizations, medieval empires, world wars, and modern conflicts. The books below are ranked by reader popularity across thousands of verified Amazon reviews, then filtered and ordered by our editorial team for depth, accessibility, and genuine staying power. Whether you're new to history or deep into it, there's something on this list that will change how you see the world.",
];

const FAQ = [
  {
    q: "What is the best history book for beginners?",
    a: "For complete beginners, look for books ranked highest on this list with the most reader reviews — these have proven track records for accessibility. Books described as 'fact-filled' or 'for curious readers' are usually written for a broad audience. Avoid academic titles until you have some grounding in the period.",
  },
  {
    q: "Are there history books that read like novels?",
    a: "Yes. Narrative history books tell true stories with characters, tension, and drama — they read like fiction but are fully sourced nonfiction. Many of the books on this list take this approach, particularly in the dark history and ancient civilizations categories. Look for books with strong author voices and lots of individual stories, not just sweeping overviews.",
  },
  {
    q: "How long does it take to read a history book?",
    a: "Most popular history books run between 200 and 350 pages, which for an average reader is 5–10 hours of reading. Books on this list average around 250 pages. If you read 30 minutes a day, you can finish most of them in two weeks.",
  },
  {
    q: "Are these books available outside the US?",
    a: "Yes. All books link to Amazon, which ships internationally and uses Amazon OneLink to automatically route you to your local store (UK, Germany, Netherlands, France, and more). Prices will convert to your local currency.",
  },
  {
    q: "What makes a history book worth reading vs. just watching a documentary?",
    a: "Books go deeper. A documentary covers the surface of an event in 45 minutes; a good history book spends 250 pages on the same topic, giving you context, contradictions, and nuance that video formats simply can't fit. Books also let you go at your own pace, re-read confusing sections, and make notes — making the knowledge stick far longer.",
  },
];

export default function BestHistoryBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best History Books in 2026"
      description="History is full of stories more dramatic, strange, and consequential than any fiction. These are the 15 best history books available today — from ancient civilizations to modern conflicts — ranked by the readers who rate them most highly."
      books={books}
      breadcrumb="Best History Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://skriuwer.com/best-history-books"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
