import { defineConfig } from "tsup";

const defaultOptions = defineConfig({
  dts: false,
  clean: true,
  splitting: true,
  outDir: "dist",
  format: ["esm"],
  target: "esnext",
  external: ["react", "react-dom"],
  platform: "browser",
});

export default defineConfig([{ ...defaultOptions, entry: ["src/index.ts"] }]);
