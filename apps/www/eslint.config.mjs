import { FlatCompat } from "@eslint/eslintrc";
import lemon from "@lemonade-stand/eslint-config";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...lemon,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    settings: {
      react: {
        version: "detect",
      }
    }
  }
]