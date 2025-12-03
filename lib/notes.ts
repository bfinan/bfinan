// lib/notes.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const notesDir = path.join(process.cwd(), "res", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
};

export function getAllNotesMeta(): NoteMeta[] {
  const files = fs.readdirSync(notesDir);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(notesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const slug = file.replace(/\.md$/, "");

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNoteBySlug(slug: string) {
  const fullPath = path.join(notesDir, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const contentHtml = processed.toString();

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
    },
    contentHtml,
  };
}
