import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": "error", // Afficher les erreurs de Prettier
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },
];
