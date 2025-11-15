import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import noteFilter from "./noteFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueNoteTags = (notes: CollectionEntry<"notes">[]) => {
  const counts = new Map<string, Tag>();

  notes.filter(noteFilter).forEach(note => {
    note.data.tags.forEach(tagName => {
      const tag = slugifyStr(tagName);
      const current = counts.get(tag);
      if (current) {
        current.count += 1;
      } else {
        counts.set(tag, { tag, tagName, count: 1 });
      }
    });
  });

  return Array.from(counts.values()).sort((a, b) => {
    if (b.count === a.count) {
      return a.tag.localeCompare(b.tag);
    }
    return b.count - a.count;
  });
};

export default getUniqueNoteTags;
