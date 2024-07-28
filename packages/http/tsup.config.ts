import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  clean: true,
  dts: true,
  sourcemap: true,
  outDir: "dist",
  format: ["esm"],
  target: "esnext",
});
