---
title: "Example note with all supported content types"
summary: "A formatting sandbox that demonstrates how every Markdown element renders on the notes layout."
pubDatetime: 2025-02-16T08:00:00Z
tags:
  - reference
  - writing
  - formatting
draft: false
timezone: "Europe/Paris"
---

## Purpose

Use this document as your **single source of truth** when you are not sure how a component should look once it is published.  
It includes every content pattern currently supported by our CMS and theme so bots and humans get perfectly structured notes.

## Headings & inline styles

### Sections

- Use `##` for top-level sections inside a note.
- `###` is perfect for subsections like this one.

You can combine *italic*, **bold**, and `inline code` freely. [Internal links](/notes/) or [external ones](https://astrodotbuild.com) work the same anywhere.

## Lists, checkboxes, and quotes

### Ordered

1. Introduce the idea.
2. Provide supporting detail.
3. Close with an action.

### Unordered

- Keep bullets short.
- Nest if you really must.
  - Like this quick sub-point.

### Task list

- [x] Show completed items.
- [ ] Leave upcoming work unchecked.

### Blockquote

> “A well-structured note is easier for readers *and* crawlers.”—Content Guidelines v2

### Callout (blockquote + bold title)

> **⚠️ Reminder:** Keep important warnings in a callout like this so they pop visually.

## Code & technical snippets

```bash
npm run dev
# Serves the local site with logging
```

```ts
export const formatNote = (title: string, tags: string[]) => ({
  title,
  tags: tags.map(tag => tag.toLowerCase()),
});
```

Inline values such as `ENVIRONMENT=production` should use backticks.

## Tables

| Field        | Required | Example                         |
| ------------ | -------- | ------------------------------- |
| `title`      | ✅       | Observability checklist         |
| `summary`    | ✅       | One sentence description        |
| `pubDatetime`| ✅       | `2025-02-16T08:00:00Z`          |
| `tags`       | ✅       | `["reference", "formatting"]`   |
| `timezone`   | Optional | `Europe/Paris`                  |

## Media

![A calm terminal window with AstroPaper palette](https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80)

Caption the image in the surrounding paragraph if you need extra context.

## Horizontal rule & footnotes

Use `---` to break long sections:

---

Footnotes are helpful for asides.[^ref]

[^ref]: Example footnote text that will appear at the bottom of the note.

## Final checklist

1. Metadata filled.
2. Tags chosen from the tag cloud vocabulary.
3. Proofread for clarity.

When all three boxes are ticked, the note is ready to publish.
