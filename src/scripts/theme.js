import { THEME_KEY, storageSet } from "./storage.js";
import { applyCopy, currentLang, currentTheme } from "./i18n.js";

function applyTheme(next) {
  if (next === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  applyCopy(currentLang());
}

export function initTheme() {
  const themeButton = document.querySelector("[data-theme-toggle]");
  if (!themeButton) {
    console.error("prompt-atelier: missing theme button");
    return;
  }

  themeButton.addEventListener("click", function () {
    const next = currentTheme() === "light" ? "dark" : "light";
    applyTheme(next);
    storageSet(THEME_KEY, next);
  });

  applyTheme(currentTheme());
}
