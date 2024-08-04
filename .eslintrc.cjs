// Flat configs are cool but will be using a legacy config for this project
/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  ignorePatterns: [
    ".DS_Store",
    "node_modules",
    "/build",
    "/package",
    ".env",
    ".env.*",
    "!.env.example",

    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
  ],
  plugins: ["import", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:svelte/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "svelte/valid-compile": "warn",
      },
    },
  ],
}
