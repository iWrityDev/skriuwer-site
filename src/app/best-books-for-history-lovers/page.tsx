import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books for History Lovers in 2026, Ranked by Reader Reviews",
  description:
    "The best books for history lovers, ranked by reader reviews. From ancient civilisations and world wars to dark historical secrets, these are the essential reads for every history enthusiast.",
  alternates: { canonical: "https://www.skriuwer.com/best-books-for-history-lovers" },
  openGraph: {
    title: "Best Books for History Lovers in 2026, Ranked by Reader Reviews",
    description: "The best books for history lovers, ranked by reader reviews. From ancient civilisations and world wars to dark historical secrets, these are the essential reads for every history enthusiast.",
    url: "https://www.skriuwer.com/best-books-for-history-lovers",
    type: "website",
  },
};

const INTRO = [
  "History books come in two varieties. The first kind is the textbook: comprehensive, neutral, organized chronologically, and designed to pass exams rather than hold attention. The second kind is the book that makes you forget to sleep. This list is built around the second kind. Every title here has thousands of readers who finished it and immediately recommended it to someone else.",
  "The best history books do something that surprises people who only read textbooks: they make choices. They pick an angle, a character, a turning point, and they follow it. Mary Beard's SPQR is not a complete history of Rome, it is a brilliant argument about how Rome actually worked. Erik Larson's The Devil in the White City is not just a biography of a serial killer, it is an account of how modern America invented itself at the 1893 World's Fair. That specificity is what makes them readable.",
  "This list spans eras and regions: ancient history, medieval Europe, the British Empire, the World Wars, American history, and the darker episodes that mainstream accounts often minimize. We ranked everything by reader reviews rather than academic citations because this is a list for people who read for pleasure, not for exams.",
  "If you are not sure where to start, the FAQ below gives specific recommendations based on your interests. If you already know what period or region fascinates you, scroll straight to the list.",
];

const FAQ = [
  {
    q: "What is the best history book for someone who does not usually read history?",
    a: "Erik Larson is the safest recommendation for reluctant history readers because his books are structured like thrillers. The Devil in the White City (Chicago, 1893), Dead Wake (the sinking of the Lusitania), and Isaac's Storm (the Galveston hurricane of 1900) all read as fast as fiction while being meticulously researched. Start with whichever period interests you most. His books require no background knowledge.",
  },
  {
    q: "What are the best books about ancient history?",
    a: "SPQR by Mary Beard is the best single-volume account of Roman history for general readers. Tom Holland's Rubicon covers the fall of the Republic specifically and reads like political drama. For ancient Greece, Paul Cartledge's The Spartans and Victor Davis Hanson's A War Like No Other (on the Peloponnesian War) are strong choices. For Egypt, Toby Wilkinson's The Rise and Fall of Ancient Egypt is the most comprehensive modern account.",
  },
  {
    q: "What are the best books about World War II?",
    a: "Antony Beevor's Stalingrad and The Fall of Berlin 1945 are the gold standard for Eastern Front military history. Rick Atkinson's Liberation Trilogy covers the Western Allied campaigns in three volumes. For the Pacific war, James Bradley's Flags of Our Fathers is narrative nonfiction at its best. If you want a single book covering the whole war, Max Hastings's All Hell Let Loose is the best one-volume attempt from the experience of ordinary soldiers.",
  },
  {
    q: "Are there good history books that cover dark or suppressed history?",
    a: "Yes, and this category has grown significantly in the last decade. Half the Sky by Kristof and WuDunn covers gender oppression across the developing world using journalistic narrative. Bury My Heart at Wounded Knee by Dee Brown is the definitive account of the destruction of Native American civilisations. Caroline Elkins's Imperial Reckoning on British concentration camps in Kenya won the Pulitzer. These books are uncomfortable, which is exactly why they are important.",
  },
  {
    q: "What are the best history books to give as a gift?",
    a: "Choose something tied to a specific interest. A person who loves the Roman Empire will prefer Tom Holland's Rubicon over a general world history survey. A person fascinated by crime and espionage might love Ben Macintyre's Operation Mincemeat or Agent Zigzag. Illustrated histories also make good gifts because they are visually appealing on a shelf. Avoid gifting very long multi-volume sets unless the person has explicitly asked for them.",
  },
  {
    q: "What is the best history book to read with no particular period in mind?",
    a: "Sapiens: A Brief History of Humankind by Yuval Noah Harari covers all of human history in roughly 400 pages and asks big questions about why our species dominates the planet. It has drawn criticism from some historians for oversimplification, but as a framework for thinking about history broadly, nothing else has reached as many readers. Guns, Germs, and Steel by Jared Diamond covers similar ground with more focus on geography and biology as drivers of history.",
  },
];

export default function BestBooksForHistoryLoversPage() {
  const books = getAllBooks()
    .filter(
      (b) =>
        b.categories.includes("history") || b.categories.includes("dark-history")
    )
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books for History Lovers"
      description="History lovers know that the past is never as simple as textbooks suggest, it is messier, stranger, and far more gripping. These are the top-rated history books across all eras and topics, ranked by readers who couldn't stop at just one."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Books for History Lovers"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-books-for-history-lovers"
    />
  );
}
