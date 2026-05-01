import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Egyptian Mythology Books in 2026 | Top Reads on Ancient Egypt",
  description:
    "The best Egyptian mythology books ranked by reader reviews. Discover the gods, pharaohs, and sacred rituals of ancient Egypt, from Osiris and Ra to the mysteries of the pyramids.",
  alternates: { canonical: "https://www.skriuwer.com/best-egyptian-mythology-books" },
  openGraph: {
    title: "Best Egyptian Mythology Books in 2026 | Top Reads on Ancient Egypt",
    description: "The best Egyptian mythology books ranked by reader reviews. Discover the gods, pharaohs, and sacred rituals of ancient Egypt, from Osiris and Ra to the mysteries of the pyramids.",
    url: "https://www.skriuwer.com/best-egyptian-mythology-books",
    type: "website",
  },
};

const INTRO = [
  "Egyptian mythology is unique among the world's great religious traditions because it is simultaneously one of the oldest and one of the most visually stunning. The gods have animal heads not because the Egyptians were primitive but because the animal forms encoded specific qualities: the jackal of Anubis was associated with desert scavenging and thus with the realm of the dead; the ibis of Thoth with the reed pen and thus with scribal wisdom; the falcon of Horus with the sky and thus with kingship. Egyptian mythology is a symbolic system, and once you understand the symbols, the whole world of pharaonic Egypt starts to make sense.",
  "This list is ranked by reader reception across thousands of verified reviews, covering three types of books. Primary sources in good modern translations, especially the Book of the Dead and the Pyramid Texts. Scholarly introductions written for general readers, which explain the mythology in its historical and ritual context. And a small number of books that focus on specific figures or stories: Osiris, Isis, Ra, Horus, and the central drama of death, resurrection, and judgement that drove three thousand years of Egyptian religious life.",
  "Egyptian mythology is unusual in that it changed significantly over three thousand years and varied by region. The Osirian cycle, the most famous storyline involving the murder of Osiris by Set, the resurrection by Isis, and the battle of Horus for the throne, is the thread that ties most of it together. If you start there, everything else has a home to return to.",
  "New to Egyptian mythology? Start with the FAQ, where we recommend a specific reading order. Returning reader who wants primary sources in good translations? Skip straight to the bottom of the ranked list.",
];

const FAQ = [
  {
    q: "What is the best Egyptian mythology book for beginners?",
    a: "The Complete Gods and Goddesses of Ancient Egypt by Richard Wilkinson is the most accessible reference, comprehensive enough to answer every question you will have but written for general readers rather than Egyptologists. If you want a narrative introduction rather than a reference, Geraldine Pinch's Egyptian Mythology: A Guide to the Gods, Goddesses, and Traditions of Ancient Egypt is the most recommended single-volume overview. Both will give you enough grounding to read the primary sources without feeling lost.",
  },
  {
    q: "What is the Book of the Dead, and should I read it?",
    a: "The Book of the Dead is a collection of spells, prayers, and instructions intended to guide the soul through the afterlife journey and the judgement of Osiris. It was not a single book but a collection assembled from different sources, and different versions were compiled for different wealthy individuals who could afford to commission them. The best modern translation for general readers is the E.A. Wallis Budge version, which is public domain and freely available, though Budge has some interpretive quirks that more recent scholarship has moved past. The Raymond Faulkner translation, with Andrew George's introduction, is the more academically current choice.",
  },
  {
    q: "Who are the most important Egyptian gods to know?",
    a: "Start with five: Ra (the sun, the creator), Osiris (death, resurrection, judgement), Isis (magic, protection, the ideal wife and mother), Horus (kingship, the sky, the eye of Ra), and Set (chaos, the desert, the necessary enemy). These five form the core dramatic arc of Egyptian mythology. Anubis (embalming, the scales of judgement) and Thoth (writing, wisdom, the moon) are important supporting characters. Once you have those seven, the rest of the pantheon falls into place because the Egyptian gods were all in relationship with each other, not isolated figures.",
  },
  {
    q: "How did Egyptian mythology influence other religions?",
    a: "The influence is substantial and still debated in detail. The Osirian resurrection story has been compared to later resurrection traditions. The concept of weighing the soul against a feather in the Hall of Two Truths has parallels in later judgement traditions across multiple religions. The figure of Isis nursing the infant Horus influenced early Christian iconography of Mary and Jesus, which is well-documented historically. Egyptian mystery religions were practiced throughout the Roman Empire, and Isis worship in particular was genuinely international by the 1st century BCE. The connections are real but complex, and any book that claims simple direct lines of influence should be read skeptically.",
  },
  {
    q: "Is Egyptian mythology the same as Egyptian history?",
    a: "They overlap but are not identical. Egyptian mythology is the religious and cosmological story system: the gods, the creation, the afterlife, the cosmic battles. Egyptian history is what actually happened politically, dynastically, militarily, and economically across three thousand years. The mythology shaped the history (pharaohs claimed divine descent and performed ritual roles) and the history shaped the mythology (different cities promoted different patron gods to prominence as their political power rose). You need some of both to understand either properly.",
  },
  {
    q: "What are the most fascinating Egyptian myths?",
    a: "The story of Osiris is the central one: Osiris is murdered by his brother Set, dismembered and scattered across Egypt, reassembled by his wife Isis, briefly resurrected long enough to conceive Horus, then becomes the god of the dead and judge of souls. It has everything: murder, resurrection, magic, sex, conspiracy, and divine justice. The Contendings of Horus and Set, about the legal battle over who should inherit Egypt after Osiris, is funnier and stranger than most people expect. The Destruction of Mankind, in which Ra sends the goddess Hathor to slaughter humanity and stops her by flooding the world with beer, is a genuinely bizarre story that survives in only one complete papyrus.",
  },
];

export default function BestEgyptianMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return /egypt|egyptian|pharaoh|pyramid|osiris|\bra\b|isis|horus|anubis|nile/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Egyptian Mythology Books in 2026, Ranked by Reader Reviews"
      description="Ancient Egypt produced one of history's most fascinating mythological systems, gods with animal heads, afterlife judgements, and cosmic battles that shaped a civilisation for three thousand years. These are the best Egyptian mythology books, ranked by reader reviews."
      books={books}
      breadcrumb="Best Egyptian Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://www.skriuwer.com/best-egyptian-mythology-books"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
