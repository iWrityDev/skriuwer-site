import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Psychology Books in 2026 — Understanding the Human Mind",
  description:
    "The best psychology books ranked by reader reviews. How the mind works, why people behave the way they do, and what science reveals about human nature. Editor-reviewed picks.",
  alternates: { canonical: "https://skriuwer.com/best-psychology-books" },
};

const INTRO = [
  "Most of what you think you know about yourself is wrong. Not maliciously wrong — just systematically, predictably wrong in the specific ways that psychologists have been documenting for decades. Our memories are unreliable. Our decisions are driven by factors we're not aware of. Our sense of our own motivations is largely a story we tell ourselves after the fact. The good news: once you know this, you can start to work with your mind rather than against it.",
  "The psychology books on this list span cognitive science, social psychology, behavioral economics, and clinical psychology. Some are rigorous academic writing made accessible for general readers; others are narrative-driven explorations of specific phenomena. All of them will change how you see yourself, other people, and the social structures you're embedded in.",
];

const FAQ = [
  {
    q: "What psychology books are best for non-psychologists?",
    a: "Books with high reader review counts and ratings above 4.4 stars are reliably accessible to non-specialists. Look for titles that promise to explain concepts 'in plain English' or describe themselves as written for a 'general audience.' The most popular psychology books on this list have all sold hundreds of thousands of copies to ordinary readers, not just professionals.",
  },
  {
    q: "Do I need any background knowledge to enjoy psychology books?",
    a: "No. All the books on this list are written for curious non-specialists. They assume no prior knowledge of psychology, neuroscience, or statistics. They do assume you're interested in understanding human behavior — which, since you're here, you presumably are.",
  },
  {
    q: "What's the difference between self-help and psychology books?",
    a: "Psychology books explain how and why the mind works, drawing on research and evidence. Self-help books focus on what you should do differently to improve your life. The distinction blurs — many psychology books have practical implications, and many self-help books draw on psychology research. On this list, we've prioritized books that are primarily explanatory (psychology) over prescriptive (self-help), though some of the best books do both.",
  },
  {
    q: "Are psychology books based on real research, or are they just opinions?",
    a: "The books on this list are all grounded in peer-reviewed research, not personal opinion. The authors are typically researchers, clinicians, or science journalists with access to the primary literature. That said, the popular press sometimes oversimplifies findings from individual studies — a good sign is when a book cites multiple studies and acknowledges limitations.",
  },
];

export default function BestPsychologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("psychology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Psychology Books in 2026"
      description="How the mind works, why people behave the way they do, and what decades of research reveal about human nature. These are the best psychology books available today, ranked by readers."
      books={books}
      breadcrumb="Best Psychology Books"
      categoryPage="/category/psychology"
      categoryLabel="psychology"
      canonical="https://skriuwer.com/best-psychology-books"
      reviewer="Jennifer Joseph & the Skriuwer Team"
      updatedDate="April 2026"
      intro={INTRO}
      faq={FAQ}
      showComparison
    />
  );
}
