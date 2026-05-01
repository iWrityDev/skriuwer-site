import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Self-Help Books in 2026, Ranked by Reader Reviews",
  description:
    "The best self-help books ranked by reader reviews. From building better habits to unlocking your mindset, these top picks have helped millions of people improve their lives.",
  alternates: { canonical: "https://www.skriuwer.com/best-self-help-books" },
  openGraph: {
    title: "Best Self-Help Books in 2026, Ranked by Reader Reviews",
    description: "The best self-help books ranked by reader reviews. From building better habits to unlocking your mindset, these top picks have helped millions of people improve their lives.",
    url: "https://www.skriuwer.com/best-self-help-books",
    type: "website",
  },
};

const INTRO = [
  "Self-help is a category that attracts as much derision as devotion, and often for the same reason: the worst books in it promise transformation with no work attached. The best books in it do something genuinely useful, they surface assumptions you did not know you were making, give you a framework for understanding patterns you could not previously name, or walk you through mechanics that actually change behavior rather than just inspiring you to try harder.",
  "This list focuses on the second kind. Every title here has been read by hundreds of thousands of people and has maintained high ratings over years, not just at launch. Sustained reader satisfaction across diverse audiences and life situations is a meaningful signal. A book that changes the thinking of a 22-year-old student and a 55-year-old executive is doing something real.",
  "The category includes habit formation (Atomic Habits, The Power of Habit), productivity and time management (Deep Work, Getting Things Done), interpersonal skills and relationships (How to Win Friends and Influence People, The 7 Habits of Highly Effective People), and the psychological foundations of behavior (Thinking Fast and Slow, The Body Keeps the Score). We included titles from adjacent categories (psychology, philosophy) where they are regularly read as self-improvement rather than academic texts.",
  "If you are not sure which area to focus on, the FAQ below gives specific recommendations based on what you are trying to change. If you already know what you need, scroll to the list.",
];

const FAQ = [
  {
    q: "What is the single most useful self-help book ever written?",
    a: "How to Win Friends and Influence People by Dale Carnegie has been continuously in print since 1936 and has sold over 30 million copies. That longevity is earned: its core insights about listening, genuinely caring about other people's interests, and making others feel valued are as applicable in a Zoom call as in a 1930s business meeting. For modern readers who find Carnegie's tone dated, Never Split the Difference by Chris Voss covers similar interpersonal dynamics with more recent framing.",
  },
  {
    q: "What is the best self-help book for building better habits?",
    a: "Atomic Habits by James Clear is the most practically useful book on habit formation published in the last decade. Its central insight is that habit change works most reliably when you change your identity (who you believe yourself to be) rather than just setting outcome goals. The book gives specific mechanics: habit stacking, environment design, the two-minute rule. For the science behind those mechanics, The Power of Habit by Charles Duhigg covers the neurological and psychological research in a more narrative format.",
  },
  {
    q: "What is the best self-help book for productivity?",
    a: "Deep Work by Cal Newport makes the case that the ability to focus without distraction on cognitively demanding tasks is increasingly rare and increasingly valuable. It is the best modern book on why shallow, reactive work crowds out meaningful work and what to do about it. Getting Things Done by David Allen is the classic system for managing tasks and commitments without keeping everything in your head. Both books are useful at different scales: Newport covers the strategy, Allen covers the operational mechanics.",
  },
  {
    q: "Are there self-help books that are actually grounded in scientific research?",
    a: "Thinking, Fast and Slow by Daniel Kahneman is the most scientifically grounded book in the self-help adjacent space: Kahneman is a Nobel laureate in economics and the book summarizes decades of research on cognitive bias. Stumbling on Happiness by Daniel Gilbert uses happiness research to explain why humans are systematically wrong about what will make them happy. Influence by Robert Cialdini summarizes decades of social psychology research on persuasion. All three are written for general readers but cite primary research.",
  },
  {
    q: "What self-help books are most useful for managing anxiety and stress?",
    a: "The Anxiety and Worry Workbook by Clark and Beck is the most clinically grounded cognitive behavioral therapy resource available without a therapist. For a more narrative approach, First, We Make the Beast Beautiful by Sarah Wilson uses the author's experience with chronic anxiety to map the territory. Wherever You Go, There You Are by Jon Kabat-Zinn is the most accessible introduction to mindfulness practice as a practical anxiety management tool, written by the researcher who brought mindfulness into mainstream clinical psychology.",
  },
  {
    q: "How do I avoid wasting money on self-help books that do not deliver?",
    a: "Three filters help. First, look for books with high review counts (above 10,000) and a rating above 4.2 over several years, not just at launch. Second, check whether the author's core argument can be summarized in a sentence or two: books with a clear, testable thesis tend to deliver more than books that are primarily about feeling inspired. Third, read the one-star reviews before buying, they often identify exactly what the book overpromises or where its advice breaks down in practice.",
  },
];

export default function BestSelfHelpBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("self-help"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Self-Help Books"
      description="The right self-help book at the right time can genuinely change how you think, work, and live. These are the top-rated self-help books ranked by reader popularity, covering habits, mindset, productivity, and personal growth."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Self-Help Books"
      categoryPage="/category/self-help"
      categoryLabel="self-help"
      canonical="https://www.skriuwer.com/best-self-help-books"
    />
  );
}
