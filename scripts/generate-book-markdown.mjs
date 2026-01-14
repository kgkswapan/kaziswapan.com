import fs from "node:fs/promises";
import path from "node:path";
import kebabCase from "lodash.kebabcase";

const GOODREADS_USER_ID = "55613653";
const SHELVES = ["read", "currently-reading"];
const BOOKS_DIR = path.join(process.cwd(), "src", "content", "books");

const stripCdata = value =>
  value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1").trim();

const extractTag = (item, tag) => {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? stripCdata(match[1]) : "";
};

const toSlug = ({ title, author, goodreadsId }) => {
  const base = [title, author].filter(Boolean).join(" ");
  const slug = kebabCase(base);
  return goodreadsId ? `${slug}-${goodreadsId}` : slug;
};

const toNumber = value => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const toInt = value => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const quote = value => {
  const normalized = String(value ?? "");
  const escaped = normalized.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}"`;
};

const indentBlock = value =>
  value
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map(line => `  ${line}`)
    .join("\n");

const parseExistingFrontmatter = content => {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const frontmatter = match[1];

  const findValue = key => {
    const lineMatch = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, "m"));
    if (!lineMatch) return undefined;
    const raw = lineMatch[1].trim();
    if (!raw) return "";
    const unquoted = raw.replace(/^"(.*)"$/, "$1");
    return unquoted.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  };

  return {
    goodreadsId: findValue("goodreadsId"),
    isbn: findValue("isbn"),
    affiliateLink: findValue("affiliateLink"),
    noteSlug: findValue("noteSlug"),
  };
};

const fetchShelf = async shelf => {
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

  if (!response.ok) {
    throw new Error(`Failed to fetch shelf ${shelf}: ${response.status}`);
  }

  const xml = await response.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.reduce((acc, item) => {
    const title = extractTag(item, "title");
    const author = extractTag(item, "author_name");
    const goodreadsId = extractTag(item, "book_id");
    const image = extractTag(item, "book_image_url");
    const isbn = extractTag(item, "isbn");
    const averageRating = toNumber(extractTag(item, "average_rating"));
    const numPages = toInt(extractTag(item, "num_pages"));
    const published = extractTag(item, "book_published");
    const description = extractTag(item, "book_description");

    if (!title || !author) return acc;

    acc.push({
      title,
      author,
      goodreadsId: goodreadsId || undefined,
      image: image || undefined,
      isbn: isbn || undefined,
      averageRating,
      numPages,
      published: published || undefined,
      description: description || undefined,
      status: shelf,
    });

    return acc;
  }, []);
};

const loadExistingEntries = async () => {
  const entries = new Map();
  const byId = new Map();
  const byIsbn = new Map();
  const bySlug = new Map();

  let files = [];
  try {
    files = await fs.readdir(BOOKS_DIR);
  } catch {
    return { entries, byId, byIsbn, bySlug };
  }

  await Promise.all(
    files
      .filter(name => name.endsWith(".md"))
      .map(async fileName => {
        const filePath = path.join(BOOKS_DIR, fileName);
        const content = await fs.readFile(filePath, "utf8");
        const meta = parseExistingFrontmatter(content);
        const slug = path.basename(fileName, ".md");
        const entry = { filePath, slug, ...meta };
        entries.set(filePath, entry);
        if (meta.goodreadsId) byId.set(meta.goodreadsId, entry);
        if (meta.isbn) byIsbn.set(meta.isbn, entry);
        bySlug.set(slug, entry);
      })
  );

  return { entries, byId, byIsbn, bySlug };
};

const buildFrontmatter = (book, overrides) => {
  const lines = ["---"];
  lines.push(`title: ${quote(book.title)}`);
  lines.push(`author: ${quote(book.author)}`);
  lines.push(`status: ${quote(book.status)}`);
  if (book.goodreadsId) lines.push(`goodreadsId: ${quote(book.goodreadsId)}`);
  if (book.isbn) lines.push(`isbn: ${quote(book.isbn)}`);
  if (typeof book.averageRating === "number") {
    lines.push(`averageRating: ${book.averageRating.toFixed(2)}`);
  }
  if (typeof book.numPages === "number") {
    lines.push(`numPages: ${book.numPages}`);
  }
  if (book.published) lines.push(`published: ${quote(book.published)}`);

  const affiliateLink = overrides?.affiliateLink ?? "";
  const noteSlug = overrides?.noteSlug ?? "";
  lines.push(`affiliateLink: ${quote(affiliateLink)}`);
  lines.push(`noteSlug: ${quote(noteSlug)}`);

  if (book.description) {
    lines.push("description: |");
    lines.push(indentBlock(book.description));
  }

  lines.push("---", "");
  return lines.join("\n");
};

const main = async () => {
  await fs.mkdir(BOOKS_DIR, { recursive: true });
  const existing = await loadExistingEntries();

  const shelfEntries = [];
  for (const shelf of SHELVES) {
    const books = await fetchShelf(shelf);
    books.forEach(book => {
      shelfEntries.push({ ...book, status: shelf });
    });
  }

  const deduped = new Map();
  shelfEntries.forEach(book => {
    const key =
      book.goodreadsId || book.isbn || toSlug({ title: book.title, author: book.author });
    deduped.set(key, book);
  });

  let created = 0;
  let updated = 0;
  let renamed = 0;

  for (const book of deduped.values()) {
    const slug = toSlug(book);
    const targetPath = path.join(BOOKS_DIR, `${slug}.md`);
    const existingEntry =
      (book.goodreadsId && existing.byId.get(book.goodreadsId)) ||
      (book.isbn && existing.byIsbn.get(book.isbn)) ||
      existing.bySlug.get(slug);

    if (existingEntry && existingEntry.filePath !== targetPath) {
      try {
        await fs.rename(existingEntry.filePath, targetPath);
        renamed += 1;
      } catch {
        // If rename fails, continue with writing to target path.
      }
    }

    const overrides = existingEntry
      ? {
          affiliateLink: existingEntry.affiliateLink,
          noteSlug: existingEntry.noteSlug,
        }
      : undefined;

    const body = buildFrontmatter(book, overrides);
    const existed = await fs
      .access(targetPath)
      .then(() => true)
      .catch(() => false);
    await fs.writeFile(targetPath, body, "utf8");
    if (existed) {
      updated += 1;
    } else {
      created += 1;
    }
  }

  process.stdout.write(
    `Books generated: ${created} created, ${updated} updated, ${renamed} renamed.\n`
  );
};

main().catch(error => {
  process.stderr.write(`${error}\n`);
  process.exit(1);
});
