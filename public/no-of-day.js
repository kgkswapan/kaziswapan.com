const initNoOfDay = () => {
  const noSection = document.querySelector("[data-no-of-day]");
  const noDataEl = document.getElementById("no-data");
  if (!noSection || !noDataEl || !noDataEl.textContent) return;

  let noData;
  try {
    noData = JSON.parse(noDataEl.textContent);
  } catch {
    return;
  }

  if (!Array.isArray(noData) || noData.length === 0) return;

  const picked = noData[Math.floor(Math.random() * noData.length)];
  if (!picked) return;

  const textEl = noSection.querySelector("[data-no-reason]");
  if (textEl) textEl.textContent = picked;
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNoOfDay);
} else {
  initNoOfDay();
}

document.addEventListener("astro:after-swap", initNoOfDay);
