export function initToc() {
  const scroller = document.querySelector("[data-scroller]");
  const toc = document.querySelector("[data-toc]");

  if (!scroller || !toc) {
    console.error("prompt-atelier: missing [data-scroller] or [data-toc]");
    return;
  }

  const links = Array.from(toc.querySelectorAll("a[href]"));

  function hrefOf(link) {
    return link.getAttribute("href") || "";
  }

  function hashId(href) {
    const mark = href.indexOf("#");
    return mark === -1 ? "" : href.slice(mark + 1);
  }

  function samePath(href) {
    const path = new URL(href, location.origin).pathname.replace(/\/$/, "") || "/";
    const here = location.pathname.replace(/\/$/, "") || "/";
    return path === here;
  }

  const sections = links.map(function (link) {
    const href = hrefOf(link);
    const id = hashId(href);
    if (!id || !samePath(href)) {
      return null;
    }
    return document.getElementById(id);
  }).filter(Boolean);

  let lockedId = null;
  let settleTimer = 0;

  function setActive(id) {
    links.forEach(function (link) {
      const href = hrefOf(link);
      const hash = hashId(href);
      const on = hash ? hash === id && samePath(href) : samePath(href);
      link.classList.toggle("is-active", on);
      if (on) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if (!sections.length) {
    setActive("");
    return;
  }

  function sectionAtTop() {
    const line = scroller.getBoundingClientRect().top + 72;
    let current = sections[0].id;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) {
        current = section.id;
      }
    });
    return current;
  }

  function updateFromScroll() {
    setActive(lockedId || sectionAtTop());
  }

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollToSection(section) {
    section.scrollIntoView({
      behavior: reduceMotion() ? "auto" : "smooth",
      block: "start"
    });
  }

  function lockTo(id) {
    lockedId = id;
    setActive(id);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      lockedId = null;
      updateFromScroll();
    }, reduceMotion() ? 50 : 1200);
  }

  scroller.addEventListener("scroll", function () {
    if (!lockedId) {
      updateFromScroll();
      return;
    }
    setActive(lockedId);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      lockedId = null;
      updateFromScroll();
    }, 120);
  }, { passive: true });

  toc.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (!link || !toc.contains(link)) {
      return;
    }
    const href = hrefOf(link);
    const id = hashId(href);
    const section = id && samePath(href) ? document.getElementById(id) : null;
    if (!section) {
      return;
    }
    event.preventDefault();
    history.pushState(null, "", "/#" + id);
    lockTo(id);
    scrollToSection(section);
  });

  updateFromScroll();

  const initial = location.hash.slice(1);
  if (initial && document.getElementById(initial)) {
    lockTo(initial);
    requestAnimationFrame(function () {
      scrollToSection(document.getElementById(initial));
    });
  }
}
