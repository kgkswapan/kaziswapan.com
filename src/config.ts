export const SITE = {
  website: "https://kaziswapan.com",
  author: "Kazi Gulam Kadar",
  profile: "https://www.linkedin.com/in/kgkswapan/",
  desc: "Portfolio, projects, and notes from technologist-investor Kazi Gulam Kadar.",
  title: "Kazi G. Kadar",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 3,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/kgkswapan/kaziswapan.com/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Kolkata", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
