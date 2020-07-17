module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["no-autofix"],
  extends: [
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "react/prop-types": [0],
    "@typescript-eslint/ban-ts-ignore": [1],
    "arrow-body-style": ["warn", "as-needed"],
    "react/no-unescaped-entities": [0],
    "react/self-closing-comp": [1]
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
