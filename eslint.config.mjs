// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";

export default [
  js.configs.recommended,
  nextPlugin.flatConfig.coreWebVitals,
  reactPlugin.configs.flat.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off"
    },
    settings: { react: { version: "detect" } }
  }
];
