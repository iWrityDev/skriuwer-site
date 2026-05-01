import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Mindset Books in 2026, Ranked by Reader Reviews",
  description: "The best books on mindset, growth, and mental strength, ranked by reader reviews. These titles will rewire how you think and push you forward.",
  alternates: { canonical: "https://www.skriuwer.com/best-mindset-books" },
  openGraph: {
    title: "Best Mindset Books in 2026, Ranked by Reader Reviews",
    description: "The best books on mindset, growth, and mental strength, ranked by reader reviews. These titles will rewire how you think and push you forward.",
    url: "https://www.skriuwer.com/best-mindset-books",
    type: "website",
  },
};

const INTRO = [
  "Mindset is not a personality trait you either have or lack. It is a collection of assumptions about yourself and the world that you can identify, examine, and change. The books on this list do exactly that: they surface assumptions you probably did not know you were making and offer frameworks for replacing the ones that are holding you back. That process is uncomfortable and sometimes slow, but the readers who credit these books with genuine life change are describing something real.",
  "Carol Dweck's research on fixed versus growth mindset is the scientific anchor for much of this category. Her finding, that people who believe abilities can be developed outperform people who believe they are fixed, has been replicated across education, sports, and business. But the list goes further than Dweck: it includes books on cognitive bias (why you think you are thinking clearly when you are not), resilience (how to recover from failure rather than be defined by it), and metacognition (how to think about your own thinking).",
  "Some of these books are grounded in academic psychology (Thinking, Fast and Slow by Kahneman, Mindset by Dweck). Others draw more from philosophy and personal experience (Man's Search for Meaning by Frankl, The Obstacle Is the Way by Ryan Holiday). Both traditions offer something. The psychology books tell you what the evidence shows. The philosophy books show you what the evidence looks like when someone lives it.",
  "The FAQ below addresses common questions about which mindset books actually produce change rather than just feeling inspirational in the moment. If you already know what you want to work on, scroll to the ranked list.",
];

const FAQ = [
  {
    q: "What is the best mindset book for someone who wants to change but keeps failing?",
    a: "Atomic Habits by James Clear is the most practically useful book for people who have tried to change behavior repeatedly without success. Clear's core argument is that outcomes are a lagging measure of habits and habits are a lagging measure of identity: you do not rise to the level of your goals, you fall to the level of your systems. The book gives specific mechanics for building new habits and breaking old ones, not just motivation to try harder.",
  },
  {
    q: "Is Carol Dweck's Mindset book actually worth reading?",
    a: "Yes. Mindset by Carol Dweck is a genuinely important book rather than just an influential one. The research backing it is strong, the examples (athletes, students, managers, couples) are concrete enough to apply to your own situation, and the writing is clear enough to finish quickly. The one caveat: the later chapters on parenting and teaching feel less original than the first half, which is where the core argument is made. Read the first half carefully, skim the later application chapters.",
  },
  {
    q: "What is the best book about overcoming fear and mental resistance?",
    a: "The War of Art by Steven Pressfield is a short, blunt book about the force (he calls it Resistance) that prevents creative and personal work from happening. It is written for artists and writers but applies to anyone trying to do meaningful, self-directed work. For a more psychologically grounded account of fear and avoidance, Susan Jeffers's Feel the Fear and Do It Anyway, though older (1987), remains one of the most honest books about what fear actually is and how to move through it.",
  },
  {
    q: "What is the best book on resilience after serious setbacks?",
    a: "Man's Search for Meaning by Viktor Frankl is the most powerful book on resilience ever written. Frankl was a psychiatrist who survived Auschwitz and wrote about how meaning, not just survival instinct, determined who endured. The book is under 200 pages. Option B by Sheryl Sandberg (written after her husband's sudden death) is the most accessible modern book on grief and resilience specifically, with practical steps alongside the memoir sections.",
  },
  {
    q: "Do mindset books actually create lasting change or just a temporary high?",
    a: "They create lasting change when they change the frames through which you interpret events, not when they just add motivation. The books that produce the most durable change are the ones that give you a new explanatory framework (Dweck's fixed vs. growth, Frankl's meaning vs. survival, Clear's identity-based habits) that you find yourself applying involuntarily in new situations months after finishing the book. Books that primarily deliver inspiration without framework tend to fade within weeks.",
  },
  {
    q: "What is the difference between mindset books and self-help books?",
    a: "Mindset books focus on how you think, specifically on the underlying assumptions and cognitive patterns that determine behavior. Self-help books are a broader category that includes productivity systems, relationship advice, career guidance, and health habits. There is significant overlap: many self-help books include mindset chapters, and mindset books often have practical application sections. The distinction matters most when you are choosing what you need: if you want to change a specific behavior, look for habit or systems books. If you want to understand why you keep undermining yourself, look for mindset books specifically.",
  },
];

export default function BestMindsetBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("self-help") || b.categories.includes("psychology"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Mindset Books in 2026"
      description="Your mindset determines almost everything, your success, your happiness, your resilience. These are the best books on mindset and mental strength available today, ranked by the readers who credit them with genuine life change. From Carol Dweck's growth mindset to the Stoic philosophers, these titles will rewire how you think about challenges, failure, and success."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Mindset Books"
      categoryPage="/category/self-help"
      categoryLabel="self-help"
      canonical="https://www.skriuwer.com/best-mindset-books"
    />
  );
}
