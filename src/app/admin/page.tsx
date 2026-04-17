import { getAllBooks } from "@/lib/books";
import AdminClient from "./AdminClient";

export const metadata = {
  robots: "noindex,nofollow",
};

export default function AdminPage() {
  const books = getAllBooks();
  return <AdminClient initialBooks={books} />;
}
