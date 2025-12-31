const BASE_URL_RAW = import.meta.env.BASE_URL ?? "/";
const BASE_URL = BASE_URL_RAW.endsWith("/") ? BASE_URL_RAW : `${BASE_URL_RAW}/`;

/**
 * Prefixes a path with Astro's configured base URL.
 * Ensures internal links work when the site is hosted on a subpath (e.g., GitHub Pages).
 */
export const withBase = (path = "/"): string => {
  if (!path || path === "/") {
    return BASE_URL;
  }

  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_URL}${normalized}`;
};
