import type { Metadata } from "next";
import { getAllBooks } from '@/lib/books';
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Best Norse Mythology Books in 2026, Ranked by Reader Reviews",
  description:
    "The 15 best Norse mythology books in 2026, ranked by Amazon reviews. From Neil Gaiman's accessible retelling to Snorri Sturluson's original Eddas, plus Viking sagas and modern fiction based on Odin, Thor, and Ragnarok.",
  alternates: { canonical: "https://www.skriuwer.com/best-norse-mythology-books" },
};

const INTRO_PARAGRAPHS = [
  "Norse mythology is the bleakest, funniest, and most grounded of the major world mythologies. The gods know they are doomed. Ragnarok is coming, nothing they do can stop it, and the stories are about how they face the end anyway. That fatalism is what makes the Norse myths hit different from Greek or Roman ones, and it is why they are having a real second wind with modern readers.",
  "This list is ranked by actual reader reception. Every book below has a strong Amazon rating and enough reviews to trust the signal. We included three types of books. First, primary sources in good modern translations, the Poetic Edda and the Prose Edda, the two documents everything else depends on. Second, accessible retellings for readers who want the stories without wading through medieval Icelandic, Neil Gaiman being the obvious pick. Third, scholarly introductions that explain who these people were and why they believed what they believed.",
  "A fast note on what Norse mythology is and is not. The stories were written down in Iceland in the 13th century, about 200 years after the official conversion to Christianity. That means every source we have was edited by Christian scribes, so there is real academic debate about how much of the material is authentic pre-Christian belief and how much is reconstructed later. This does not make the stories less interesting, but if you want an unvarnished record of Viking-era religion, you will not find it in any single book, including these.",
  "If you are brand new, start with Gaiman, then go to Crawford's translation of the Poetic Edda. If you are a returning reader who wants sagas instead of myth collections, skip to the end of the list, where we put the Icelandic family sagas. Scroll down for the ranked list, and the FAQ at the bottom answers the questions we get most often.",
];

const FAQ = [
  {
    q: "What is the best Norse mythology book for complete beginners?",
    a: "Norse Mythology by Neil Gaiman is the easiest on-ramp. Gaiman restructured the myths into a clean chronological arc, from the creation of the Nine Worlds to Ragnarok, in prose that reads like modern short fiction. It covers Odin, Thor, Loki, the creation myth, the theft of Idun's apples, the binding of Fenrir, and the death of Baldur, the core myths every other book assumes you know. From there you can step up to the actual source texts without feeling lost.",
  },
  {
    q: "Poetic Edda or Prose Edda, which should I read first?",
    a: "Prose Edda, by Snorri Sturluson, in the Jesse Byock translation. The Prose Edda is organized, explanatory, and it was written specifically to teach the myths to readers who did not already know them, which is exactly what you want as a modern reader. The Poetic Edda is older, more fragmentary, and more poetic, meaning you need context to understand what is happening. Read Prose first, then come back to Poetic once you know the story beats. Jackson Crawford's Poetic Edda translation is the standard modern recommendation.",
  },
  {
    q: "Are Viking sagas the same as Norse mythology?",
    a: "No. The Viking sagas (Njal's Saga, Egil's Saga, the Saga of the Volsungs, Eirik the Red, and so on) are prose narratives about real or semi-real Viking-era families and adventures. Norse mythology is the stories about the gods, Odin, Thor, Loki, and the creation of the world. They come from the same literary tradition and overlap at the edges, the Volsung saga includes mythological figures, for example, but they are different genres. If you want gods, read the Eddas. If you want human feuds and sea voyages, read the sagas.",
  },
  {
    q: "What is the most accurate Norse mythology book?",
    a: "Accurate is a loaded word here because our sources are 13th-century Christian Icelanders writing about 9th-century paganism. That said, The Viking Spirit by Daniel McCoy and Norse Mythology by John Lindow are the two most academically respected single-volume introductions. Both cite sources, flag which stories come from where, and note where modern pop culture has distorted the myths. Lindow is slightly drier, McCoy is slightly more fun, and both are strong.",
  },
  {
    q: "Is Marvel Thor accurate to Norse mythology?",
    a: "Not really. Marvel's Thor is a loose inspiration, not an adaptation. In the actual myths Thor is red-haired and red-bearded, he is married to Sif, Loki is not his brother (they are not even the same species, Loki is a Jotun who lives with the gods), and Odin is not a wise philosopher king, he is a god of poetry, frenzy, and war who regularly betrays his allies. The myths are weirder, funnier, and darker than the films. This is why people who like the films usually love the actual source material even more.",
  },
  {
    q: "Which Norse mythology book is best on audiobook?",
    a: "Neil Gaiman narrates his own Norse Mythology and he does it well, it is one of the top-rated mythology audiobooks on Audible. For the Eddas, skip audiobook format, they are structured with kennings and poetic devices that do not survive narration. Read those on paper. For sagas, try Bernard Scudder's Njal's Saga or the Penguin Classics translation of the Saga of the Volsungs, both work in audio because they are prose narratives.",
  },
  {
    q: "What order should I read Norse mythology books in?",
    a: "Start with Gaiman for the story shape. Move to Jesse Byock's Prose Edda translation for the organized source text. Then either Jackson Crawford's Poetic Edda for the poetic source, or McCoy's The Viking Spirit for academic context. From there, pick a saga, Njal's Saga is the most novelistic, Egil's Saga is the most character-driven, and the Saga of the Volsungs is the closest thing to Norse fantasy in the medieval record.",
  },
];

export default function BestNorseMythologyBooksPage() {
  const books = getAllBooks()
    .filter((b) => {
      const text = (b.description || "").toLowerCase() + " " + b.title.toLowerCase();
      return /norse|viking|odin|thor|valhalla/.test(text);
    })
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 15);

  return (
    <BestOfPage
      title="Best Norse Mythology Books in 2026"
      description="Norse mythology is one of the richest and most dramatic traditions in world folklore, full of gods, monsters, and world-ending prophecies. These are the best books on Norse myths and the Vikings, ranked by readers who explored every saga."
      books={books}
      breadcrumb="Best Norse Mythology Books"
      categoryPage="/category/mythology"
      categoryLabel="mythology"
      canonical="https://www.skriuwer.com/best-norse-mythology-books"
      intro={INTRO_PARAGRAPHS}
      faq={FAQ}
      showComparison
    />
  );
}
