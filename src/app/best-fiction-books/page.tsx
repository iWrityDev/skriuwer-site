import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Fiction Books of All Time, Ranked by Reader Reviews",
  description:
    "The best fiction books of all time ranked by reader reviews. From literary classics to gripping thrillers, these are the novels readers return to again and again.",
  alternates: { canonical: "https://www.skriuwer.com/best-fiction-books" },
  openGraph: {
    title: "Best Fiction Books of All Time, Ranked by Reader Reviews",
    description: "The best fiction books of all time ranked by reader reviews. From literary classics to gripping thrillers, these are the novels readers return to again and again.",
    url: "https://www.skriuwer.com/best-fiction-books",
    type: "website",
  },
};

const INTRO = [
  "The best fiction does something that no other format can: it puts you inside someone else's consciousness. Not their summary of events, not their argument about ideas, but their actual perceptions as they move through the world. That is why the fiction that stays with you for years feels different from a film or a podcast about the same subject. The experience is interior in a way that nothing else replicates.",
  "This list covers literary and popular fiction, from character-driven novels that have won major awards to genre fiction with massive reader followings. We ranked by reader review count, which means the list reflects sustained popularity rather than critical consensus. A novel that moves a million ordinary readers is doing something different from a novel that impresses 10,000 reviewers, and both kinds matter for different reasons.",
  "A few categories you will find here: psychological thrillers (suspense built on character rather than plot mechanics), historical fiction (novels set in verifiable periods and places), literary fiction (language-forward, character-driven, not always plot-heavy), and contemporary fiction (set in the recognizable present). We have tried to give each category enough representation that you can find your preferred style.",
  "If you are not sure what kind of fiction to try next, the FAQ below offers specific recommendations by mood and reading history. If you already know what you are looking for, the ranked list is directly below.",
];

const FAQ = [
  {
    q: "What is the best fiction book for someone who has not read a novel in years?",
    a: "A short, gripping novel with a fast pace is the right re-entry point. The Girl with the Dragon Tattoo by Stieg Larsson is long but reads fast because the mystery structure pulls you forward. For something shorter, The Curious Incident of the Dog in the Night-Time by Mark Haddon is under 250 pages and extremely engaging. Anything by Colm Toibin or John Boyne works if you want literary fiction that does not feel demanding.",
  },
  {
    q: "What is the difference between literary fiction and popular fiction?",
    a: "Literary fiction prioritizes language, character interiority, and ambiguity. It often ends without resolution and rewards slow reading. Popular fiction (including most genre fiction) prioritizes plot momentum and clear payoff. It ends with resolution and rewards fast reading. Neither is better. The distinction matters only when choosing what to read next: if you want to be challenged and are fine with an open ending, go literary. If you want to be entertained and need closure, go popular.",
  },
  {
    q: "What are the best historical fiction novels?",
    a: "Hilary Mantel's Wolf Hall trilogy (Wolf Hall, Bring Up the Bodies, The Mirror and the Light) is the best historical fiction of the last 20 years by most critical standards. It covers Thomas Cromwell in Henry VIII's court and is exceptional at making Tudor politics feel urgent and immediate. For something more accessible in scope, Anthony Burgess's A Dead Man in Deptford (on Christopher Marlowe) and Colm Toibin's The Master (on Henry James) are shorter and easier to complete.",
  },
  {
    q: "What are the most popular psychological thrillers worth reading?",
    a: "Gone Girl by Gillian Flynn is the novel that defined modern domestic suspense: an unreliable narrator, a disintegrating marriage, and a third-act twist that most readers never see coming. The Girl on the Train by Paula Hawkins followed the same formula to huge commercial success. For something with more literary weight, In the Woods by Tana French (the first of her Dublin Murder Squad series) is the psychological thriller most often recommended by people who also read literary fiction.",
  },
  {
    q: "Are there good novels that are also educational about history or science?",
    a: "Yes, historical fiction at its best teaches you something real about a period while telling a story. Patrick O'Brian's Master and Commander series is the most academically researched naval fiction ever written, a genuine resource on Napoleonic-era seamanship. The Pillars of the Earth by Ken Follett teaches you more about medieval cathedral construction than most nonfiction on the subject. For science, Richard Powers's The Overstory (about trees and ecology) and his earlier The Goldbug Variations (genetics and music) embed serious scientific thinking in narratively compelling fiction.",
  },
  {
    q: "What is the best novel to read if you want to understand a different culture?",
    a: "Chinua Achebe's Things Fall Apart is a 45-year standard on this question: it shows colonial Nigeria from the inside, through the perceptions of someone who sees European arrival as an incomprehensible catastrophe. More recently, Ocean Vuong's On Earth We're Briefly Gorgeous does the same for the Vietnamese American experience. For India, The God of Small Things by Arundhati Roy is the most celebrated choice. All three are under 300 pages.",
  },
];

export default function BestFictionBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("fiction"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Fiction Books of All Time"
      description="Great fiction doesn't just tell a story, it changes how you see the world. These are the best fiction books ranked by reader popularity, spanning literary novels, psychological thrillers, and genre-defining classics."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Fiction Books of All Time"
      categoryPage="/category/fiction"
      categoryLabel="fiction"
      canonical="https://www.skriuwer.com/best-fiction-books"
    />
  );
}
