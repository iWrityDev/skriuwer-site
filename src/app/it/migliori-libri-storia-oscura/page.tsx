import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri di Storia Oscura 2026 – Ciò che i libri di testo omettono",
  description: "I migliori libri sulla storia oscura: pagine nascoste, crimini dimenticati e il rovescio della storiografia ufficiale. Ordinati per recensioni Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-storia-oscura", languages: { en: "https://www.skriuwer.com/best-dark-history-books", it: "https://www.skriuwer.com/it/migliori-libri-storia-oscura" } },
  openGraph: { title: "Migliori Libri di Storia Oscura 2026", description: "I migliori libri sul lato oscuro della storia.", url: "https://www.skriuwer.com/it/migliori-libri-storia-oscura", type: "website", locale: "it_IT" },
};

const INTRO = [
  "La storiografia ufficiale è sempre una scelta. I governi decidono cosa entra nei libri di testo. Molto di ciò che è veramente accaduto viene discretamente messo da parte. I libri di storia oscura trattano proprio quelle pagine omesse.",
  "I migliori autori in questo campo lavorano con le fonti ed evitano il sensazionalismo. Spiegano come è potuto accadere, chi ne era a conoscenza e perché è rimasto nascosto così a lungo.",
];

const FAQ = [
  { q: "Qual è la differenza tra storia oscura e storia ordinaria?", a: "I libri di storia ordinari seguono generalmente il racconto ufficiale. I libri di storia oscura si concentrano sul rovescio: abuso di potere, segreti di Stato, crimini dimenticati e le persone escluse dal racconto ufficiale." },
  { q: "Questi libri sono basati su fatti o sono sensazionalistici?", a: "Entrambi i tipi sono presenti nella classifica, ma i libri meglio valutati lavorano generalmente con fonti e note a piè di pagina. I lettori valutano peggio nel tempo i libri che si basano su supposizioni." },
  { q: "Quali argomenti vengono trattati?", a: "Tra gli altri: esperimenti statali su cittadini non informati, assassinii politici, crimini coloniali, storie di guerra nascoste e il funzionamento della propaganda." },
  { q: "Questi libri sono disponibili in italiano?", a: "Alcuni dei titoli consigliati sono disponibili in traduzione italiana su Amazon. Verificare la disponibilità nelle pagine dei singoli libri." },
];

export default function MiglioriLibriStoriaOscura() {
  const books = getAllBooks().filter((b) => b.categories.includes("dark-history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Migliori Libri di Storia Oscura 2026" description="I libri più letti sulla storia nascosta, i crimini dimenticati e il rovescio della storiografia ufficiale, ordinati per recensioni Amazon." books={books} breadcrumb="Storia Oscura" categoryPage="/category/dark-history" categoryLabel="Storia Oscura" canonical="https://www.skriuwer.com/it/migliori-libri-storia-oscura" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
