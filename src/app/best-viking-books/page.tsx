import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Viking Books in 2026, Ranked by Reader Reviews",
  description:
    "The 15 best Viking books in 2026, ranked by Amazon reviews. Covers Viking history (Neil Price, John Haywood), sagas (Njal, Egil, Volsungs), and the best-rated Viking historical fiction and archaeological deep-dives.",
  alternates: { canonical: "https://www.skriuwer.com/best-viking-books" },
};

const INTRO_PARAGRAPHS = [
  "Vikings did not wear horned helmets, and the image of Viking as one-dimensional raider is almost entirely a 19th-century invention. The real Norse world was a 300-year economic and cultural expansion that reached Baghdad, Newfoundland, North Africa, and Byzantium, and the books below reflect that scope. The best Viking writing today is the writing that takes the Vikings seriously as traders, farmers, poets, and lawmakers, not just as axe-wielders.",
  "This list is ranked by real Amazon reader reception, not by academic prestige, and it mixes three categories. Straight history (Neil Price, John Haywood, Cat Jarman, Judith Jesch) which reads like narrative nonfiction and absorbs the latest archaeology and DNA evidence. Primary sources, mainly the Icelandic sagas, which are family dramas written 200 years after the Viking Age by the descendants of Vikings. And a carefully chosen set of historical fiction, because the best Viking fiction, especially Bernard Cornwell's Last Kingdom series, is often how people get hooked in the first place.",
  "One heads-up on translations. Viking sagas are short but gnarly in 19th-century translations, the sentences are archaic and the names are transliterated wrong. Stick to Penguin Classics editions (Keneva Kunz on Vinland Sagas, Bernard Scudder on Njal, Jesse Byock on the Volsungs) or the Complete Sagas of Icelanders boxed set if you want to go deep. The older translations are free online and will put you off the genre, which is why most people who bounce off Viking sagas bounced off the wrong translation.",
  "New to the Viking Age? Start with Children of Ash and Elm by Neil Price, it is the current consensus one-volume introduction and it is readable in a week. Sagas expert? Skip to the back of the list, we pulled the best-translated Icelandic sagas we could find. Scroll for the ranked list, FAQ is at the bottom.",
];

const FAQ = [
  {
    q: "What is the best Viking history book for beginners?",
    a: "Children of Ash and Elm, by Neil Price, is the current standard. It was published in 2020, it absorbs a decade of new archaeology and genetics research, and it is structured the way a modern reader wants history structured, thematic first, chronological second. John Haywood's Northmen is a strong second choice if you want a more traditional narrative history of the Viking Age. Both are roughly 400 pages and both read fast because they are written by people who are actually good at prose, not just scholarship.",
  },
  {
    q: "Did Vikings really wear horned helmets?",
    a: "No, and the myth is younger than you think. The horned helmet image comes from 19th-century Romantic opera costumes, specifically productions of Wagner's Ring cycle in the 1870s. Actual Viking helmets were simple rounded iron caps, sometimes with an eye guard or nose piece, never with horns. We know this because we have only one fully preserved Viking helmet (the Gjermundbu helmet, found in Norway in 1943) and it looks like what you would expect from a functional 10th-century piece of battle gear. Any Viking nonfiction book that does not make this point in the first 50 pages is either too casual or too polite.",
  },
  {
    q: "Are the Icelandic sagas actually readable today?",
    a: "Yes, if you pick the right translation. Njal's Saga is the novelistic one, Egil's Saga is the most character-driven, Laxdaela Saga is a Viking-era family drama with a strong female lead, and the Saga of the Volsungs is proto-fantasy (Tolkien drew heavily on it for Lord of the Rings). Use Penguin Classics editions from the last 20 years. Avoid public-domain 19th-century translations, which read like mock-medieval pastiche and gave the sagas an unfair reputation for being dull.",
  },
  {
    q: "Is Bernard Cornwell's Last Kingdom series historically accurate?",
    a: "Mostly, with some creative license for the main character. Uhtred is a fictional insert, but the 9th and 10th century English-Danish wars he fights in are real, Alfred the Great and his heirs are portrayed with surprising nuance, and Cornwell's research is taken seriously by actual Anglo-Saxon historians. If you want straight history, you still need a nonfiction book, the series inevitably compresses timelines. But as an entry point to the political situation in Viking-era England, the Last Kingdom novels are one of the better modern examples of historical fiction doing its homework.",
  },
  {
    q: "Did female Vikings really fight in battles?",
    a: "Some did, and the evidence is finally getting mainstream coverage. The famous Birka warrior grave (Bj 581) was confirmed in 2017 via DNA testing to belong to a woman, buried with full warrior gear, horses, and weapons, and the scholarly argument has shifted from can this be real to how common was this. Cat Jarman's River Kings covers this evidence well. The short answer is, it was not the default, but there is a growing body of burial evidence that some Norse women held combat roles, and the sagas mention shield-maidens often enough that it was at least a recognized cultural category.",
  },
  {
    q: "Vikings TV show vs reality, how close are they?",
    a: "Aesthetically loose, historically closer than people assume. The look is stylized, the costumes are fanciful, the timeline compresses decades into episodes, and Ragnar Lothbrok is closer to legendary figure than documented historical person. But the raid on Lindisfarne, the siege of Paris, the settlement of the Danelaw, and the invasion of England by the Great Heathen Army all actually happened, roughly when the show says they did. If you loved Vikings, read Northmen by Haywood next, you will recognize most of the events.",
  },
  {
    q: "What is the best Viking book on audiobook?",
    a: "Neil Price's Children of Ash and Elm, narrated by Samuel Roukin, is a standout, it is 20 hours of well-paced history with a good reader. For sagas, the Audible production of Njal's Saga works, it is prose narrative so it translates to audio. Avoid the Eddas on audiobook, they are poetic and structured for silent reading.",
  },
];

export default function BestVikingBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = `${b.title} ${b.description || ""} ${b.tags?.join(" ") || ""}`.toLowerCase();
      return /viking|norse|scandinavia|odin|thor|valhalla|ragnarok|longship|northmen|norsemen|fjord|saga|skald/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Viking Books in 2026"
      description="The Vikings were more than raiders, they were explorers, traders, craftsmen, and poets who shaped medieval Europe. These are the best Viking books, covering Norse history, mythology, and the legendary sagas, ranked by readers obsessed with the Norse world."
      books={books}
      breadcrumb="Best Viking Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://www.skriuwer.com/best-viking-books"
      intro={INTRO_PARAGRAPHS}
      faq={FAQ}
      showComparison
    />
  );
}
