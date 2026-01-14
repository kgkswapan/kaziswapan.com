import { getCollection, type CollectionEntry } from "astro:content";
import { getBookSlug } from "@/utils/getBookSlug";

const GOODREADS_USER_ID = "55613653";

const GOODREADS_SHELVES = ["currently-reading", "read"] as const;
export type BookStatus = (typeof GOODREADS_SHELVES)[number] | "manual";

export type MergedBook = {
  id: string;
  slug: string;
  title: string;
  author: string;
  image?: string;
  goodreadsId?: string;
  isbn?: string;
  averageRating?: number;
  numPages?: number;
  published?: string;
  description?: string;
  affiliateLink?: string;
  noteSlug?: string;
  status: BookStatus;
  dateRead?: string;
  dateReadLabel?: string;
  source: "goodreads" | "manual" | "merged";
};

type GoodreadsBook = {
  goodreadsId?: string;
  title: string;
  author: string;
  image?: string;
  isbn?: string;
  averageRating?: number;
  numPages?: number;
  published?: string;
  description?: string;
  dateRead?: string;
  dateReadLabel?: string;
  status: BookStatus;
};

type LocalBook = {
  title: string;
  author: string;
  slug?: string;
  status?: BookStatus;
  goodreadsId?: string;
  isbn?: string;
  averageRating?: number;
  numPages?: number;
  published?: string;
  affiliateLink?: string;
  noteSlug?: string;
  description?: string;
};

const stripCdata = (value: string) =>
  value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1").trim();

const extractTag = (item: string, tag: string) => {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? stripCdata(match[1]) : "";
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const parseGoodreadsRss = (xml: string, shelf: BookStatus): GoodreadsBook[] => {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.reduce<GoodreadsBook[]>((acc, item) => {
    const title = extractTag(item, "title");
    const author = extractTag(item, "author_name");
    const goodreadsId = extractTag(item, "book_id");
    const image =
      extractTag(item, "book_large_image_url") ||
      extractTag(item, "book_medium_image_url") ||
      extractTag(item, "book_image_url");
    const isbn = extractTag(item, "isbn");
    const averageRatingRaw = extractTag(item, "average_rating");
    const numPagesRaw = extractTag(item, "num_pages");
    const published = extractTag(item, "book_published");
    const description = extractTag(item, "book_description");
    const dateRead = extractTag(item, "user_read_at");
    const averageRating = Number.parseFloat(averageRatingRaw);
    const numPages = Number.parseInt(numPagesRaw, 10);

    if (!title || !author) return acc;

    acc.push({
      goodreadsId: goodreadsId || undefined,
      title,
      author,
      image: image || undefined,
      isbn: isbn || undefined,
      averageRating: Number.isFinite(averageRating) ? averageRating : undefined,
      numPages: Number.isFinite(numPages) ? numPages : undefined,
      published: published || undefined,
      description: description || undefined,
      dateRead: dateRead || undefined,
      dateReadLabel: dateRead ? formatDate(dateRead) : undefined,
      status: shelf,
    });
    return acc;
  }, []);
};

const fetchShelf = async (shelf: BookStatus): Promise<GoodreadsBook[]> => {
  try {
    const url = new URL(
      `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`
    );
    url.searchParams.set("shelf", shelf);
    url.searchParams.set("per_page", "200");
    if (shelf === "read") {
      url.searchParams.set("sort", "date_read");
      url.searchParams.set("order", "d");
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "KaziGulamKadarSite/1.0",
      },
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return parseGoodreadsRss(xml, shelf);
  } catch {
    return [];
  }
};

const normalizeLocalBook = (entry: CollectionEntry<"books">): LocalBook => {
  const data = entry.data;
  return {
    title: data.title,
    author: data.author,
    slug: data.slug,
    status: data.status,
    goodreadsId: data.goodreadsId,
    isbn: data.isbn,
    averageRating: data.averageRating,
    numPages: data.numPages,
    published: data.published,
    affiliateLink: data.affiliateLink,
    noteSlug: data.noteSlug,
    description: data.description,
  };
};

const OVERRIDE_KEYS: Array<keyof LocalBook> = [
  "slug",
  "affiliateLink",
  "noteSlug",
];

const applyOverrides = (
  base: MergedBook,
  overrides?: LocalBook
): MergedBook => {
  if (!overrides) return base;

  const merged: MergedBook = { ...base };
  OVERRIDE_KEYS.forEach(key => {
    const value = overrides[key];
    if (value === undefined || value === "") return;

    if (key === "slug") {
      merged.slug = String(value);
      if (!merged.goodreadsId) {
        merged.id = merged.slug;
      }
      return;
    }

    if (key === "affiliateLink") {
      merged.affiliateLink = String(value);
      return;
    }

    if (key === "noteSlug") {
      merged.noteSlug = String(value);
    }
  });

  return merged;
};

const matchesLocal = (goodreads: GoodreadsBook, local: LocalBook) => {
  if (local.goodreadsId && goodreads.goodreadsId) {
    return local.goodreadsId === goodreads.goodreadsId;
  }
  if (local.isbn && goodreads.isbn) {
    return local.isbn === goodreads.isbn;
  }
  if (local.slug) {
    return (
      local.slug ===
      getBookSlug({
        title: goodreads.title,
        author: goodreads.author,
        goodreadsId: goodreads.goodreadsId,
      })
    );
  }

  const normalize = (value: string) => value.trim().toLowerCase();
  return (
    normalize(local.title) === normalize(goodreads.title) &&
    normalize(local.author) === normalize(goodreads.author)
  );
};

const buildMergedBook = (
  goodreads: GoodreadsBook,
  overrides?: LocalBook
): MergedBook => {
  const slug = getBookSlug({
    title: goodreads.title,
    author: goodreads.author,
    goodreadsId: goodreads.goodreadsId,
    slug: overrides?.slug,
  });

  const base: MergedBook = {
    id: goodreads.goodreadsId ?? slug,
    slug,
    title: goodreads.title,
    author: goodreads.author,
    image: goodreads.image,
    goodreadsId: goodreads.goodreadsId,
    isbn: goodreads.isbn,
    averageRating: goodreads.averageRating,
    numPages: goodreads.numPages,
    published: goodreads.published,
    description: goodreads.description,
    status: goodreads.status,
    dateRead: goodreads.dateRead,
    dateReadLabel: goodreads.dateReadLabel,
    source: overrides ? "merged" : "goodreads",
  };

  return applyOverrides(base, overrides);
};

const buildManualBook = (local: LocalBook): MergedBook => {
  const status = local.status ?? "read";
  const slug = getBookSlug({
    title: local.title,
    author: local.author,
    goodreadsId: local.goodreadsId,
    slug: local.slug,
  });

  const base: MergedBook = {
    id: local.goodreadsId ?? slug,
    slug,
    title: local.title,
    author: local.author,
    goodreadsId: local.goodreadsId,
    isbn: local.isbn,
    averageRating: local.averageRating,
    numPages: local.numPages,
    published: local.published,
    description: local.description,
    affiliateLink: local.affiliateLink,
    noteSlug: local.noteSlug,
    status,
    source: "manual",
  };

  return base;
};

const sortByDateRead = (books: MergedBook[]) =>
  [...books].sort((a, b) => {
    const dateA = a.dateRead ? new Date(a.dateRead).getTime() : 0;
    const dateB = b.dateRead ? new Date(b.dateRead).getTime() : 0;
    return dateB - dateA;
  });

export const getBooksData = async () => {
  const [currentReading, readShelf] = await Promise.all(
    GOODREADS_SHELVES.map(fetchShelf)
  );

  const localEntries = (await getCollection("books")).filter(entry => {
    if (entry.id.startsWith("archived/")) return false;
    if (entry.filePath && entry.filePath.includes("/archived/")) return false;
    return true;
  });
  const localBooks = localEntries.map(normalizeLocalBook);
  const unusedLocals = new Set(localBooks);

  const mergedCurrent = currentReading.map(book => {
    const override = localBooks.find(local => matchesLocal(book, local));
    if (override) unusedLocals.delete(override);
    return buildMergedBook(book, override);
  });

  const mergedRead = readShelf.map(book => {
    const override = localBooks.find(local => matchesLocal(book, local));
    if (override) unusedLocals.delete(override);
    return buildMergedBook(book, override);
  });

  const manualBooks = Array.from(unusedLocals).map(buildManualBook);

  const manualCurrent = manualBooks.filter(
    book => book.status === "currently-reading"
  );
  const manualRead = manualBooks.filter(
    book => book.status !== "currently-reading"
  );

  const allBooks = [...mergedCurrent, ...mergedRead, ...manualBooks];

  return {
    allBooks,
    currentReading: [...mergedCurrent, ...manualCurrent],
    read: sortByDateRead([...mergedRead, ...manualRead]),
  };
};
