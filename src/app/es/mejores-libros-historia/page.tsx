import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros de Historia 2026 – Ordenados por valoraciones de lectores",
  description: "Los mejores libros de historia ordenados por número de valoraciones verificadas de Amazon. Relatos que revelan lo que los libros de texto omiten.",
  alternates: {
    canonical: "https://www.skriuwer.com/es/mejores-libros-historia",
    languages: {
      en: "https://www.skriuwer.com/best-history-books",
      de: "https://www.skriuwer.com/de/beste-geschichtsbuecher",
      nl: "https://www.skriuwer.com/nl/beste-geschiedenisboeken",
      fr: "https://www.skriuwer.com/fr/meilleurs-livres-histoire",
      es: "https://www.skriuwer.com/es/mejores-libros-historia",
    },
  },
  openGraph: { title: "Mejores Libros de Historia 2026", description: "Los mejores libros de historia ordenados por valoraciones verificadas de Amazon.", url: "https://www.skriuwer.com/es/mejores-libros-historia", type: "website", locale: "es_ES" },
};

const INTRO = [
  "La historia oficial siempre es una elección editorial. Los gobiernos deciden qué entra en los libros de texto. Los mejores libros de historia van más allá del relato dominante para revelar lo que realmente ocurrió.",
  "Esta lista cubre historia antigua, medieval y moderna. Todos ordenados por número de valoraciones verificadas de lectores en Amazon.",
];

const FAQ = [
  { q: "¿Cómo elegir un buen libro de historia?", a: "Prefiera autores con formación académica o periodística, libros con notas al pie y una bibliografía sólida. Los libros que cuestionan el relato oficial con pruebas son generalmente más fiables que los que simplemente confirman ideas preconcebidas." },
  { q: "¿Estos libros son adecuados para principiantes?", a: "La mayoría sí. Los libros mejor valorados suelen ser los que hacen la historia accesible sin sacrificar el rigor. Un buen libro de historia se lee como una novela pero se basa en hechos documentados." },
  { q: "¿Hay libros de historia disponibles en español?", a: "Sí. Varios títulos de esta lista están disponibles en traducción española en Amazon. Consulte la disponibilidad en cada página de libro individual." },
  { q: "¿Qué períodos históricos están representados?", a: "Esta lista cubre un amplio espectro: Antigüedad, Edad Media, era moderna e historia contemporánea. El ranking está determinado por las valoraciones de lectores en Amazon." },
];

export default function MejoresLibrosHistoria() {
  const books = getAllBooks().filter((b) => b.categories.includes("history")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Mejores Libros de Historia 2026" description="Los libros de historia más leídos, ordenados por valoraciones verificadas de lectores en Amazon." books={books} breadcrumb="Libros de Historia" categoryPage="/category/history" categoryLabel="Historia" canonical="https://www.skriuwer.com/es/mejores-libros-historia" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
