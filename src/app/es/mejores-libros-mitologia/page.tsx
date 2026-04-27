import type { Metadata } from "next";
import { getAllBooks } from "@/lib/books";
import { BestOfPage } from "@/components/BestOfPage";

export const metadata: Metadata = {
  title: "Mejores Libros de Mitología 2026 – Griega, Nórdica, Egipcia",
  description: "Los mejores libros de mitología: dioses griegos, héroes nórdicos, cosmología egipcia. Ordenados por valoraciones verificadas de Amazon.",
  alternates: { canonical: "https://www.skriuwer.com/es/mejores-libros-mitologia", languages: { en: "https://www.skriuwer.com/best-mythology-books", es: "https://www.skriuwer.com/es/mejores-libros-mitologia" } },
  openGraph: { title: "Mejores Libros de Mitología 2026", description: "Los mejores libros de mitología: dioses griegos, héroes nórdicos, cosmología egipcia.", url: "https://www.skriuwer.com/es/mejores-libros-mitologia", type: "website", locale: "es_ES" },
};

const INTRO = [
  "La mitología no es literatura infantil. Son los relatos con los que las civilizaciones intentaban responder preguntas que la ciencia aún no podía resolver: ¿por qué existe el mal, qué pasa después de la muerte, por qué los hombres son tan crueles entre sí? Los dioses son humanos, complejos y a menudo decepcionantes.",
  "Los libros de esta página cubren todo el espectro: desde textos académicos sobre las fuentes originales hasta adaptaciones modernas accesibles sin conocimiento previo.",
];

const FAQ = [
  { q: "¿Por dónde empezar si soy nuevo en mitología?", a: "Comience con una adaptación moderna en prosa accesible antes de abordar los textos originales. La mitología griega es un buen punto de partida, ya que muchas historias son ya conocidas de la cultura popular." },
  { q: "¿Cuál es la diferencia entre mitología griega y nórdica?", a: "La mitología griega gira en torno a las debilidades humanas y los caprichos de los dioses. La mitología nórdica tiene un tono más oscuro: los propios dioses morirán en el Ragnarök, y lo saben." },
  { q: "¿Hay buenos libros de mitología en español?", a: "Sí, hay traducciones de libros modernos así como ediciones de textos originales disponibles en español en Amazon. Consulte la disponibilidad en las páginas de libros individuales." },
  { q: "¿Qué mitologías están representadas?", a: "Griega, nórdica, egipcia, romana, céltica y más. El ranking está determinado por el número de valoraciones de lectores en Amazon." },
];

export default function MejoresLibrosMitologia() {
  const books = getAllBooks().filter((b) => b.categories.includes("mythology")).sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 20);
  return <BestOfPage title="Mejores Libros de Mitología 2026" description="Los libros de mitología más leídos — griega, nórdica, egipcia y más — ordenados por valoraciones en Amazon." books={books} breadcrumb="Libros de Mitología" categoryPage="/category/mythology" categoryLabel="Mitología" canonical="https://www.skriuwer.com/es/mejores-libros-mitologia" reviewer="Auke & el equipo Skriuwer" updatedDate="Abril 2026" intro={INTRO} faq={FAQ} showComparison locale="es" />;
}
