module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:mdx/recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/prop-types": 0,
    "prettier/prettier": ["error"],
  },
};
