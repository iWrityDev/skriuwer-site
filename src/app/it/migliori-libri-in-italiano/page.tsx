import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri in Italiano 2026 – Ordinati per recensioni dei lettori",
  description: "I migliori libri disponibili in italiano: storia, mitologia, storia oscura e altro ancora. Ordinati per recensioni verificate Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-in-italiano", languages: { en: "https://www.skriuwer.com/best-books-in-italian", it: "https://www.skriuwer.com/it/migliori-libri-in-italiano" } },
  openGraph: { title: "Migliori Libri in Italiano 2026", description: "I migliori libri disponibili in italiano: storia, mitologia, storia oscura e altro.", url: "https://www.skriuwer.com/it/migliori-libri-in-italiano", type: "website", locale: "it_IT" },
};

const INTRO = [
  "Questa pagina raccoglie i libri più popolari disponibili in italiano, che si tratti di opere originali in italiano o di traduzioni. Libri informativi su storia e storia oscura, racconti bilingui per studenti di lingue e titoli su mitologia e teorie del complotto.",
  "Tutti i libri sono ordinati per numero di recensioni verificate dei lettori su Amazon. Questo significa che i libri in cima sono quelli che il maggior numero di persone ha effettivamente letto e valutato, non quelli con il budget pubblicitario più alto.",
];

const FAQ = [
  { q: "Quali libri italiani sono più popolari tra i lettori?", a: "I libri informativi in italiano su storia, storia oscura e racconti di sopravvivenza sono particolarmente richiesti. Su questa pagina i libri sono ordinati per numero di recensioni Amazon." },
  { q: "Ci sono libri bilingui disponibili in italiano?", a: "Sì, questa pagina include una selezione di racconti bilingui per italofoni che vogliono imparare una nuova lingua. Verificare la disponibilità nelle pagine dei singoli libri." },
  { q: "Questi libri sono disponibili fuori dall'Italia?", a: "Sì. Tutti i libri sono collegati ad Amazon, che spedisce a livello internazionale. I link nelle pagine dei singoli libri portano ad Amazon IT, DE, UK e US." },
  { q: "Quali categorie sono disponibili in italiano?", a: "Storia, storia oscura, apprendimento delle lingue (racconti bilingui) e true crime sono le categorie italiane più solide su questa pagina. Nuovi titoli vengono aggiunti regolarmente." },
];

export default function MiglioriLibriInItaliano() {
  const books = getAllBooks().filter((b) => b.language === "it").sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Migliori Libri in Italiano 2026" description="I migliori titoli disponibili in italiano: storia, storia oscura, racconti bilingui e altro. Ordinati per recensioni dei lettori su Amazon." books={books} breadcrumb="Libri in Italiano" categoryPage="/category/language-learning" categoryLabel="Apprendimento Lingue" canonical="https://www.skriuwer.com/it/migliori-libri-in-italiano" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
