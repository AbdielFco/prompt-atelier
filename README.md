# Prompt Atelier

Roadmap de ingeniería de prompts en un sitio estático: anatomía, técnicas, patrones, software, agentes y método, con ejemplos de antes y después y una skill para revisar prompts.

Astro genera HTML, CSS y JavaScript estáticos. No hay React ni otro framework de UI.

## Requisitos

- Node.js 18.20.8, 20.3 o superior, o 22 o superior (lo que exige Astro 5)
- pnpm 11 (`packageManager` fija `pnpm@11.20.0`)

## Comandos

```bash
pnpm install     # instala dependencias y aprueba los scripts de build
pnpm dev         # servidor de desarrollo en http://localhost:4321
pnpm build       # genera el sitio estático en dist/
pnpm preview     # sirve dist/ para revisar el build
```

Vite va dentro de Astro. `astro.config.mjs` fija el puerto 4321 y los sourcemaps del build. No hay una app de Vite aparte.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Guía: Inicio y fases 01 a 06 (Método) |
| `/ejemplos` | Un prompt por cada pieza de la guía, más el antes y después |
| `/skill` | La skill `revise-prompt` aplicada al prompt débil de arquitectura |

La barra lateral lleva a las tres rutas. En `/` el scroll marca la sección que queda arriba.

## Estructura

```
src/
  pages/        una página por ruta: index, ejemplos, skill
  layouts/      Base.astro (head, tema, scripts) y Guide.astro (barra + contenido)
  components/   una sección por componente: Hero, Phase*, Method, Examples, Skill, Sidebar, Footer
  scripts/      JavaScript del navegador: i18n, theme, lang-menu, toc, storage, site
  styles/       global.css: tokens de color, tipografía y componentes
.cursor/skills/
  revise-prompt/   skill para revisar y corregir prompts (SKILL.md y examples.md)
```

`site.js` inicializa idioma, tema, menú de idioma y la barra lateral. `toc.js` marca la sección activa con un listener de scroll, sin IntersectionObserver.

## Idioma

El español es el texto fuente, dentro de cada componente con `data-i18n`. El inglés está en `src/scripts/i18n.js`, en un solo diccionario. Si agregas texto nuevo, agrega su clave en los dos lados: `i18n.js` la usa para traducir, y no hay chequeo automático que avise si falta.

La elección de idioma se guarda en `localStorage` con la clave `prompt-atelier-lang`.

## Tema

Modo oscuro por defecto. El botón de luna y sol cambia `data-theme` en `<html>`. El tema claro sobrescribe solo los tokens de color en `global.css`. La elección se guarda con la clave `prompt-atelier-theme`, y un script inline en `Base.astro` la aplica antes del primer render para evitar un parpadeo.

## Skill: revise-prompt

`.cursor/skills/revise-prompt/SKILL.md` revisa un prompt contra las fases de la guía. Tiene tres modos:

- Solo revisar: devuelve veredicto y huecos, sin reescribir.
- Corregir: devuelve el prompt listo para pegar.
- Partir: si el borrador hace más de un trabajo, lo divide en un pipeline.

`examples.md` tiene antes y después. La skill vive en el repo, así que Cursor la carga al abrir este proyecto.

## Notas

- `pnpm-workspace.yaml` aprueba los scripts de build de `esbuild` y `sharp`. Sin esa lista, pnpm 11 bloquea `pnpm dev` y `pnpm build`.
- Las fuentes se cargan desde Google Fonts en `Base.astro`: Fraunces, Inter y JetBrains Mono.
