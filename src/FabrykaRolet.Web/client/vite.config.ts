import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "../wwwroot/dist"),
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "FabrykaRoletHouseViewer",
      formats: ["es"],
      fileName: () => "house-viewer.js",
    },
  },
});
