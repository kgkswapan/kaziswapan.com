# kaziswapan.com

Personal website for **Kazi Gulam Kadar** showcasing trading-infrastructure projects, automation work, and long-form notes. Built with Astro & Tailwind, deployed to GitHub Pages.

## Features

- Projects index grouped by category (markdown-driven)
- Project detail pages with related-notes section
- Notes index with tag filters, inline search, and pagination
- Contact + About calls-to-action
- Fully responsive, light/dark theme ready

## Content Structure

```
src/
 ├─ content/
 │   ├─ notes/        # markdown notes (frontmatter: title, summary, pubDatetime, tags, ...)
 │   └─ projects/     # markdown projects (title, summary, tech, link?, ssrn?, category, noteTag?, featured?)
 ├─ components/       # cards, buttons, search, etc.
 ├─ pages/            # Astro routes (home, notes, projects, about, contact)
 └─ utils/            # helpers (sorting, slug helpers)
```

Notes and projects are empty by default—add your real content as Markdown files under `src/content/...`. Follow the schemas in `src/content.config.ts`.

## Local Development

```bash
npm install
npm run dev
```

Visit <http://localhost:4321>. Use `npm run build` before committing to ensure Astro + Pagefind succeed.

## Deployment

- The `main` branch deploys automatically to GitHub Pages.
- Tags mark milestones (`v1.0.0`).

## Security & Contribution

- See [`SECURITY.md`](SECURITY.md) for reporting instructions and safe-handling guidelines.
- New contributors/agents should read [`AGENT_GUIDE.md`](project-docs/AGENT_GUIDE.md) for commands and workflow expectations.

## License

MIT.
