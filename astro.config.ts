import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
