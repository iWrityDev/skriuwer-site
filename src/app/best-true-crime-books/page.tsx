import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import type { Book } from "@/lib/types";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best True Crime Books in 2026, Ranked by Reader Reviews",
  description:
    "The best true crime books ranked by reader reviews. From serial killers to unsolved heists and shocking cults, these gripping accounts of real events will keep you up at night.",
  alternates: { canonical: "https://www.skriuwer.com/best-true-crime-books" },
  openGraph: {
    title: "Best True Crime Books in 2026, Ranked by Reader Reviews",
    description: "The best true crime books ranked by reader reviews. From serial killers to unsolved heists and shocking cults, these gripping accounts of real events will keep you up at night.",
    url: "https://www.skriuwer.com/best-true-crime-books",
    type: "website",
  },
};

const INTRO = [
  "True crime works because real events carry a weight that fiction cannot fully replicate. When you learn that the person in the book actually existed, that the crimes actually happened, that the investigators and victims were real human beings with families, the reading experience changes. The best true crime books use that weight responsibly: they take the events seriously rather than turning them into entertainment, and they use the crimes as a lens for understanding something larger about human behavior, institutions, and society.",
  "This list covers serial killers, heists, cults, financial fraud, unsolved cases, and wrongful convictions. The range of the genre is wider than the television version of true crime suggests. Some of the best books in the category (Midnight in the Garden of Good and Evil, The Devil in the White City) sit as comfortably on literary nonfiction lists as on true crime lists, because the writing is as strong as the subject matter.",
  "A word on selection: we included books that handle their subjects ethically as well as compellingly. True crime has a documented problem with glorifying perpetrators at the expense of victims, particularly in serial killer coverage. The books on this list either focus on the investigative process, the institutional failures that allowed crimes to happen, or the victims themselves, not just the perpetrator's psychology. That is both an ethical and a quality distinction.",
  "The FAQ below addresses common questions about the best entry points, the ethics of the genre, and specific recommendations by subtype. The ranked list follows.",
];

const FAQ = [
  {
    q: "What is the best true crime book for someone new to the genre?",
    a: "In Cold Blood by Truman Capote is the book that established literary true crime as a genre in 1966 and it remains the best single introduction: the 1959 murders of the Clutter family in rural Kansas, investigated through months of reporting, written with the narrative techniques of a novel. If you want something more contemporary, I'll Be Gone in the Dark by Michelle McNamara (about the Golden State Killer) is the most celebrated recent entry and was published posthumously, which adds an additional layer of genuine tragedy to the reading.",
  },
  {
    q: "What are the best books about serial killers?",
    a: "Mindhunter by John Douglas is the memoir of the FBI agent who pioneered criminal profiling in the 1970s and 1980s, interviewing imprisoned serial killers to build behavioral models. It is essential reading for understanding how law enforcement approaches this category of crime. The Devil in the White City by Erik Larson covers H.H. Holmes (often called America's first serial killer) alongside the 1893 Chicago World's Fair, using dual narrative to explore how modernity and mass murder coincided. Both books are more interested in understanding than in sensationalism.",
  },
  {
    q: "What are the best true crime books about financial crimes and fraud?",
    a: "Bad Blood by John Carreyrou is the definitive account of Elizabeth Holmes and Theranos, the most celebrated corporate fraud of the last 20 years. Carreyrou broke the original story for the Wall Street Journal and the book is meticulously reported. The Smartest Guys in the Room by Bethany McLean and Peter Elkind covers the Enron collapse with similar rigor. For a smaller-scale but more personal fraud story, Catch Me If You Can by Frank Abagnale is the memoir (heavily questioned for accuracy) of a check forger who conned his way across the world in the 1960s.",
  },
  {
    q: "What are the best true crime books about cults?",
    a: "Educated by Tara Westover is not strictly a cult book but covers the psychological control of a fundamentalist survivalist family with the same mechanisms. For cults proper, The Road to Jonestown by Jeff Guinn traces Jim Jones from his Indiana childhood through the Peoples Temple to the Jonestown massacre in 1978. Cultish by Amanda Montell is a more recent analytical account of how cult language works across groups from NXIVM to CrossFit, broader in scope and more useful for understanding the psychology.",
  },
  {
    q: "Are there true crime books focused on wrongful convictions?",
    a: "Just Mercy by Bryan Stevenson is the most important book in this subcategory: Stevenson founded the Equal Justice Initiative and the book covers his legal work defending people on death row, many wrongfully convicted. It is as much about the American criminal justice system as about specific cases. The Innocent Man by John Grisham (Grisham's only nonfiction book) covers a wrongful conviction in a small Oklahoma town with the same clear narrative skills he brings to fiction.",
  },
  {
    q: "What makes a true crime book ethical rather than exploitative?",
    a: "The best true crime books make victims specific and human rather than abstract. They name the people who were harmed, describe their lives before the crime, and treat their deaths as the primary tragedy rather than as backstory to the perpetrator's drama. They also examine institutional failure honestly: why did police miss evidence, how did a predator operate in plain sight, what social conditions allowed the crime to happen repeatedly. Books that humanize victims and interrogate systems are doing journalism. Books that primarily dramatize the perpetrator's mindset are doing something closer to entertainment.",
  },
];

export default function BestTrueCrimeBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return (
        b.categories.includes("true-crime") ||
        /true crime|serial killer|murder|criminal/.test(text)
      );
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best True Crime Books"
      description="True crime books turn real-world horror into compulsive reading, the kind you finish in a single sitting. These are the most gripping accounts of murders, heists, cults, and criminal masterminds, ranked by readers who couldn't put them down."
      books={books}
      intro={INTRO}
      faq={FAQ}
      showComparison
      breadcrumb="Best True Crime Books"
      categoryPage="/category/true-crime"
      categoryLabel="true crime"
      canonical="https://www.skriuwer.com/best-true-crime-books"
    />
  );
}
