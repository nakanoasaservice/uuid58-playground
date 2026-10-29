import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/**", "server/**", "tmp/**", ".serena/**"] },
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
];
