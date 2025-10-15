/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  plugins: [
    "@prettier/plugin-oxc", // should be first
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-packagejson",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
  ],

  // General config
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  printWidth: 120,

  // astro
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],

  // prettier-plugin-sort-imports
  importOrderTypeScriptVersion: "5.6.3",

  // Tailwind
  tailwindStylesheet: "./src/styles/globals.css",
  tailwindFunctions: ["clsx", "cva", "cn"],
}

export default config
