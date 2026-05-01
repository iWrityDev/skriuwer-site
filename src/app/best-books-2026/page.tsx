import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Books of 2026, Ranked by Reader Reviews",
  description:
    "The best books of 2026 ranked by reader reviews. The most popular and highly rated titles across all genres, history, mythology, self-help, fiction, and more.",
  alternates: { canonical: "https://www.skriuwer.com/best-books-2026" },
  openGraph: {
    title: "Best Books of 2026, Ranked by Reader Reviews",
    description: "The best books of 2026 ranked by reader reviews. The most popular and highly rated titles across all genres, history, mythology, self-help, fiction, and more.",
    url: "https://www.skriuwer.com/best-books-2026",
    type: "website",
  },
};

const INTRO = [
  "Every year produces thousands of books. Most disappear within months. The ones that stay in print for years, get passed between friends, and accumulate thousands of reviews are a different category entirely. This list collects the titles that readers cannot stop recommending in 2026, books with the kind of staying power that comes from genuinely delivering on what they promise.",
  "We ranked this list by review count rather than average rating alone. A book with 50,000 reviews at 4.4 stars tells you something different from a book with 200 reviews at 4.8 stars. The first has been tested by tens of thousands of strangers with different expectations, different reading backgrounds, and different reasons for picking it up. That kind of consensus is harder to earn and more useful to trust.",
  "The list spans multiple genres: history, mythology, fiction, true crime, philosophy, self-help, and science. If you are looking for a specific category, use the category pages linked throughout the site. If you want to know what the most widely read people are currently finishing, this is that list.",
  "The FAQ below answers some of the most common questions we get about book recommendations in 2026, including how to pick your next read when you are overwhelmed by options and which format (print, ebook, audiobook) actually gets books finished.",
];

const FAQ = [
  {
    q: "How is this list different from bestseller lists like the New York Times list?",
    a: "Bestseller lists measure weekly sales velocity, which means heavily marketed new releases and celebrity books dominate. This list measures long-term reader satisfaction across thousands of verified reviews. A book that sold 500,000 copies but disappointed readers will not appear here. A book that sold 100,000 copies and has a 4.6-star average from 80,000 reviews will. Those are two very different signals.",
  },
  {
    q: "What is the most-read book in 2026 across all genres?",
    a: "Books with the highest combined review counts in 2026 tend to be narrative nonfiction titles that blend storytelling with ideas: popular psychology, true crime, and accessible history. Atomic Habits by James Clear, The Body Keeps the Score by Bessel van der Kolk, and Sapiens by Yuval Noah Harari consistently rank at the top across platforms because they appeal to wide audiences and generate word-of-mouth recommendations rather than just marketing-driven sales.",
  },
  {
    q: "How do I pick my next book when I am overwhelmed by choices?",
    a: "Use the two-chapter test. Read the first two chapters of any book before committing. If you are not drawn in by the end of chapter two, the book is not for you right now. Matching format to your lifestyle also matters: commuters and walkers finish more books with audiobooks, late-night readers finish more with ebooks (backlit, no bedside light needed), and people who annotate finish more with print. A book you finish in the wrong format is worth more than a book you never start in the right one.",
  },
  {
    q: "Are there any underrated books that do not make typical lists?",
    a: "Consistently underrated in bestseller coverage but strong in long-term reader reviews: The Coddling of the American Mind by Greg Lukianoff and Jonathan Haidt, When by Daniel Pink (the science of timing), and anything by John Man on Mongolian and Central Asian history. These books do not fit clean genre categories so they get missed by algorithmic recommendations, but they have legions of devoted readers.",
  },
  {
    q: "Print, ebook, or audiobook: which format gets books actually finished?",
    a: "Studies on reading completion consistently find that audiobooks have the highest completion rate for nonfiction, because listeners slot them into activities like commuting, cooking, and exercise. For fiction, ebooks and print are roughly equal in completion, but print readers report higher retention. The honest answer is that the best format is whichever one you will actually use. If you have not been finishing books, try switching format before blaming the book.",
  },
  {
    q: "What is a good book to give as a gift in 2026?",
    a: "Think about what the recipient actually reads, not what you think they should read. The most-gifted books that also get read (rather than shelved) tend to be narrative nonfiction with broad appeal: history that reads like a thriller, biography that illuminates something about the present, or science that does not assume a technical background. Avoid gifting anything in a series unless the recipient has already started it, and avoid gifting self-improvement books unless the person has explicitly asked for them.",
  },
];

export default function BestBooks2026Page() {
  const books = getAllBooks()
    .filter((b) => b.reviewCount > 100)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Books of 2026"
      description="These are the books readers can't stop talking about in 2026, titles with hundreds of reviews and ratings that prove they deliver. Whether you love history, mythology, fiction, or personal development, this list has something worth reading next."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Books of 2026"
      categoryPage="/bestsellers"
      categoryLabel="bestseller"
      canonical="https://www.skriuwer.com/best-books-2026"
    />
  );
}
