import { slugifyStr } from "@/utils/slugify";

type BookSlugInput = {
  title: string;
  author: string;
  goodreadsId?: string;
  slug?: string;
};

export const getBookSlug = (book: BookSlugInput) => {
  if (book.slug) return book.slug;

  const base = [book.title, book.author].filter(Boolean).join(" ");
  const slug = slugifyStr(base);

  return book.goodreadsId ? `${slug}-${book.goodreadsId}` : slug;
};
