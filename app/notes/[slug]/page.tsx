// app/notes/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getAllNotesMeta, getNoteBySlug } from "@/lib/notes";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const notes = getAllNotesMeta();
  return notes.map((note) => ({ slug: note.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  const notes = getAllNotesMeta();
  const exists = notes.some((n) => n.slug === slug);
  if (!exists) {
    return notFound();
  }

  const { meta, contentHtml } = await getNoteBySlug(slug);

  return (
    <main className="max-w-2xl mx-auto py-8">
      <article className="prose">
        <h1>{meta.title}</h1>
        

        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </main>
  );
}
