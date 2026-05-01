import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Philosophy Books in 2026, Ranked by Reader Reviews",
  description:
    "The best philosophy books ranked by reader reviews. From ancient Stoics to modern existentialists, these essential works will challenge how you think about life, meaning, and ethics.",
  alternates: { canonical: "https://www.skriuwer.com/best-philosophy-books" },
  openGraph: {
    title: "Best Philosophy Books in 2026, Ranked by Reader Reviews",
    description: "The best philosophy books ranked by reader reviews. From ancient Stoics to modern existentialists, these essential works will challenge how you think about life, meaning, and ethics.",
    url: "https://www.skriuwer.com/best-philosophy-books",
    type: "website",
  },
};

const INTRO = [
  "Philosophy does not become obsolete. The questions Plato raised about justice, knowledge, and the nature of reality are still open. The answers Aristotle gave about ethics and politics are still debated in serious academic journals. The Stoics wrote about anxiety and loss in ways that practicing therapists cite today. This is what makes philosophy books uniquely valuable: they are not competing with newer versions of themselves the way business books or popular science books are.",
  "This list covers both historical philosophy and contemporary philosophical writing. Historical texts (Plato's dialogues, Aristotle's Ethics, Marcus Aurelius's Meditations, Nietzsche's works) sit alongside modern introductions and contemporary philosophers who have made ancient ideas accessible to general readers. The ranking is by reader reviews, not academic citation counts, so it reflects what actually holds attention rather than what scholars feel obligated to assign.",
  "Philosophy is unusually prone to barrier-by-reputation. People assume Hegel is impossible before opening the book, or skip Kant because someone told them it is too technical. Some of that reputation is deserved (Hegel and Kant are genuinely hard). Most of it is not. Plato reads faster than most literary fiction. Epictetus's Enchiridion is 30 pages. Marcus Aurelius is one of the most intimate books ever written by anyone in any genre.",
  "The FAQ below addresses the most common philosophy starting-point questions, including how to read Plato if you have never studied philosophy and which contemporary philosophers are actually worth reading. The ranked list follows.",
];

const FAQ = [
  {
    q: "Where should a complete beginner start with philosophy?",
    a: "Start with Plato's Apology, which is his account of Socrates's trial and death and requires no background knowledge. It is under 50 pages and it raises questions (what is wisdom, why do people fear what they do not understand, what is worth dying for) that feel as immediate as anything written this century. Follow it with Meno (on knowledge and virtue) and then the Republic if you want more Plato. If you want a broader map of Western philosophy first, Simon Blackburn's Think is the clearest single-volume introduction available.",
  },
  {
    q: "Is Nietzsche actually readable or is he as difficult as people say?",
    a: "Nietzsche is more readable than his reputation suggests, largely because the reputation was built by people who started with Beyond Good and Evil or Thus Spoke Zarathustra. Start instead with The Gay Science (sections 108 to 125 specifically, where he presents the death of God), or with On the Genealogy of Morality, which is the most structured of his major works. Nietzsche's difficulty is not his prose (which is vivid and often funny) but his habit of assuming you already know the philosophers he is arguing against.",
  },
  {
    q: "What is the best introduction to Stoic philosophy?",
    a: "Marcus Aurelius's Meditations is the best first Stoic text because it was never written for an audience. It is a private journal written to keep a Roman emperor honest with himself, which makes it more intimate and less didactic than Seneca's letters or Epictetus's Enchiridion. After Meditations, read Ryan Holiday's The Obstacle Is the Way for the modern application, and then return to the primary sources (Epictetus, Seneca) with a better sense of what you are looking for.",
  },
  {
    q: "What is the difference between Eastern and Western philosophy?",
    a: "Western philosophy (in the Greek tradition) tends to focus on logic, epistemology (what can we know and how), metaphysics (what exists), and ethics grounded in rational argument. Eastern philosophy (Buddhism, Taoism, Confucianism, Vedanta) tends to focus on practice, on how to live rather than how to argue, and treats the separation between mind and world as itself the problem. The Tao Te Ching by Laozi and the Dhammapada (Buddhist teachings of the Buddha) are the two most accessible Eastern primary texts for Western readers.",
  },
  {
    q: "Is there a philosophy book that actually addresses modern life, not just ancient problems?",
    a: "The Examined Life by Robert Nozick, Justice by Michael Sandel, and How to Live by Sarah Bakewell (on Montaigne) all apply philosophical thinking to contemporary situations without requiring prior philosophy knowledge. Sandel's Justice was a Harvard course before it became a book, and it is specifically about the trade-offs modern societies make between liberty, equality, and virtue, using real cases from politics and law.",
  },
  {
    q: "What are the best philosophy books for people who already know the basics?",
    a: "If you have read Plato, Aristotle, and the Stoics and want to go further, the next natural steps are Descartes's Meditations on First Philosophy (the foundation of modern epistemology), David Hume's Enquiry Concerning Human Understanding (the philosophical problem of causation and induction), and Immanuel Kant's Critique of Pure Reason (very hard but unignorable). For 20th-century philosophy, Ludwig Wittgenstein's Philosophical Investigations and Jean-Paul Sartre's Being and Nothingness are the two most influential texts, both genuinely difficult.",
  },
];

export default function BestPhilosophyBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("philosophy") ||
        /philosophy|stoic|stoicism|plato|aristotle|nietzsche/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Philosophy Books"
      description="Philosophy asks the questions that every other discipline tries to avoid. These are the best-rated philosophy books, from Plato's dialogues to Nietzsche's provocations, ranked by readers who found them genuinely thought-changing."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Philosophy Books"
      categoryPage="/category/philosophy"
      categoryLabel="philosophy"
      canonical="https://www.skriuwer.com/best-philosophy-books"
    />
  );
}
