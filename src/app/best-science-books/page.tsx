import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Popular Science Books in 2026, Ranked by Reader Reviews",
  description:
    "The best popular science books ranked by reader reviews. Discover groundbreaking ideas in physics, biology, cosmology, and the natural world, written to captivate every reader.",
  alternates: { canonical: "https://www.skriuwer.com/best-science-books" },
  openGraph: {
    title: "Best Popular Science Books in 2026, Ranked by Reader Reviews",
    description: "The best popular science books ranked by reader reviews. Discover groundbreaking ideas in physics, biology, cosmology, and the natural world, written to captivate every reader.",
    url: "https://www.skriuwer.com/best-science-books",
    type: "website",
  },
};

const INTRO = [
  "Popular science books solve a problem that science itself does not. Academic papers are written by specialists for specialists: dense, hedged, and inaccessible unless you already have the background to read them. Popular science books take ideas that changed how scientists understand the world and translate them into prose that anyone can follow. The best ones do this without dumbing down the ideas, which is a harder task than it looks.",
  "This list covers the full range of popular science: physics (from quantum mechanics to cosmology), biology (evolution, genetics, neuroscience, ecology), mathematics (number theory, probability, complexity), and the history and philosophy of science (how scientific revolutions happen, why scientists are often wrong before they are right). We ranked by reader reviews because sustained reader satisfaction is a better signal than critical acclaim for deciding what to actually pick up.",
  "A note on what makes a good popular science book different from a bad one: the best ones stay honest about what we do not know. They distinguish between what has been established by multiple independent lines of evidence and what is a working hypothesis. The worst ones overclaim certainty to make the narrative cleaner. When you read a science book that says 'scientists have discovered that...' with no caveats, that is a warning sign.",
  "The FAQ below covers the most common questions about which books to start with by field and how to evaluate popular science claims. The ranked list is below.",
];

const FAQ = [
  {
    q: "What is the best popular science book for someone with no scientific background?",
    a: "A Short History of Nearly Everything by Bill Bryson is the most widely recommended starting point for people who want to understand how science works across multiple fields. Bryson covers physics, chemistry, biology, and geology by following the stories of the scientists who made each discovery, which makes the ideas feel human and contextual rather than abstract. It has been in print for over 20 years and consistently earns strong reviews from readers who describe themselves as non-scientific.",
  },
  {
    q: "What are the best books about evolution and biology?",
    a: "The Selfish Gene by Richard Dawkins (1976) is still the clearest explanation of gene-centered natural selection ever written for a general audience. Dawkins introduced the concept of the meme in this book. For a more recent account covering modern genetics and genomics, The Gene by Siddhartha Mukherjee (2016) is comprehensive and beautifully written. For ecology and conservation, The Sixth Extinction by Elizabeth Kolbert won the Pulitzer Prize and explains the ongoing mass extinction through field reporting across five continents.",
  },
  {
    q: "What are the best books about physics for non-physicists?",
    a: "Seven Brief Lessons on Physics by Carlo Rovelli is 79 pages and covers general relativity, quantum mechanics, the structure of space, and the nature of time in prose that reads like philosophy. For more depth, The Elegant Universe by Brian Greene covers string theory and the effort to unify physics. On the history side, The Making of the Atomic Bomb by Richard Rhodes is the most complete account of the Manhattan Project and the physics behind it, and it won the Pulitzer.",
  },
  {
    q: "What is the best book about the human brain?",
    a: "The Brain That Changes Itself by Norman Doidge covers neuroplasticity (the brain's ability to reorganize itself throughout life) through case studies of patients and researchers. It is accessible and the case studies are gripping. For a broader neuroscience overview, Incognito by David Eagleman argues that most of our decision-making happens below conscious awareness. For the connection between brain science and mental health, The Body Keeps the Score by Bessel van der Kolk has the highest review count in this category.",
  },
  {
    q: "What are the best science books about how science works (not what science has found)?",
    a: "The Structure of Scientific Revolutions by Thomas Kuhn (1962) is the most influential philosophy of science book ever written. It introduced the concept of the paradigm shift and changed how scientists think about their own fields. For a more recent and more readable account, The Science Delusion by Rupert Sheldrake is controversial but raises legitimate questions about how scientific assumptions calcify into dogma. For understanding how statistics are misused in science, How to Lie with Statistics by Darrell Huff is still the clearest short guide.",
  },
  {
    q: "Is there a science book that covers mathematics without requiring a math background?",
    a: "The Man Who Loved Only Numbers by Paul Hoffman (about the mathematician Paul Erdos) requires no mathematical background and is primarily a character study of obsessive mathematical genius. For actual mathematical ideas in accessible prose, Fermat's Last Theorem by Simon Singh tells the 350-year story of a single unsolved equation through the lives of the mathematicians who worked on it. Both books demonstrate that mathematical thinking can be gripping subject matter without requiring the reader to do any calculations.",
  },
];

export default function BestScienceBooksPage() {
  const books = getAllBooks()
    .filter((b) => b.categories.includes("science"))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Popular Science Books"
      description="The best science books make the complexity of the universe feel accessible, even thrilling. These are the top-rated popular science titles, ranked by readers who came away with their minds genuinely expanded."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best Popular Science Books"
      categoryPage="/category/science"
      categoryLabel="science & nature"
      canonical="https://www.skriuwer.com/best-science-books"
    />
  );
}
