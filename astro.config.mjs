import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://abdielfco.github.io",
  base: "/prompt-atelier/",
  vite: {
    server: {
      port: 4321,
    },
    build: {
      sourcemap: true,
    },
  },
});
