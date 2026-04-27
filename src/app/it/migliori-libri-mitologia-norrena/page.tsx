import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Migliori Libri di Mitologia Norrena 2026 – Odino, Thor, Ragnarök",
  description: "I migliori libri sulla mitologia norrena: vichinghi, dei, la fine del mondo. Per principianti ed esperti. Ordinati per recensioni verificate Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/it/migliori-libri-mitologia-norrena", languages: { en: "https://www.skriuwer.com/best-norse-mythology-books", it: "https://www.skriuwer.com/it/migliori-libri-mitologia-norrena" } },
  openGraph: { title: "Migliori Libri di Mitologia Norrena 2026", description: "I migliori libri sulla mitologia norrena: vichinghi, dei, la fine del mondo.", url: "https://www.skriuwer.com/it/migliori-libri-mitologia-norrena", type: "website", locale: "it_IT" },
};

const INTRO = [
  "La mitologia norrena è più oscura di quella greca. Qui gli stessi dei moriranno. Odino lo sa, si prepara e combatte comunque. Quell'atteggiamento — coraggio di fronte a una fine certa — ha plasmato la cultura vichinga e affascina lettori di tutto il mondo fino ad oggi.",
  "I libri di questa pagina coprono tutto lo spettro: dai testi accademici sull'Edda originale alle avvincenti rielaborazioni moderne accessibili anche senza conoscenze pregresse.",
];

const FAQ = [
  { q: "Qual è la migliore introduzione alla mitologia norrena?", a: "Per i principianti si consiglia di iniziare con moderne rielaborazioni in prosa accessibile prima di affrontare la Prosa Edda o l'Edda poetica. Le fonti primarie richiedono alcune conoscenze contestuali." },
  { q: "Cos'è il Ragnarök e perché è così importante?", a: "Il Ragnarök è la fine del mondo nella mitologia norrena: una battaglia finale in cui quasi tutti gli dei e i mostri periscono. Ciò che rende speciale il Ragnarök: è previsto, inevitabile, e gli dei si preparano comunque." },
  { q: "In cosa differisce la mitologia norrena dalla versione cinematografica (Marvel)?", a: "Considerevolmente. Loki nell'Edda non è un antieroe eroico, ma un trickster complesso che alla fine sceglie il male. Thor è meno eloquente e molto più brutale." },
  { q: "Ci sono libri di mitologia norrena disponibili in italiano?", a: "Sì. Traduzioni di libri moderni ed edizioni dell'Edda originale sono disponibili in italiano su Amazon. Verificare la disponibilità nelle pagine dei singoli libri." },
];

export default function MiglioriLibriMitologiaNorrena() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology") && (b.title.toLowerCase().includes("norse") || b.title.toLowerCase().includes("viking") || b.title.toLowerCase().includes("odin") || b.title.toLowerCase().includes("thor") || b.title.toLowerCase().includes("nordic") || b.description?.toLowerCase().includes("norse") || b.description?.toLowerCase().includes("viking"))).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 15);
  return <BestOfPage title="Migliori Libri di Mitologia Norrena 2026" description="I libri più letti su vichinghi, dei e Ragnarök, dalle introduzioni ai testi originali. Ordinati per recensioni su Amazon." books={books} breadcrumb="Mitologia Norrena" categoryPage="/category/mythology" categoryLabel="Mitologia" canonical="https://www.skriuwer.com/it/migliori-libri-mitologia-norrena" reviewer="Auke & il team Skriuwer" updatedDate="Aprile 2026" intro={INTRO} faq={FAQ} showComparison locale="it" />;
}
