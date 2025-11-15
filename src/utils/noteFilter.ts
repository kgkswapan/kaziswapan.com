import type { CollectionEntry } from "astro:content";

const noteFilter = ({ data }: CollectionEntry<"notes">) => {
  const isPublishTimePassed =
    Date.now() > new Date(data.pubDatetime).getTime();

  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default noteFilter;
