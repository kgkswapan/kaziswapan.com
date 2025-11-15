import type { CollectionEntry } from "astro:content";

const stripExt = (value: string) => value.replace(/\.[^/.]+$/, "");

const getNoteSlug = (note: CollectionEntry<"notes">) => {
  const base = stripExt(note.id);
  return base
    .split("/")
    .filter(Boolean)
    .join("/");
};

export default getNoteSlug;
