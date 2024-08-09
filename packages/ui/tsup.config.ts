import { type Options, defineConfig } from "tsup";

const commonConfig = {
  clean: true,
  dts: false,
  splitting: true,
  outDir: "dist",
  format: ["esm"],
  target: "esnext",
} satisfies Options;

export default defineConfig([
  {
    ...commonConfig,
    entry: ["src/components/**/!(index).ts?(x)", "src/utils/!(index).ts?(x)"],
  },
  {
    ...commonConfig,
    entry: ["src/index.ts"],
    bundle: false,
  },
]);
