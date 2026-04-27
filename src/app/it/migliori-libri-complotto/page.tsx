import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri sui Complotti 2026 – Fatti dietro i miti",
  description: "I migliori libri sulle teorie del complotto, gli insabbiamenti e la storia nascosta. Ordinati per recensioni verificate dei lettori su Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-complotto", languages: { en: "https://www.skriuwer.com/best-conspiracy-books", it: "https://www.skriuwer.com/it/migliori-libri-complotto" } },
  openGraph: { title: "Migliori Libri sui Complotti 2026", description: "I migliori libri sulle teorie del complotto, gli insabbiamenti e la storia nascosta.", url: "https://www.skriuwer.com/it/migliori-libri-complotto", type: "website", locale: "it_IT" },
};

const INTRO = [
  "Non tutte le teorie del complotto sono false, e non tutte sono vere. I migliori libri su questo argomento separano i fatti dimostrabili dalla speculazione, esaminano i veri insabbiamenti di governi e aziende e mostrano come funziona la disinformazione.",
  "Questa lista include sia libri che documentano vere cospirazioni storiche sia libri che trattano criticamente le teorie popolari. Tutti ordinati per numero di recensioni verificate dei lettori su Amazon.",
];

const FAQ = [
  { q: "Qual è la differenza tra una vera cospirazione e una teoria del complotto?", a: "Una vera cospirazione è un complotto segreto dimostrabile (come MKUltra, il Watergate o le campagne dell'industria del tabacco degli anni '60). Una teoria del complotto è un'affermazione non verificabile su un potere segreto." },
  { q: "Questi libri sono seri o sensazionalistici?", a: "Entrambi sono rappresentati nella classifica, ma i libri meglio valutati lavorano generalmente con le fonti. I libri che si basano solo su supposizioni vengono valutati peggio dai lettori nel tempo." },
  { q: "Quali vere cospirazioni vengono trattate?", a: "Tra le altre: esperimenti della CIA con LSD su soggetti non informati, programmi di sorveglianza statale, manipolazione delle elezioni, soppressione di ricerche mediche e vari assassinii politici." },
  { q: "Come riconoscere un libro serio su questo argomento?", a: "Cercare: riferimenti bibliografici in appendice, un autore con formazione giornalistica o accademica, e un editore di reputazione." },
];

export default function MiglioriLibriComplotto() {
  const books = getAllBooks().filter((b) => b.categories.includes("conspiracy")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Migliori Libri sui Complotti 2026" description="I libri più letti su cospirazioni, insabbiamenti e storia nascosta, ordinati per recensioni su Amazon." books={books} breadcrumb="Complotti" categoryPage="/category/conspiracy" categoryLabel="Complotti" canonical="https://www.skriuwer.com/it/migliori-libri-complotto" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
