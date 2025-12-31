const initQuoteOfDay = () => {
  const quoteSection = document.querySelector("[data-quote-of-day]");
  const quoteDataEl = document.getElementById("quote-data");
  if (!quoteSection || !quoteDataEl || !quoteDataEl.textContent) return;

  let quoteData;
  try {
    quoteData = JSON.parse(quoteDataEl.textContent);
  } catch {
    return;
  }

  if (!Array.isArray(quoteData) || quoteData.length === 0) return;

  const picked = quoteData[Math.floor(Math.random() * quoteData.length)];
  if (!picked) return;

  const textEl = quoteSection.querySelector("[data-quote-text]");
  const authorEl = quoteSection.querySelector("[data-quote-author]");
  const sourceEl = quoteSection.querySelector("[data-quote-source]");

  if (textEl) textEl.textContent = picked.quote || "";
  if (authorEl) authorEl.textContent = picked.author || "";
  if (sourceEl) {
    if (picked.source) {
      sourceEl.textContent = picked.source;
      sourceEl.classList.remove("hidden");
    } else {
      sourceEl.textContent = "";
      sourceEl.classList.add("hidden");
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuoteOfDay);
} else {
  initQuoteOfDay();
}

document.addEventListener("astro:after-swap", initQuoteOfDay);
