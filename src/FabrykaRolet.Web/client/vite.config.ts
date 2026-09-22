import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: resolve(__dirname, "../wwwroot/dist"),
    emptyOutDir: false,
    lib: {
      entry: {
        "house-viewer": resolve(__dirname, "src/main.ts"),
        "site": resolve(__dirname, "src/site.ts"),
        "tailwind": resolve(__dirname, "src/tailwind-entry.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "tailwind.css",
      },
    },
  },
});
