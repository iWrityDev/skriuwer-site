import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books on Ancient Civilizations in 2026",
  description:
    "The best books on ancient civilizations, Greece, Rome, Egypt, and more. Ranked by reader reviews, covering the history, culture, and legacy of the world's earliest great empires.",
  alternates: { canonical: "https://www.skriuwer.com/best-ancient-civilizations-books" },
  openGraph: {
    title: "Best Books on Ancient Civilizations in 2026",
    description: "The best books on ancient civilizations, Greece, Rome, Egypt, and more. Ranked by reader reviews, covering the history, culture, and legacy of the world's earliest great empires.",
    url: "https://www.skriuwer.com/best-ancient-civilizations-books",
    type: "website",
  },
};

const INTRO = [
  "Every system you live inside, law courts, representative government, alphabets, coinage, organized religion, philosophy as a discipline, was either invented or perfected by an ancient civilization. That is not an exaggeration. It is the literal record. The best books on ancient civilizations are not antiquarian curiosities, they are explanations of why the world works the way it does.",
  "This list covers the civilizations that shaped the most subsequent history: Greece, Rome, Egypt, Mesopotamia, and the Bronze Age world they all grew out of. We ranked every book by reader reception rather than academic prestige, which means the books that appear here are the ones that actual readers found compelling rather than the ones that professors assigned to undergraduates and forgot.",
  "Three types of books appear on this list. Broad surveys that cover multiple civilizations (Mary Beard, Tom Holland, Eric Cline). Deep dives into single civilizations that are so good they function as gateways to the whole field. And a small number of books about specific events, the Bronze Age collapse, the Peloponnesian War, the fall of the Republic, that illuminate the broader world by focusing tightly on one turning point.",
  "New to ancient history and not sure where to start? The FAQ at the bottom has a reading order recommendation by civilization and by prior knowledge level. Otherwise, start scrolling.",
];

const FAQ = [
  {
    q: "Which ancient civilization should I read about first?",
    a: "Greece or Rome are the easiest entry points because the historiography in English is the deepest and the authors are the most accessible. Tom Holland's Rubicon (Rome) and Bettany Hughes's The Hemlock Cup (Athens) are both narrative-driven and gripping. If you want to start with Egypt, Bob Brier's The History of Ancient Egypt (originally a lecture series) is the most enjoyable single overview. For Mesopotamia, the field is smaller and the writing more academic, but Andrew George's translation of The Epic of Gilgamesh is a readable primary source that puts everything in context.",
  },
  {
    q: "What is the best single book that covers all the major ancient civilizations?",
    a: "1177 B.C. by Eric Cline is the closest thing to a unified ancient world narrative. It covers the Bronze Age collapse that ended the Hittite Empire, Mycenaean Greece, and nearly toppled Egypt, all at roughly the same moment, around 1200 BCE. Because it treats the ancient Mediterranean as an interconnected system rather than a set of separate civilizations, it gives you a picture of how these cultures were actually related to each other. It is the book that makes you realize that ancient history is not a series of separate stories but one very long, very interconnected one.",
  },
  {
    q: "How accurate is popular ancient history writing compared to academic history?",
    a: "For the most part, the best popular ancient historians (Mary Beard, Tom Holland, Bettany Hughes, Adrian Goldsworthy) are rigorously sourced and intellectually honest about uncertainty. The genre's weakness is not usually factual error but interpretive overconfidence, the tendency to present one reading of ambiguous evidence as settled. Academic ancient history is more careful about flagging what we do not know, but it is also much harder to read. The sweet spot is popular history that includes notes and sources, which lets you check the claims if something seems too neat.",
  },
  {
    q: "Are there good books about ancient civilizations that are not Greece and Rome?",
    a: "Yes, and the best of them often feel like discovering a second history. The Lost City of the Monkey God by Douglas Preston covers the Mosquitia civilization of Honduras. Empires of the Monsoon by Richard Hall covers the Indian Ocean trade civilizations. The Kingdom of Kush by Derek Welsby covers the Nubian civilization that twice conquered Egypt. The Sumerians by Samuel Noah Kramer is the classic introduction to Mesopotamia. These civilizations were as sophisticated as Greece and Rome, they just lost the PR war because their descendants did not end up writing Western history.",
  },
  {
    q: "What is the most dramatic event in ancient history?",
    a: "Subjectively, the Bronze Age collapse around 1200 BCE. Within about 50 years, almost every major civilization in the eastern Mediterranean, Mycenaean Greece, the Hittite Empire, Ugarit, Cyprus, the Levantine city-states, collapsed simultaneously or nearly so. We still do not know exactly why. Climate change, drought, migrations, internal revolts, and systems collapse have all been proposed. Only Egypt survived, and barely. Eric Cline's 1177 B.C. is the best popular account. It reads like the end of the ancient world, because it was.",
  },
  {
    q: "I loved reading about Rome. What should I read next?",
    a: "If you loved Rome for the politics and power struggles, move to Byzantine history, which is the direct continuation of the Roman Empire that survived until 1453. Lars Brownworth's Lost to the West is the most readable introduction. If you loved Rome for the military history, try John Keegan's A History of Warfare for the broader context. If you loved Rome for the social history, Mary Beard's SPQR is the best starting point, then move to her Women and Power. If you loved Rome for the sheer drama and personalities, Tom Holland's Dynasty covers the early emperors with the same energy as Rubicon.",
  },
];

export default function BestAncientCivilizationsBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      if (!b.categories.includes("history")) return false;
      const titleLower = b.title.toLowerCase();
      return (
        titleLower.includes("ancient") ||
        titleLower.includes("roman") ||
        titleLower.includes("greek") ||
        titleLower.includes("egypt") ||
        titleLower.includes("mesopotamia") ||
        titleLower.includes("babylon") ||
        titleLower.includes("civilization")
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books on Ancient Civilizations in 2026, Ranked by Reader Reviews"
      description="Ancient Greece, Rome, Egypt, and Mesopotamia gave us philosophy, law, architecture, and some of history's most compelling stories. These are the best books on ancient civilizations, ranked by reader reviews, essential reading for anyone fascinated by the origins of the world we live in today."
      books={books}
      breadcrumb="Best Books on Ancient Civilizations"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-ancient-civilizations-books"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
