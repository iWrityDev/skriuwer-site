import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Biography Books in 2026, Lives Worth Reading About",
  description:
    "The best biographies and memoirs ranked by reader reviews. True stories of remarkable people, leaders, visionaries, and survivors, reviewed by our editors.",
  alternates: { canonical: "https://skriuwer.com/best-biography-books" },
};

const INTRO = [
  "A great biography does something that no other format can: it collapses time and lets you live inside another person's decisions. You follow a leader through their defining crisis, a scientist through their breakthrough, a survivor through the worst thing that can happen to a human being, and you come out the other side with a perspective on your own life that you didn't have before.",
  "The biographies on this list were selected from thousands of reader reviews. We prioritized books about people whose lives genuinely changed the course of history, but we also looked for books where the writing itself is exceptional. A poorly written biography of a fascinating person is still a disappointing book. Every pick here is both a compelling story and a well-crafted read.",
];

const FAQ = [
  {
    q: "What is the difference between a biography and a memoir?",
    a: "A biography is written by someone other than the subject, a researcher, journalist, or historian who has studied that person's life. A memoir is written by the subject themselves, about their own experiences. Both appear on this list. Memoirs tend to be more intimate and personal; biographies tend to be more comprehensive and fact-checked.",
  },
  {
    q: "Are biographies good for people who don't usually read nonfiction?",
    a: "Often yes. Biographies are some of the most readable nonfiction because they have a built-in narrative structure: a person's life, with a beginning, turning points, and an end. The best biographies read like novels. If you're new to nonfiction, biographies are one of the best entry points.",
  },
  {
    q: "How do I pick a biography if I don't know who to read about?",
    a: "Start with a field you're already interested in: if you love technology, read about a tech pioneer; if you love history, read about a historical leader. Alternatively, start with the most-reviewed books on this list, those titles have resonated with the broadest audience and are the safest bets.",
  },
  {
    q: "Do I need background knowledge to enjoy a biography?",
    a: "Generally no. Good biographies provide all the context you need within the book itself. The author explains the historical period, the relevant institutions, and the key relationships. You don't need to know anything about 18th-century France to enjoy a biography about Napoleon, the book will bring you up to speed.",
  },
];

export default function BestBiographyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("biography"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Biography Books in 2026"
      description="True stories of remarkable lives, leaders, visionaries, rebels, and survivors. These are the best biographies and memoirs available today, ranked by readers and reviewed by our editors."
      books={books}
      breadcrumb="Best Biography Books"
      categoryPage="/category/biography"
      categoryLabel="biography"
      canonical="https://skriuwer.com/best-biography-books"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
