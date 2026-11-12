# Prompt Atelier

A prompt engineering roadmap as a static site: anatomy, techniques, patterns, software, agents, and method, with before/after examples and a skill for reviewing prompts.

Astro generates plain HTML, CSS, and JavaScript. There is no React or other UI framework.

## Requirements

- Node.js 18.20.8, 20.3 or later, or 22 or later (what Astro 5 requires)
- pnpm 11 (`packageManager` pins `pnpm@11.20.0`)

## Commands

```bash
pnpm install     # installs dependencies and approves the build scripts
pnpm dev         # dev server at http://localhost:4321/
pnpm build       # builds the static site into dist/
pnpm preview     # serves dist/ to check the build
```

Vite runs inside Astro. `astro.config.mjs` sets the port to 4321 and enables build sourcemaps. There is no separate Vite app.

## Pages

| Route | Content |
| --- | --- |
| `/` | The guide: Start and phases 01 to 06 (Method) |
| `/ejemplos` | One prompt for each piece of the guide, plus the before/after pair |
| `/skill` | The `revise-prompt` skill applied to the weak architecture prompt |

The sidebar links to all three routes. On `/`, scrolling marks the section at the top.

## Deployment (Cloudflare Pages)

Este proyecto es un sitio estático de Astro y puede desplegarse en Cloudflare Pages.

### Opción A: Desde el dashboard de Cloudflare (recomendado)

1. Sube el repositorio a GitHub/GitLab (o usa *Direct Upload* si prefieres no conectar un repo).
2. En Cloudflare, ve a **Workers & Pages → Create → Pages → Connect to Git** y selecciona el repositorio.
3. Configura el build:
   - **Framework preset:** `Astro`
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Root directory:** `prompt-atelier` (si el repositorio contiene esta carpeta como subdirectorio; si el repo raíz ya es este proyecto, déjalo vacío)
4. Configura la versión de Node si es necesario (por ejemplo, variable de entorno `NODE_VERSION=22`).
5. Haz clic en **Save and Deploy**. Cloudflare generará una URL `*.pages.dev`.

### Opción B: Con Wrangler (CLI)

1. Instala Wrangler y autentícate:
   ```bash
   pnpm add -D wrangler
   pnpm exec wrangler login
   ```
2. Construye el proyecto:
   ```bash
   pnpm build
   ```
3. Despliega el contenido de `dist/`:
   ```bash
   pnpm exec wrangler pages deploy dist --project-name prompt-atelier
   ```
4. Para despliegues posteriores, repite `pnpm build` y el comando `wrangler pages deploy`.

## Structure

```
src/
  pages/        one page per route: index, ejemplos, skill
  layouts/      Base.astro (head, theme, scripts) and Guide.astro (sidebar + content)
  components/   one section per component: Hero, Phase*, Method, Examples, Skill, Sidebar, Footer
  scripts/      browser JavaScript: i18n, theme, lang-menu, toc, storage, site
  styles/       global.css: color tokens, typography, and components
.cursor/skills/
  revise-prompt/   skill for reviewing and correcting prompts (SKILL.md and examples.md)
```

`site.js` initializes the language, theme, language menu, and sidebar. `toc.js` marks the active section with a scroll listener, not IntersectionObserver.

## Language

The Spanish copy is the source text, inside each component with `data-i18n`. The English copy lives in one dictionary in `src/scripts/i18n.js`. When you add new text, add its key on both sides. Nothing checks automatically that a key is missing.

The language choice is saved in `localStorage` under `prompt-atelier-lang`.

## Theme

Dark mode is the default. The moon and sun button sets `data-theme` on `<html>`. The light theme overrides only the color tokens in `global.css`. The choice is saved under `prompt-atelier-theme`. An inline script in `Base.astro` applies it before the first render, so the page does not flash.

## Skill: revise-prompt

`.cursor/skills/revise-prompt/SKILL.md` reviews a prompt against the guide's phases. It has three modes:

- Review only: returns a verdict and gaps, without rewriting.
- Correct: returns the prompt ready to paste.
- Split: if the draft does more than one job, it breaks it into a pipeline.

`examples.md` has before and after examples. The skill lives in the repo, so Cursor loads it when you open this project.

## Notes

- `pnpm-workspace.yaml` approves the build scripts for `esbuild` and `sharp`. Without that list, pnpm 11 blocks `pnpm dev` and `pnpm build`.
- Fonts load from Google Fonts in `Base.astro`: Fraunces, Inter, and JetBrains Mono.
