import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Conspiracy Books in 2026, Cover-Ups & Hidden History",
  description:
    "The best conspiracy and dark history books ranked by readers. Real cover-ups, suppressed facts, and the events they don't put in textbooks. Editor-curated and reviewed.",
  alternates: { canonical: "https://www.skriuwer.com/best-conspiracy-books" },
};

const INTRO = [
  "The most interesting history is the history they left out of your textbooks. Not because it's false, because it's inconvenient. The books on this list explore the gap between the official record and what actually happened: secret operations, suppressed evidence, powerful figures who escaped accountability, and events whose real causes are still disputed decades later.",
  "We've been careful here: these are not paranoid fever-dream publications. They are rigorously researched books that take documented, verifiable evidence and ask the questions that mainstream accounts tend to avoid. Some will challenge beliefs you hold strongly. That discomfort is the point.",
];

const FAQ = [
  {
    q: "Are conspiracy books fiction or nonfiction?",
    a: "The books on this list are all nonfiction. They present documented events, verified sources, and factual research, they are not thriller novels. The word 'conspiracy' in this context means a coordinated effort by powerful actors to conceal information, which is a historical phenomenon that absolutely occurs, not a genre of speculation.",
  },
  {
    q: "What's the difference between dark history and conspiracy books?",
    a: "Dark history books focus on atrocities, hidden violence, and uncomfortable truths about the past, massacres, colonial crimes, suppressed uprisings. Conspiracy books focus specifically on deliberate cover-ups and the active concealment of information. There's overlap, but the distinction is between 'what happened that we don't talk about' vs. 'what happened and who worked to make sure you wouldn't find out.'",
  },
  {
    q: "Are these books suitable for skeptics?",
    a: "Yes, especially for skeptics. The best books in this category use the same standards of evidence as mainstream history: primary sources, cross-referenced accounts, documented paper trails. Being skeptical of official narratives is not the same as being credulous about everything, a healthy skepticism applies in both directions.",
  },
  {
    q: "Will reading conspiracy books make me more anxious or paranoid?",
    a: "Good ones should make you more informed, not more anxious. The goal is to understand power, how it operates, and how accountability fails, not to leave you feeling like helpless victims of shadowy forces. The books we've selected are illuminating rather than destabilizing.",
  },
];

export default function BestConspiracyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("conspiracy"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Conspiracy Books in 2026"
      description="The history they didn't put in your textbooks. Cover-ups, hidden agendas, suppressed evidence, and the real stories behind official accounts, all rigorously researched and ranked by readers."
      books={books}
      breadcrumb="Best Conspiracy Books"
      categoryPage="/category/conspiracy"
      categoryLabel="conspiracy"
      canonical="https://www.skriuwer.com/best-conspiracy-books"
      reviewer="Auke & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
