import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "../wwwroot/dist"),
    emptyOutDir: false,
    lib: {
      entry: {
        "house-viewer": resolve(__dirname, "src/main.ts"),
        "site": resolve(__dirname, "src/site.ts"),
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
  },
});
