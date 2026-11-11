import { LANG_KEY, storageSet } from "./storage.js";
import { applyCopy } from "./i18n.js";

export function initLangMenu() {
  const langTrigger = document.querySelector("[data-lang-trigger]");
  const langMenu = document.getElementById("lang-menu");
  if (!langTrigger || !langMenu) {
    console.error("prompt-atelier: missing language menu");
    return;
  }

  function placeLangMenu() {
    const rect = langTrigger.getBoundingClientRect();
    langMenu.style.top = rect.bottom + 6 + "px";
    langMenu.style.left = rect.left + "px";
    langMenu.style.width = rect.width + "px";
  }

  function setLangMenu(open) {
    langTrigger.setAttribute("aria-expanded", open ? "true" : "false");
    langMenu.hidden = !open;
    if (!open) {
      return;
    }
    placeLangMenu();
    const selected = langMenu.querySelector("[aria-selected='true']") || langMenu.querySelector("[data-lang]");
    if (selected) {
      selected.focus();
    }
  }

  langTrigger.addEventListener("click", function () {
    setLangMenu(langTrigger.getAttribute("aria-expanded") !== "true");
  });

  langMenu.addEventListener("click", function (event) {
    const button = event.target.closest("[data-lang]");
    if (!button || !langMenu.contains(button)) {
      return;
    }
    const next = button.getAttribute("data-lang");
    if (next !== "es" && next !== "en") {
      console.error("prompt-atelier: unknown language", next);
      return;
    }
    applyCopy(next);
    storageSet(LANG_KEY, next);
    setLangMenu(false);
    langTrigger.focus();
  });

  langMenu.addEventListener("keydown", function (event) {
    const options = Array.from(langMenu.querySelectorAll("[data-lang]"));
    const index = options.indexOf(document.activeElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      let next = index + step;
      if (next < 0) {
        next = options.length - 1;
      }
      if (next >= options.length) {
        next = 0;
      }
      options[next].focus();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setLangMenu(false);
      langTrigger.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (langTrigger.contains(event.target) || langMenu.contains(event.target)) {
      return;
    }
    setLangMenu(false);
  });

  window.addEventListener("resize", function () {
    if (langTrigger.getAttribute("aria-expanded") === "true") {
      placeLangMenu();
    }
  });

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.addEventListener("scroll", function () {
      setLangMenu(false);
    });
  }
}
