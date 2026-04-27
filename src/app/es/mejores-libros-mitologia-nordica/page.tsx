import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros de Mitología Nórdica 2026 – Odín, Thor, Ragnarök",
  description: "Los mejores libros sobre mitología nórdica: vikingos, dioses, el fin del mundo. Para principiantes y conocedores. Ordenados por valoraciones de Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/es/mejores-libros-mitologia-nordica", languages: { en: "https://www.skriuwer.com/best-norse-mythology-books", es: "https://www.skriuwer.com/es/mejores-libros-mitologia-nordica" } },
  openGraph: { title: "Mejores Libros de Mitología Nórdica 2026", description: "Los mejores libros sobre mitología nórdica: vikingos, dioses, el fin del mundo.", url: "https://www.skriuwer.com/es/mejores-libros-mitologia-nordica", type: "website", locale: "es_ES" },
};

const INTRO = [
  "La mitología nórdica es más oscura que la griega. Aquí los propios dioses morirán. Odín lo sabe, se prepara y sigue luchando de todos modos. Esa actitud — valentía ante un fin seguro — dio forma a la cultura vikinga y fascina a lectores de todo el mundo hasta hoy.",
  "Los libros de esta página cubren todo el espectro: desde textos académicos sobre la Edda original hasta adaptaciones modernas apasionantes accesibles sin conocimiento previo.",
];

const FAQ = [
  { q: "¿Cuál es la mejor introducción a la mitología nórdica?", a: "Para principiantes se recomienda comenzar con adaptaciones modernas en prosa accesible antes de abordar la Prosa Edda o la Edda Poética. Las fuentes primarias requieren cierto conocimiento contextual." },
  { q: "¿Qué es el Ragnarök y por qué es tan importante?", a: "El Ragnarök es el fin del mundo en la mitología nórdica: una batalla final en la que casi todos los dioses y monstruos perecen. Lo que hace especial al Ragnarök: está predicho, es inevitable, y los dioses se preparan para él de todos modos." },
  { q: "¿En qué se diferencia la mitología nórdica de la versión cinematográfica (Marvel)?", a: "Considerablemente. Loki en la Edda no es un antihéroe heroico, sino un trickster complejo que finalmente elige el mal. Thor es menos elocuente y mucho más brutal." },
  { q: "¿Hay libros de mitología nórdica disponibles en español?", a: "Sí. Traducciones de libros modernos así como ediciones de la Edda original están disponibles en español en Amazon. Consulte la disponibilidad en las páginas individuales." },
];

export default function MejoresLibrosMitologiaNordica() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology") && (b.title.toLowerCase().includes("norse") || b.title.toLowerCase().includes("viking") || b.title.toLowerCase().includes("odin") || b.title.toLowerCase().includes("thor") || b.title.toLowerCase().includes("nordic") || b.description?.toLowerCase().includes("norse") || b.description?.toLowerCase().includes("viking"))).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 15);
  return <BestOfPage title="Mejores Libros de Mitología Nórdica 2026" description="Los libros más leídos sobre vikingos, dioses y Ragnarök, desde introducciones hasta los textos originales. Ordenados por valoraciones en Amazon." books={books} breadcrumb="Mitología Nórdica" categoryPage="/category/mythology" categoryLabel="Mitología" canonical="https://www.skriuwer.com/es/mejores-libros-mitologia-nordica" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
