import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import a11y from "eslint-plugin-jsx-a11y";
import node from "eslint-plugin-n";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactPerf from "eslint-plugin-react-perf";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import ts, { config as defineConfig } from "typescript-eslint";

export default defineConfig([
  eslint.configs.recommended,
  ts.configs.strictTypeChecked,
  node.configs["flat/recommended"],
  unicorn.configs.recommended,
  perfectionist.configs["recommended-alphabetical"],
  {
    ...react.configs.flat.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  react.configs.flat.recommended,
  reactPerf.configs.flat.recommended,
  a11y.flatConfigs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
    }
  },
])