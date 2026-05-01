import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books About Ancient Greece in 2026, Ranked by Reader Reviews",
  description:
    "The best books about Ancient Greece ranked by reader reviews. From Socrates and Plato to the Trojan War and Alexander the Great, discover the essential reads for Greek history fans.",
  alternates: { canonical: "https://www.skriuwer.com/best-ancient-greece-books" },
  openGraph: {
    title: "Best Books About Ancient Greece in 2026, Ranked by Reader Reviews",
    description: "The best books about Ancient Greece ranked by reader reviews. From Socrates and Plato to the Trojan War and Alexander the Great, discover the essential reads for Greek history fans.",
    url: "https://www.skriuwer.com/best-ancient-greece-books",
    type: "website",
  },
};

const INTRO = [
  "Ancient Greece is not just ancient history. It is the foundation of Western democracy, philosophy, science, and drama, packed into roughly 300 years between the Persian Wars and the death of Alexander the Great. The civilisation that produced Socrates, Pericles, Thucydides, and Euripides was also capable of extraordinary cruelty, slavery, and endless internecine warfare. That tension is what makes the books about it so compelling.",
  "This list covers the full range of Ancient Greece: the city-states of Athens and Sparta, the philosophy of Plato and Aristotle, the military genius of Alexander, the mythology woven through daily life, and the primary sources that historians still argue over today. We ranked everything by reader reviews, not academic prestige, so the order reflects what actually holds attention rather than what scholars think you should read.",
  "A note on scope: we included narrative histories, biography, primary source translations, and accessible academic works written for general readers. We excluded specialist monographs and untranslated Greek texts. If you want to read Thucydides in translation, this list has the best modern editions. If you want a single sweeping narrative of the whole period, we have that too.",
  "If you are not sure where to start, the FAQ below addresses the most common questions: whether to begin with primary sources or modern histories, how to tackle Plato for the first time, and what to read if you are mainly interested in the Spartan side of the story. Otherwise, start scrolling.",
];

const FAQ = [
  {
    q: "What is the best book on Ancient Greece for a complete beginner?",
    a: "The Peloponnesian War by Donald Kagan (the abridged one-volume edition, not the four-volume set) is an excellent entry point if you want history. Kagan writes with clarity and genuine excitement about the conflict between Athens and Sparta. If you want mythology and culture first, try Edith Hamilton's The Greek Way, it covers art, philosophy, and religion in about 300 pages without becoming academic. Both books assume no prior knowledge.",
  },
  {
    q: "Should I read Thucydides or Herodotus first?",
    a: "Herodotus first. His Histories cover the Persian Wars (Thermopylae, Marathon, Salamis) and read more like a travel narrative, he includes legends, gossip, and digressions that make the ancient world feel vivid and strange. Thucydides, who wrote about the Peloponnesian War, is drier and more analytical. He invented political history but he assumes you already care deeply about Athenian politics. The recommended reading order is Herodotus, then Thucydides, then Kagan's modern synthesis to tie both together.",
  },
  {
    q: "Which biography of Alexander the Great is worth reading?",
    a: "Alexander the Great by Robin Lane Fox remains the gold standard after 50 years. It is long (almost 600 pages) but reads like a novel because Lane Fox actually rode on horseback across Alexander's route to understand the logistics. For a shorter alternative, Philip Freeman's Alexander the Great is well-researched and finishes in under 400 pages. Both use Arrian and Plutarch as primary sources, which they cite clearly.",
  },
  {
    q: "How do I start reading Plato without getting lost?",
    a: "Start with the short dialogues: Meno, Euthyphro, and Apology. They are each under 50 pages, they require no prior philosophy, and they establish who Socrates is before you tackle the Republic. The Republic is the book everyone thinks they should read, but if you go there first without context, the first three books will feel frustratingly abstract. Read the short dialogues, then the Republic, then Symposium if you want Plato on love and beauty.",
  },
  {
    q: "What is the best book about Sparta specifically?",
    a: "Sparta: Unfit for Empire by Paul Cartledge gives a balanced, modern account of why Sparta won militarily but failed as a long-term political project. Paul Cartledge is the leading English-language Sparta scholar and he avoids both the romantic myth and the revisionist dismissal. For a more narrative account focused on the Spartan warriors themselves, The Spartans by Andrew Bayliss (2023) is accessible and recent.",
  },
  {
    q: "Are there any good books about ancient Greek women?",
    a: "Women in Ancient Greece by Sue Blundell is the clearest academic introduction, covering household roles, religion, and the limited public sphere available to women across different city-states. For a more literary approach, Natalie Haynes's Pandora's Jar retells twelve Greek myths through the women who are usually sidelined in the canonical versions: Medusa, Helen, Medea, Penelope. It is scholarly enough to trust and entertaining enough to finish in a weekend.",
  },
  {
    q: "What should I read about ancient Greek philosophy beyond Plato?",
    a: "The Stoics and Epicureans by Robert Sharples covers post-Platonic philosophy clearly, including the schools that influenced Roman thought most deeply. For Aristotle specifically, Jonathan Barnes's Aristotle: A Very Short Introduction is the fastest serious entry point. Nicomachean Ethics is Aristotle's most readable major work and the right place to start if you want the primary text rather than commentary.",
  },
];

export default function BestAncientGreeceBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /\bgreece\b|\bgreek\b|athens|sparta|socrates|plato|aristotle|alexander|pericles|thucydides|herodotus|acropolis|parthenon|olympia|peloponnesian|marathon\b|thermopylae|agora/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books About Ancient Greece"
      description="Ancient Greece gave us democracy, philosophy, drama, and the Olympic Games. These are the best books about Ancient Greece, from the city-states of Athens and Sparta to the conquests of Alexander the Great, ranked by readers passionate about the birthplace of Western civilization."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Ancient Greece Books"
      categoryPage="/category/history"
      categoryLabel="history"
      canonical="https://www.skriuwer.com/best-ancient-greece-books"
    />
  );
}
