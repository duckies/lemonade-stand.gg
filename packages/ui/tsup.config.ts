import { type Options, defineConfig } from "tsup";

const commonConfig = {
  clean: true,
  dts: true,
  // I don't think this works 😭
  // sourcemap: true,
  outDir: "dist",
  format: ["esm"],
  target: "esnext",
} satisfies Options;

export default defineConfig([
  {
    ...commonConfig,
    entry: ["src/components/!(index).ts?(x)", "src/utils/!(index).ts?(x)"],
  },
  {
    ...commonConfig,
    entry: ["src/index.ts", "src/utils/index.ts"],
    bundle: false,
  },
]);
