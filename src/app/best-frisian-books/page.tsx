import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Frisian Books in 2026, Ranked by Reader Reviews",
  description:
    "The best books for learning and exploring the Frisian language, one of Europe's oldest and most fascinating minority languages. From beginner guides to bilingual readers.",
  alternates: { canonical: "https://www.skriuwer.com/best-frisian-books" },
  openGraph: {
    title: "Best Frisian Books in 2026, Ranked by Reader Reviews",
    description: "The best books for learning and exploring the Frisian language, one of Europe's oldest and most fascinating minority languages. From beginner guides to bilingual readers.",
    url: "https://www.skriuwer.com/best-frisian-books",
    type: "website",
  },
};

const INTRO = [
  "Frisian is one of the oldest Germanic languages still spoken, and linguistically it is the closest living relative to English. Yet fewer than half a million people speak it today, almost all of them in the province of Friesland in the northern Netherlands. That rarity makes Frisian books a niche category, but the books that exist are genuinely useful for anyone interested in this linguistic heritage or trying to learn the language.",
  "West Frisian (Westerlauwersk Frysk) is the official variant spoken in Friesland and the one most books focus on. North Frisian and Saterland Frisian are smaller dialect clusters with even fewer published resources. If you are shopping for Frisian books, make sure you are looking at West Frisian unless you have a specific regional interest.",
  "The category divides into two main types: language learning books (grammar guides, vocabulary builders, bilingual readers designed for people trying to acquire the language) and books about Frisian culture, history, and literature (academic works, cultural histories, and translated Frisian literary texts). Both are represented in this list, ranked by reader reviews.",
  "The FAQ below covers the most common questions about Frisian as a language and how to find good learning resources. The language is genuinely accessible for English speakers because of the historical connection, 'cheese' is 'tsiis', 'bread' is 'brea', 'boat' is 'boat'. That familiarity makes it a rewarding first minority-language learning project.",
];

const FAQ = [
  {
    q: "Is West Frisian difficult to learn if you speak English?",
    a: "Frisian is the easiest non-English Germanic language for English speakers because the two languages share a particularly close ancestor. Many basic vocabulary items are similar or identical: 'water' is 'wetter', 'green' is 'grien', 'church' is 'tsjerke'. The grammar has grammatical gender (like Dutch and German) which adds some complexity, but for a speaker approaching from English, Frisian is significantly easier than German and roughly comparable to Dutch.",
  },
  {
    q: "What is the best book for learning West Frisian from scratch?",
    a: "Frisian language learning resources are limited compared to major languages, but bilingual short story collections aimed at learners are the most practical starting point. The LearnFrisian platform (learnfrisian.com) also offers structured lessons and audio that supplement book learning. For grammar reference, Pieter Meijes Tiersma's Frisian Reference Grammar is the most rigorous English-language grammar guide, though it is academic rather than beginner-friendly.",
  },
  {
    q: "Are there any Frisian novels or literary works translated into English?",
    a: "A small number of Frisian literary works have been translated into English, mostly through academic presses and cultural institutions in Friesland. The Fryske Akademy (Frisian Academy) publishes some bilingual editions. Rink van der Velde is the most celebrated 20th-century Frisian novelist and some of his work has been translated. For poetry, Tsjêbbe Hettinga was the best-known modern Frisian poet internationally and some collections are available with English translation.",
  },
  {
    q: "Is Frisian a dying language?",
    a: "It is a minority language under pressure but not dead. The Dutch government officially recognizes West Frisian and it is taught in Frisian schools. Around 470,000 people speak it. The concern is intergenerational transmission: younger Frisians often prefer Dutch in daily life, which gradually reduces fluency in the next generation. Frisian has an active literary culture, a public broadcaster (Omrop Fryslan), and institutional support that comparable minority languages lack.",
  },
  {
    q: "What is the connection between Frisian and Old English?",
    a: "Anglo-Frisian is the term for the common ancestor of English and Frisian, a dialect cluster spoken along the North Sea coast before the Anglo-Saxon migrations to Britain in the 5th and 6th centuries. The two languages diverged after that point but remained close enough that medieval English and Frisian speakers could understand each other. Modern Frisian shows this lineage clearly in basic vocabulary, where it resembles English more than it resembles Dutch or German.",
  },
  {
    q: "Can I learn Frisian without going to Friesland?",
    a: "Yes, though it helps to have audio resources because Frisian pronunciation is distinctive and difficult to infer from spelling alone. Online platforms like LearnFrisian.com provide structured audio-based lessons. For book-based learning, bilingual collections give you the reading side. YouTube channels run by the Frisian broadcaster Omrop Fryslan also provide free listening practice. Immersion in Friesland accelerates learning dramatically but is not a prerequisite for gaining basic reading and listening comprehension.",
  },
];

export default function BestFrisianBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const combined = `${b.title} ${b.description}`.toLowerCase();
      return combined.includes("frisian") || combined.includes("fries");
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Frisian Books in 2026"
      description="Frisian is one of the closest living relatives to English and one of Europe's most endangered minority languages. These are the best Frisian books available, from language learning guides to bilingual readers, perfect for anyone wanting to connect with this remarkable linguistic heritage."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Frisian Books"
      categoryPage="/category/language-learning"
      categoryLabel="language learning"
      canonical="https://www.skriuwer.com/best-frisian-books"
    />
  );
}
