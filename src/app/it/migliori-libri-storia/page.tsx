import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri di Storia 2026 – Ordinati per recensioni dei lettori",
  description: "I migliori libri di storia ordinati per numero di recensioni verificate Amazon. Storie che rivelano ciò che i libri di testo omettono.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-storia", languages: { en: "https://www.skriuwer.com/best-history-books", it: "https://www.skriuwer.com/it/migliori-libri-storia" } },
  openGraph: { title: "Migliori Libri di Storia 2026", description: "I migliori libri di storia ordinati per recensioni verificate Amazon.", url: "https://www.skriuwer.com/it/migliori-libri-storia", type: "website", locale: "it_IT" },
};

const INTRO = [
  "La storiografia ufficiale è sempre una scelta editoriale. I governi decidono cosa entra nei libri di testo. I migliori libri di storia vanno oltre il racconto dominante per rivelare cosa è successo veramente.",
  "Questa lista copre storia antica, medievale e moderna. Tutti ordinati per numero di recensioni verificate dei lettori su Amazon.",
];

const FAQ = [
  { q: "Come scegliere un buon libro di storia?", a: "Privilegiare autori con formazione accademica o giornalistica, libri con note a piè di pagina e una solida bibliografia. I libri che mettono in discussione il racconto ufficiale con prove sono generalmente più affidabili." },
  { q: "Questi libri sono adatti ai principianti?", a: "La maggior parte sì. I libri meglio valutati sono spesso quelli che rendono la storia accessibile senza sacrificare il rigore. Un buon libro di storia si legge come un romanzo ma si basa su fatti documentati." },
  { q: "Ci sono libri di storia disponibili in italiano?", a: "Sì. Diversi titoli di questa lista sono disponibili in traduzione italiana su Amazon. Verificare la disponibilità su ogni pagina del libro." },
  { q: "Quali periodi storici sono rappresentati?", a: "Questa lista copre un ampio spettro: Antichità, Medioevo, era moderna e storia contemporanea. La classifica è determinata dalle valutazioni dei lettori su Amazon." },
];

export default function MiglioriLibriStoria() {
  const books = getAllBooks().filter((b) => b.categories.includes("history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Migliori Libri di Storia 2026" description="I libri di storia più letti, ordinati per recensioni verificate dei lettori su Amazon." books={books} breadcrumb="Libri di Storia" categoryPage="/category/history" categoryLabel="Storia" canonical="https://www.skriuwer.com/it/migliori-libri-storia" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
