import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Business Books in 2026, Ranked by Reader Reviews",
  description:
    "The best business books ranked by reader reviews. Whether you want to start a company, invest smarter, or lead better, these are the titles serious professionals recommend.",
  alternates: { canonical: "https://www.skriuwer.com/best-business-books" },
  openGraph: {
    title: "Best Business Books in 2026, Ranked by Reader Reviews",
    description: "The best business books ranked by reader reviews. Whether you want to start a company, invest smarter, or lead better, these are the titles serious professionals recommend.",
    url: "https://www.skriuwer.com/best-business-books",
    type: "website",
  },
};

const INTRO = [
  "The best business books do not teach you what to do. They change how you think about markets, people, decisions, and risk, so that when you face a situation the book never anticipated, you already have the mental framework to handle it. That distinction separates the books that get passed between founders and executives for decades from the ones that get bought in an airport and abandoned by page 60.",
  "This list covers entrepreneurship, investing, strategy, management, and organizational behavior. We ranked everything by reader reviews rather than business-press acclaim, because the books that survive in professional circles over years are the ones that actually deliver practical insight rather than just providing a framework with a good diagram. If it has 50,000 reviews and a 4.5 average, a lot of people with a lot of different problems found it useful.",
  "A few categories worth noting: investing books cluster around two schools of thought (value investing in the Buffett tradition, and behavioral economics in the Kahneman tradition). Leadership books split between the military-influenced (extreme ownership, servant leadership) and the psychological (motivation, persuasion, systems thinking). We included both because different situations call for different approaches.",
  "If you are not sure what area to focus on, the FAQ below gives specific starting recommendations by role and career stage. If you already know what you need, scroll straight to the list.",
];

const FAQ = [
  {
    q: "What is the best business book for someone starting their first company?",
    a: "The Lean Startup by Eric Ries is the most widely cited practical guide to building a business when you do not yet know what your customers want. It introduced the build-measure-learn cycle that now underpins most startup methodology. For the psychology of entrepreneurship, The E-Myth Revisited by Michael Gerber is shorter and more pointed: most businesses fail because founders mistake being good at a skill for knowing how to run a business that delivers that skill.",
  },
  {
    q: "What are the best investing books for beginners?",
    a: "The Little Book of Common Sense Investing by John Bogle makes the case for index funds clearly and concisely: most active investors underperform the market over time, fees compound against you, and simplicity beats complexity. For the psychology side of investing (why smart people make bad financial decisions), The Psychology of Money by Morgan Housel is the most readable recent entry. Read Bogle first for mechanics, then Housel to understand why you might not follow them.",
  },
  {
    q: "What business books do successful founders actually recommend?",
    a: "Zero to One by Peter Thiel (on building monopolies rather than competing in markets) and High Output Management by Andy Grove (Intel's operating philosophy for managers) are the two most-cited books among successful founders in technology. Both are short and dense. For a longer, more narrative approach, The Innovator's Dilemma by Clayton Christensen explains why great companies get disrupted, which is essential reading if you are trying to disrupt an industry or trying not to be disrupted.",
  },
  {
    q: "What are the best books on negotiation and persuasion?",
    a: "Never Split the Difference by Chris Voss (an FBI hostage negotiator) is the most practically applicable negotiation book published in the last decade. Influence by Robert Cialdini, now 40 years old, remains the canonical text on persuasion and why people say yes. Pre-Suasion, Cialdini's 2016 follow-up, covers the setup phase before the ask. If you read only one of these, Influence is the one that shows up in most business-school reading lists.",
  },
  {
    q: "What are the best books on management and organizational leadership?",
    a: "An Elegant Puzzle by Will Larson is the most practically useful management book for anyone managing knowledge workers, especially in technology companies. Measure What Matters by John Doerr covers OKRs (the goal-setting system used at Google and Intel) with case studies. For the classic view of organizational behavior, Good to Great by Jim Collins, though its research methodology has been criticised, still generates useful frameworks for thinking about why some companies outperform their industries.",
  },
  {
    q: "Is there a business book that explains economic and market thinking broadly?",
    a: "Basic Economics by Thomas Sowell is the clearest plain-English explanation of how markets work, why prices matter, and what trade-offs governments face when they intervene. It is 700 pages but organized so you can read it non-linearly by chapter. For a more behavioral approach, Thinking, Fast and Slow by Daniel Kahneman is not strictly a business book but it explains the cognitive biases that drive most bad business decisions, which makes it more useful than most books explicitly labelled as business strategy.",
  },
];

export default function BestBusinessBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("business") ||
        /business|investing|entrepreneur|leadership|finance/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Business Books"
      description="The best business books don't just teach tactics, they change how you see markets, money, and people. These are the top-rated titles on entrepreneurship, investing, leadership, and finance, ranked by the readers who applied them."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Business Books"
      categoryPage="/category/business"
      categoryLabel="business & finance"
      canonical="https://www.skriuwer.com/best-business-books"
    />
  );
}
