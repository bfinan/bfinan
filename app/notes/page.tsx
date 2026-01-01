// app/notes/page.tsx
import Link from "next/link";
import { getAllNotesMeta } from "@/lib/notes";
import UnderConstructionGif from "@/app/components/UnderConstructionGif";

export const dynamic = "force-static"; // ensure SSG

export default function NotesIndexPage() {
  const notes = getAllNotesMeta();

  return (
    <main className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>

      <div className="flex justify-center items-center gap-2 mb-4">
        <UnderConstructionGif />
        <UnderConstructionGif />
        <UnderConstructionGif />
      </div>
      <p className="text-center mb-4">Still working on better rendering for these notes so they will look pretty bad. But you knew that when you clicked on the link from the homepage.</p>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="text-lg font-semibold underline"
            >
              {note.title}
            </Link>
            {note.date && (
              <p className="text-sm text-gray-500">
                {new Date(note.date).toLocaleDateString()}
              </p>
            )}
            {note.summary && (
              <p className="text-sm mt-1 text-gray-300">{note.summary}</p>
            )}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
