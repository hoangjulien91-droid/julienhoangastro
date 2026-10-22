export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".wrangler/**",
      "node_modules/**",
      "public/**",
      "app_backup/**",
      "scripts/**",
      "**/*.ts",
      "**/*.tsx",
      "**/*.astro",
      "*.bak",
      "*.txt",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
