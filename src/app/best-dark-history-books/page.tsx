import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Dark History Books in 2026, Ranked by Reader Reviews",
  description:
    "The best dark history books ranked by reader reviews. Uncover the gruesome, brutal, and disturbing facts from history that mainstream textbooks leave out.",
  alternates: { canonical: "https://www.skriuwer.com/best-dark-history-books" },
  openGraph: {
    title: "Best Dark History Books in 2026, Ranked by Reader Reviews",
    description: "The best dark history books ranked by reader reviews. Uncover the gruesome, brutal, and disturbing facts from history that mainstream textbooks leave out.",
    url: "https://www.skriuwer.com/best-dark-history-books",
    type: "website",
  },
};

const INTRO = [
  "Every history textbook is a selection. Someone decided what mattered, what could be skipped, and what was too uncomfortable to explain to teenagers. Dark history books are the corrective: they go back to the events that got edited out and ask what actually happened, who did it, why they were never held accountable, and what it tells us about power that these stories stayed buried as long as they did.",
  "The books on this list are not sensationalism. They are rigorous, sourced, and serious. The difference between dark history and horror tourism is documentation. These authors use archives, court records, firsthand testimony, and physical evidence. The darkness is real, which is exactly what makes these books matter.",
  "We ranked this list by reader reception across thousands of verified reviews. A high rank here means real readers, not just reviewers, found the book essential. We included books across several dark history categories: colonial atrocities, medical crimes, state violence, institutional abuse, and the deliberate destruction of peoples and cultures. The unifying thread is that every book here covers something that happened, was documented, and still does not get nearly enough attention.",
  "If you are new to dark history and want a starting point that is challenging but not overwhelming, the FAQ at the bottom recommends an entry point by reading level. Otherwise, scroll to the ranked list.",
];

const FAQ = [
  {
    q: "What makes a book 'dark history' rather than just regular history?",
    a: "Dark history books specifically focus on the events, systems, and actors that mainstream historical accounts tend to minimize: mass violence, institutional cruelty, state-sanctioned atrocities, and deliberate cover-ups. Regular history books might mention these events in passing. Dark history books make them the subject. The goal is not shock, it is accountability and a fuller understanding of how the world actually worked.",
  },
  {
    q: "Are dark history books suitable for people who find disturbing content difficult?",
    a: "This category covers genuinely disturbing material, so reader judgment matters. Most of the books on this list are written with serious scholarly intent rather than gratuitousness, and the better ones include enough context and analysis to make the material bearable rather than just brutal. If you are sensitive to graphic accounts, start with books focused on structural history (how systems of oppression worked) rather than forensic detail of individual cases. The FAQ entry below on beginner-friendly picks identifies which to start with.",
  },
  {
    q: "Which dark history book should I read first?",
    a: "For readers new to the genre, King Leopold's Ghost by Adam Hochschild is the standard recommendation. It covers the Belgian colonization of the Congo, a story of industrial-scale atrocity that was systematically suppressed for decades. The writing is narrative and clear, the documentation is thorough, and the scale of what Hochschild uncovered makes it genuinely difficult to put down. It is disturbing because the facts are disturbing, not because the author sensationalizes them.",
  },
  {
    q: "Is dark history the same as conspiracy books?",
    a: "They overlap but are not the same. Dark history focuses on documented atrocities and uncomfortable truths that are well-evidenced but underreported. Conspiracy books focus specifically on the active concealment of information, cover-ups, and powerful actors working to suppress evidence. A dark history book might document a massacre. A conspiracy book would focus on who ordered the cover-up afterward and how they pulled it off. Some books do both.",
  },
  {
    q: "Do dark history books have any hope in them, or are they purely bleak?",
    a: "The best ones do. The goal of dark history is not nihilism, it is honesty. Many of the authors on this list write with an implicit argument: that understanding what happened is the precondition for making sure it does not happen again. Books like Stamped from the Beginning by Ibram X. Kendi or Medical Apartheid by Harriet Washington are angry books, but they are also books that trust readers enough to believe that knowing matters. The bleakness is a feature, not a bug, it is what you feel when you realize the textbook version was a lie.",
  },
  {
    q: "Are these books suitable for teenagers or younger readers?",
    a: "Some, with guidance. Books focused on structural analysis (how colonialism worked, the history of propaganda) are generally suitable for 16 and above. Books with detailed forensic or victim-level accounts of violence are better suited to adults. As a rule, anything listed in the top half of this list handles its material with enough analytical distance to be teachable. Check individual reviews for specific content warnings.",
  },
];

export default function BestDarkHistoryBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("dark-history"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Dark History Books in 2026, Ranked by Reader Reviews"
      description="History is far darker than any textbook will ever admit. These are the best dark history books, unflinching accounts of atrocities, cover-ups, and the brutal realities of the past, ranked by readers who wanted the full truth."
      books={books}
      breadcrumb="Best Dark History Books"
      categoryPage="/category/dark-history"
      categoryLabel="dark history"
      canonical="https://www.skriuwer.com/best-dark-history-books"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
