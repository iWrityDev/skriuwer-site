import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books About Ancient Egypt in 2026 | Top Picks for Egypt Fans",
  description:
    "The best books about Ancient Egypt ranked by reader reviews. From the pharaohs and pyramids to Egyptian mythology and daily life, discover the top picks for Egypt enthusiasts.",
  alternates: { canonical: "https://www.skriuwer.com/best-ancient-egypt-books" },
  openGraph: {
    title: "Best Books About Ancient Egypt in 2026 | Top Picks for Egypt Fans",
    description: "The best books about Ancient Egypt ranked by reader reviews. From the pharaohs and pyramids to Egyptian mythology and daily life, discover the top picks for Egypt enthusiasts.",
    url: "https://www.skriuwer.com/best-ancient-egypt-books",
    type: "website",
  },
};

const INTRO = [
  "Ancient Egypt lasted for roughly 3,000 years as a recognizable, continuous civilization, longer than Rome, longer than any European state, longer than any political entity in modern history. Understanding why it lasted that long, what held it together, and why it finally fragmented is more interesting than the pyramids, which are essentially marketing material from a civilization that was very good at presenting itself to the future.",
  "The books on this list are ranked by real reader reception rather than academic weight. We included three types: accessible general histories that cover the full sweep from the Old Kingdom to Cleopatra; focused studies of specific periods, pharaohs, or discoveries; and a small number of primary sources in good modern translations, because reading an Egyptian medical papyrus or a love poem from 3,000 years ago is a different kind of experience than reading about Egypt.",
  "Egyptian history has benefited enormously from modern archaeology and DNA analysis, and the best recent books reflect this. Many assumptions that earlier Egyptology treated as settled, about race, about religion, about the construction methods of major monuments, are now actively contested. Books published in the last ten years are generally more scientifically current and more honest about uncertainty.",
  "Complete beginner? The FAQ below recommends a starting point for different types of readers. Want to start with the books ranked highest by readers? Scroll straight to the list.",
];

const FAQ = [
  {
    q: "What is the best Ancient Egypt book for beginners?",
    a: "The Oxford History of Ancient Egypt, edited by Ian Shaw, is the academic standard but reads more accessibly than its title suggests. For a faster and more narrative read, Bob Brier and Hoyt Hobbs's Daily Life of the Ancient Egyptians covers exactly what the title says, food, clothing, work, religion, and family, from the perspective of ordinary people rather than pharaohs. If you want something that reads like a story, Toby Wilkinson's The Rise and Fall of Ancient Egypt is the best single-volume narrative history currently in print.",
  },
  {
    q: "How were the pyramids really built?",
    a: "By organized labor, probably including well-fed skilled workers rather than enslaved people, using sledges, ramps, and an enormous logistical system. The workers' village at Giza has been excavated and shows evidence of good nutrition and medical care. The precise ramp configuration is still debated, multiple systems have been proposed and partially evidenced. Mark Lehner's The Complete Pyramids is the most authoritative single book on construction methods. The short answer is: organized human labor over decades, not aliens, not slaves.",
  },
  {
    q: "What do we actually know about Cleopatra?",
    a: "More than popular culture suggests, and less than biographical treatments claim. We know she was the last ruler of the Ptolemaic dynasty (Macedonian Greek, not ethnically Egyptian), that she was the first of her dynasty to learn the Egyptian language, that she had political relationships with both Julius Caesar and Mark Antony, and that she died in 30 BCE after Antony's defeat. Stacy Schiff's Cleopatra: A Life is the best modern biography. Adrian Goldsworthy's Antony and Cleopatra gives more context on the Roman side. What she looked like, how she felt, most of what films show about her: invention.",
  },
  {
    q: "What is the Book of the Dead?",
    a: "A collection of spells, prayers, and instructions compiled to guide the soul through the afterlife journey and the judgement of Osiris in the Hall of Two Truths. Different versions were assembled for wealthy individuals who commissioned their own copies. It was not a single canonical text but a customizable religious document. The E.A. Wallis Budge translation is the free public-domain version. The Raymond Faulkner translation, with Andrew George's introduction in the British Museum edition, is the most readable modern choice.",
  },
  {
    q: "Is everything we know about ancient Egypt based on the pyramids?",
    a: "No, and this is a common misconception. Egypt produced enormous quantities of text: religious texts, administrative records, private letters, love poetry, medical manuals, legal documents, and literary narratives. Many survive on papyrus, ostraca (pottery shards), and carved stone. The Egyptians were prolific writers and record-keepers, and Egyptology has produced detailed pictures of ordinary life, trade economics, judicial processes, and popular religion that go far beyond the monumental sites most people associate with the civilization.",
  },
  {
    q: "Were ancient Egyptians black or white?",
    a: "This question has a politically charged history and a scientific answer that is more complex than either side of the debate usually presents. The ancient Egyptian population was genetically diverse and changed over time. Early Egyptians show closer genetic ties to North African and Levantine populations than to sub-Saharan Africa, but the population was never uniform, and trade, migration, and conquest introduced continuous genetic mixing. The modern racial categories of 'black' and 'white' did not exist in antiquity. Books that claim ancient Egyptians were straightforwardly one or the other are doing politics, not history.",
  },
];

export default function BestAncientEgyptBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /egypt|pharaoh|pyramid|nile|hieroglyph|mummy|sphinx|cleopatra|osiris|isis|ra\b|anubis|tutankhamun|ramesses/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books About Ancient Egypt in 2026, Ranked by Reader Reviews"
      description="Ancient Egypt built wonders that still defy explanation, the pyramids, the Sphinx, and a civilization that lasted 3,000 years. These are the best books about Ancient Egypt, covering everything from the pharaohs and gods to daily life along the Nile, ranked by passionate readers."
      books={books}
      breadcrumb="Best Ancient Egypt Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-ancient-egypt-books"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
