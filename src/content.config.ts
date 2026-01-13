import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
export const NOTES_PATH = "src/content/notes";

const notes = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: `./${NOTES_PATH}`,
  }),
  schema: () =>
    z.object({
      title: z.string(),
      summary: z.string(),
      pubDatetime: z.date(),
      tags: z.array(z.string()).default(["notes"]),
      draft: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: () =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        tech: z.string().optional(),
        link: z.string().url().optional(),
        ssrn: z.string().url().optional(),
        category: z.string(),
        featured: z.boolean().optional(),
        noteTag: z.string().optional(),
      })
      .passthrough(),
});

const quotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/quotes" }),
  schema: () =>
    z.object({
      quote: z.string(),
      author: z.string(),
      source: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: () =>
    z.object({
      title: z.string(),
      author: z.string(),
      slug: z.string().optional(),
      status: z.enum(["read", "currently-reading", "manual"]).optional(),
      goodreadsId: z.string().optional(),
      goodreadsLink: z.string().url().optional(),
      isbn: z.string().optional(),
      amazonAsin: z.string().optional(),
      affiliateLink: z.string().url().optional(),
      noteSlug: z.string().optional(),
      coverUrl: z.string().url().optional(),
      description: z.string().optional(),
    }),
});

export const collections = { notes, projects, quotes, books };
