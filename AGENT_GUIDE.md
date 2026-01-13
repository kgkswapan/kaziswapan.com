# AI Agent Guide

This document gives new contributors (human or AI) an immediate understanding of the project, its structure, and the expectations for making changes.

## Project Overview

- **Framework**: Astro (v5) with Tailwind-powered styles from AstroPaper.
- **Content Collections**:
  - `notes`: Markdown files in `src/content/notes/` using frontmatter `{ title, summary, pubDatetime, tags, draft?, timezone? }`. Notes feed the `/notes` listing, note cards, tag cloud, and note detail pages.
  - `projects`: Markdown files in `src/content/projects/` using frontmatter `{ title, summary, tech, link?, ssrn?, category, noteTag?, featured? }`. Projects feed the `/projects` listing and individual project detail pages.
  - `quotes`: Markdown files in `src/content/quotes/` using frontmatter `{ quote, author, source?, tags? }`. Quotes feed the `/quotes` listing and the home page quote-of-the-day.
- **Key Pages**:
  - `src/pages/index.astro`: Home page with hero, featured projects (filtered by `featured` flag, alphabetical), recent notes (latest 4), and contact CTA.
  - `src/pages/notes/[...page].astro`: Paginated notes listing with tag filtering and inline search.
  - `src/pages/notes/[slug].astro`: Note detail page using `NoteDetails` layout.
  - `src/pages/projects/index.astro`: Groups projects by category (alphabetical) and renders cards.
  - `src/pages/projects/[slug].astro`: Project detail page that also shows related notes if `noteTag` is provided.
  - `src/pages/about.astro`: About page with CTA buttons (LinkedIn + Contact).
  - `src/pages/quotes/[...page].astro`: Quotes listing (10 per page) with card layout.
  - `src/pages/no.astro`: No‑as‑a‑service page that renders a random refusal.
  - `src/pages/books/index.astro`: Goodreads shelf page (currently-reading + read) with infinite scroll for recent reads.
- **Components**: `NoteCard`, `ProjectCard`, `LinkButton`, `SearchInline`, etc. Reuse these for consistency.
  - Header navigation groups “Quotes”, “Books I am reading”, and “No‑as‑a‑Service” under “Resources”.

## Commands

| Task | Command |
| --- | --- |
| Install deps | `npm install` |
| Dev server | `npm run dev` |
| Build + Pagefind | `npm run build` |
| Format | `npm run format` |
| Lint | `npm run lint` |

Before pushing, run `npm run build` to ensure Astro compiles and Pagefind indexes.

## Workflow Expectations

1. **No secrets** – repository is public; never commit API keys or private content.
2. **Match existing design** – use provided components and classes (`section-unstyled`, `NoteCard`, etc.).
3. **Validate frontmatter** – keep schemas in `src/content.config.ts` in sync with markdown files.
4. **Short iteration** – check `git status -sb` frequently; avoid bundling unrelated changes.
5. **Document behavior** – update README/SECURITY/guide notes when workflows change.

## PR Checklist

- [ ] `npm run build` passes locally.
- [ ] No lint/format errors.
- [ ] Screenshots or descriptions provided for UI updates.
- [ ] No secrets/personal data in diff.
- [ ] Tests or manual steps documented for complex features.

## Deployment

- Site deploys automatically from `main` to GitHub Pages.
- Use semantic commits when possible; significant milestones should be tagged (e.g., `v1.0.0`).

## Contact / Questions

If unsure, open a discussion/issue or email `kazi.swapan@gmail.com`.
