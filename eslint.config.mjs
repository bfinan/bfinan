// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  ...next(),
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } }
  }
];
