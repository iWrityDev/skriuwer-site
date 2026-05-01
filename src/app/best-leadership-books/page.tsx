import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Leadership Books in 2026, Ranked by Reader Reviews",
  description: "The best leadership books of all time, ranked by reader reviews. Whether you lead a team or a country, these books will transform how you think about leadership.",
  alternates: { canonical: "https://www.skriuwer.com/best-leadership-books" },
  openGraph: {
    title: "Best Leadership Books in 2026, Ranked by Reader Reviews",
    description: "The best leadership books of all time, ranked by reader reviews. Whether you lead a team or a country, these books will transform how you think about leadership.",
    url: "https://www.skriuwer.com/best-leadership-books",
    type: "website",
  },
};

const INTRO = [
  "Leadership books occupy a strange space in publishing: there are thousands of them, most say roughly the same things, and yet the handful that actually change how people behave get recommended obsessively for decades. The gap between the two categories is enormous. This list focuses on the second category, books that working leaders at every level of seniority still cite when explaining how they think about decisions, teams, and influence.",
  "The best leadership writing tends to come from people who led something first and wrote about it second, not management consultants who theorized about leadership without holding it. Jocko Willink led SEAL Team Three in Ramadi. Andy Grove ran Intel through multiple existential crises. Ben Horowitz built and sold Opsware, then funded the next generation of founders. That experience shows in the specificity of their advice.",
  "The list spans several distinct schools of leadership thinking. Military-derived frameworks (Extreme Ownership, The Art of War) focus on clarity of command and accountability. Psychology-derived frameworks (Dare to Lead, Leaders Eat Last) focus on trust, vulnerability, and organizational culture. Systems-thinking frameworks (The Fifth Discipline, Thinking in Systems) focus on how to see the organization as a whole rather than as a collection of individual decisions.",
  "If you are managing people for the first time, the FAQ below recommends where to start based on your situation. If you are already experienced and want to go deeper, scroll to the list and look at the titles with the highest review counts, they have been tested by the widest range of leadership situations.",
];

const FAQ = [
  {
    q: "What is the best leadership book for a first-time manager?",
    a: "The Making of a Manager by Julie Zhuo is the most direct and practical leadership book for someone who just got their first management role. Zhuo became a manager at Facebook at 25 and the book is honest about what she got wrong before she got it right. It covers the core mechanics: giving feedback, running one-on-ones, hiring, setting direction, and identifying whether your team trusts you. It is under 300 pages and extremely readable.",
  },
  {
    q: "What leadership books do military leaders and executives both recommend?",
    a: "Extreme Ownership by Jocko Willink and Leif Babin is the book that crosses military and corporate leadership most cleanly. Its central argument (that effective leaders take complete ownership of outcomes rather than blaming circumstances) is equally applicable in a SEAL platoon and a product team. The Dichotomy of Leadership, their follow-up, covers the nuance that Extreme Ownership simplifies: when to follow, when to push back, when to hold back.",
  },
  {
    q: "What is the best book on organizational culture?",
    a: "Leaders Eat Last by Simon Sinek argues that great organizations create circles of safety, environments where people feel protected enough to take risks and be honest. It is more narrative than prescriptive, which some readers find frustrating and others find compelling. For a more tactical view of culture, The Culture Code by Daniel Coyle studies specific high-performing groups (Navy SEAL teams, Pixar, the San Antonio Spurs) and identifies the specific behaviors that create psychological safety.",
  },
  {
    q: "Is The 48 Laws of Power worth reading?",
    a: "It depends on how you read it. Robert Greene's book is a catalog of manipulation and power-seeking tactics drawn from historical examples. It is not a leadership book in the constructive sense, it is a survival guide for navigating political environments where others are using those tactics against you. Most ethical leaders find it more useful as a warning about what bad actors do than as a playbook for their own behavior. Read it knowing what it is.",
  },
  {
    q: "What leadership books are most useful for senior executives and founders?",
    a: "High Output Management by Andy Grove is the most cited book among experienced leaders at senior levels. It covers how to think about leverage (doing things that multiply the output of your entire organization), what makes meetings useful, and how to evaluate people systematically. Ben Horowitz's The Hard Thing About Hard Things is more narrative and specifically aimed at founders facing the decisions no leadership framework fully prepares you for: layoffs, pivots, replacing yourself.",
  },
  {
    q: "How do leadership books compare to actually learning by doing?",
    a: "Books are more useful for mental models than for reflexes. The reflexes only come from experience. What books do well is give you frameworks for interpreting your experience after it happens (why did that decision fail, what should I have done differently) and for anticipating situations before they arrive (here is what usually happens when you skip one-on-ones for three months). The leaders who get the most from leadership books are the ones reading actively while managing, not the ones reading before they start.",
  },
];

export default function BestLeadershipBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("business"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Leadership Books in 2026"
      description="Great leaders aren't born, they're made by the books they read and the lessons they apply. These are the best leadership books available today, from timeless classics to modern masterworks, ranked by the readers who swear by them. Whether you're managing a small team or leading an organization, these titles will sharpen your vision and strengthen your impact."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Leadership Books"
      categoryPage="/category/business"
      categoryLabel="business"
      canonical="https://www.skriuwer.com/best-leadership-books"
    />
  );
}
