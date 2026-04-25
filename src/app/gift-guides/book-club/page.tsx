import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books for Book Clubs, Discussion-Worthy Picks for 2026",
  description:
    "The best books for book clubs in 2026. Books with rich themes, compelling characters, and ideas that generate great discussion, all available on Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/gift-guides/book-club" },
};

const INTRO = [
  "A good book club book does three things: it is engaging enough that people actually finish it before the meeting, it has enough depth that there's something worth arguing about, and it leaves everyone with a different interpretation of what it meant. The books on this list do all three.",
  "We've prioritized books that blend strong narrative with substantive ideas, history books that read like stories, biographies that raise moral questions, and psychology books that make everyone reflect on their own behavior. These are books that start conversations, not just summaries of things everyone already agrees with.",
];

const FAQ = [
  {
    q: "How long should a book club book be?",
    a: "Ideally under 300 pages for monthly clubs. Longer books can work if the group is committed, but shorter books get more people to the finish line before the meeting. All books on this list are practical for real reading schedules.",
  },
  {
    q: "What makes a book work well for discussion?",
    a: "The best discussion books have moral complexity (no easy answers), multiple perspectives, and themes that connect to real life. History and biography books tend to generate great discussion because they're about real decisions real people made, and everyone has an opinion about whether those decisions were right.",
  },
  {
    q: "Should book club books be fiction or nonfiction?",
    a: "Both work. Fiction gives you characters to argue about; nonfiction gives you ideas to debate. On this list we've focused on nonfiction because the best history, mythology, and psychology books spark more discussion per page than most literary fiction.",
  },
];

export default function GiftBookClubPage() {
  const books = getAllBooks()
    .filter(
      (b) =>
        b.reviewCount > 500 &&
        (b.categories.includes("history") ||
          b.categories.includes("biography") ||
          b.categories.includes("psychology") ||
          b.categories.includes("philosophy"))
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 12);

  return (
    <BestOfPage
      title="Best Books for Book Clubs in 2026"
      description="Books with real substance, compelling narratives, moral complexity, and ideas that generate great discussion. Chosen specifically for groups who want to go beyond just summarizing the plot."
      books={books}
      breadcrumb="Book Club Picks"
      categoryPage="/reading-lists"
      categoryLabel="reading list"
      canonical="https://www.skriuwer.com/gift-guides/book-club"
      reviewer="Jennifer Joseph & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
