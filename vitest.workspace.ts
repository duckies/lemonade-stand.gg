import { configDefaults, defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["**/*.test.ts"],
      exclude: [...configDefaults.exclude, "**/*.browser.test.ts"],
    },
  },
  {
    test: {
      name: "dom",
      include: ["**/*.browser.test.ts"],
      environment: "happy-dom",
    },
  },
]);
