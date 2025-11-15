import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const NOTES_PATH = "src/content/notes";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

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
    z.object({
      title: z.string(),
      summary: z.string(),
      tech: z.string(),
      link: z.string().url().optional(),
      ssrn: z.string().url().optional(),
      category: z.string(),
      featured: z.boolean().optional(),
      noteTag: z.string().optional(),
    }),
});

export const collections = { blog, notes, projects };
