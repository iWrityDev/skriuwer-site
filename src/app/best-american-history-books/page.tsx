import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best American History Books in 2026, Ranked by Readers",
  description:
    "The top American history books ranked by reader reviews — from the Revolution and Civil War to the dark chapters textbooks leave out. Each pick verified by thousands of Amazon readers.",
  alternates: { canonical: "https://www.skriuwer.com/best-american-history-books" },
  openGraph: {
    title: "Best American History Books in 2026, Ranked by Readers",
    description:
      "The top American history books ranked by reader reviews — from the Revolution and Civil War to the dark chapters textbooks leave out.",
    url: "https://www.skriuwer.com/best-american-history-books",
    type: "website",
  },
};

const INTRO = [
  "American history is bigger, messier, and more contradictory than any single narrative can capture. The best books on the subject resist the temptation to simplify: they show you the founding fathers who owned hundreds of enslaved people while writing about liberty, the wars fought on domestic soil that shaped every political fault line still visible today, and the stories erased from the standard account that explain why so much of the present feels unresolved.",
  "The books below cover American history from the Revolution to the modern era. They are ranked by reader reviews across thousands of verified Amazon purchases — which means the books that actually delivered on their promises rise to the top, not just the ones with the best marketing.",
];

const FAQ = [
  {
    q: "What are the best American history books for beginners?",
    a: "Start with books that cover a specific era or event rather than all of American history at once. The Revolutionary War, the Civil War, and World War Two are the most written-about periods and have the most entry-level titles. Books on this page ranked highest by readers tend to be the most accessible.",
  },
  {
    q: "Which American history books expose the dark side of US history?",
    a: "Several books on this page specifically examine the history that standard textbooks downplay or omit entirely — indigenous genocide, slavery's role in economic growth, and the betrayals of Reconstruction. These titles consistently attract the most reader engagement and the most polarised reviews, which is a sign they are saying something real.",
  },
  {
    q: "Are American history books biased?",
    a: "Every history book reflects its author's perspective — that is unavoidable. The strongest books engage with counter-evidence rather than ignoring it. Look for books with detailed source notes and authors who acknowledge where the historical record is incomplete. Multiple-perspective accounts of the same event are the most intellectually honest format.",
  },
  {
    q: "What American history books cover the Civil War?",
    a: "Civil War history is one of the deepest and most competitive categories in American publishing. Books on this page that fall under the American history category include Civil War coverage. For deeper focus, the general history category also lists books dedicated to that conflict.",
  },
  {
    q: "Are these books available outside the United States?",
    a: "Yes. All books link to Amazon, which ships internationally. Buy links route to Amazon US, UK, DE, and NL — choose whichever store serves your location best.",
  },
];

const AMERICAN_SLUGS = new Set([
  "the-american-revolutions-brutal-reality",
  "benjamin-franklin-an-american-life",
  "the-history-of-the-usa-understanding-americas-past",
  "american-civil-war-history",
  "the-hidden-history-of-america-forgotten-betrayals-revealed",
  "scary-american-history-facts",
  "the-history-of-burger-king-insta-whopper-revolution",
]);

export default function BestAmericanHistoryBooksPage() {
  const books = getAllBooks()
    .filter(
      (b) =>
        AMERICAN_SLUGS.has(b.slug) ||
        (b.categories.includes("history") &&
          (b.title.toLowerCase().includes("america") ||
            b.title.toLowerCase().includes("american") ||
            b.title.toLowerCase().includes("civil war") ||
            b.title.toLowerCase().includes("revolution")))
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best American History Books in 2026"
      description="From the Revolution to the modern era — the top American history books ranked by verified reader reviews. The full story, not just the official one."
      books={books}
      breadcrumb="Best American History Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-american-history-books"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
