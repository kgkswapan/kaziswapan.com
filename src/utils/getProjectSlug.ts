import type { CollectionEntry } from "astro:content";

const stripExt = (value: string) => value.replace(/\.[^.]+$/, "");

const getProjectSlug = (project: CollectionEntry<"projects">) => {
  const entry = project as CollectionEntry<"projects"> & { slug?: string };
  if (entry.slug) return entry.slug;
  const fromId = entry.id.split("/").pop() ?? entry.id;
  return stripExt(fromId);
};

export default getProjectSlug;
