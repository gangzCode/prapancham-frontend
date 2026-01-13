import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...compat.extends("prettier"), {
  files: ["**/*.{js,jsx,ts,tsx,mjs}"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "all",
        tabWidth: 2,
        semi: true,
        printWidth: 100,
        arrowParens: "always",
        endOfLine: "auto",
        jsxSingleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: false,
      },
    ],
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
  plugins: ["prettier"],
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}];

export default eslintConfig;
