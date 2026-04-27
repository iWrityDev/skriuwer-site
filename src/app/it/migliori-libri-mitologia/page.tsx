import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri di Mitologia 2026 – Greca, Norrena, Egizia",
  description: "I migliori libri di mitologia: dei greci, eroi norreni, cosmologia egizia. Ordinati per recensioni verificate Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-mitologia", languages: { en: "https://www.skriuwer.com/best-mythology-books", it: "https://www.skriuwer.com/it/migliori-libri-mitologia" } },
  openGraph: { title: "Migliori Libri di Mitologia 2026", description: "I migliori libri di mitologia: dei greci, eroi norreni, cosmologia egizia.", url: "https://www.skriuwer.com/it/migliori-libri-mitologia", type: "website", locale: "it_IT" },
};

const INTRO = [
  "La mitologia non è letteratura per bambini. Sono le storie con cui le civiltà cercavano di rispondere a domande che la scienza non poteva ancora rispondere: perché esiste il male, cosa succede dopo la morte, perché gli uomini sono così crudeli tra loro? Gli dei sono umani, complessi e spesso deludenti.",
  "I libri di questa pagina coprono tutto lo spettro: dai testi accademici sulle fonti originali alle moderne rielaborazioni accessibili anche senza conoscenze pregresse.",
];

const FAQ = [
  { q: "Da dove iniziare se sono nuovo alla mitologia?", a: "Iniziare con una moderna rielaborazione in prosa accessibile prima di affrontare i testi originali. La mitologia greca è un buon punto di partenza, poiché molte storie sono già note dalla cultura popolare." },
  { q: "Qual è la differenza tra mitologia greca e norrena?", a: "La mitologia greca ruota attorno alle debolezze umane e ai capricci degli dei. La mitologia norrena ha un tono più oscuro: gli stessi dei moriranno durante il Ragnarök, e lo sanno." },
  { q: "Ci sono buoni libri di mitologia in italiano?", a: "Sì, sia traduzioni di libri moderni che edizioni dell'Edda originale sono disponibili in italiano su Amazon. Verificare la disponibilità sulle pagine dei singoli libri." },
  { q: "Quali mitologie sono rappresentate?", a: "Greca, norrena, egizia, romana, celtica e altro ancora. La classifica è determinata dal numero di recensioni dei lettori su Amazon." },
];

export default function MiglioriLibriMitologia() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Migliori Libri di Mitologia 2026" description="I libri di mitologia più letti — greca, norrena, egizia e altro — ordinati per recensioni dei lettori su Amazon." books={books} breadcrumb="Libri di Mitologia" categoryPage="/category/mythology" categoryLabel="Mitologia" canonical="https://www.skriuwer.com/it/migliori-libri-mitologia" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
