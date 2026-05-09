import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),

    babel({
      presets: [reactCompilerPreset()],
    }),

    sitemap({
      hostname: "https://rseducationsolution.in",

      dynamicRoutes: [
        "/",
        "/find-college",
        "/programs",
        "/services",
        "/Ai-tools",
        "/contact",
        "/terms",
        "/privacy",
        "/disclaimer",
      ],
    }),
  ],
});