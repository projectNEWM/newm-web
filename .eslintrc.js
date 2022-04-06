module.exports = {
  env: {
    // Browser global variables like `window` etc.
    browser: true,
    // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    commonjs: true,
    // Enable all ECMAScript 6 features except for modules.
    es6: true,
    // Jest global variables like `it` etc.
    jest: true,
    // Defines things like process.env when generating through node
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "plugin:react/jsx-runtime",
    "plugin:storybook/recommended",
  ],
  ignorePatterns: ["src/assets/*"],
  // Uses babel-eslint transforms.
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: "module",
  },
  // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
  plugins: ["import", "@typescript-eslint"],
  // For configuration cascading.
  root: true,
  rules: {
    "testing-library/prefer-screen-queries": 0,
    "jsx-a11y/no-autofocus": 0,
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        exports: "only-multiline",
        functions: "never",
        imports: "only-multiline",
        objects: "only-multiline",
      },
    ],
    "eol-last": "error",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "index",
          "sibling",
          "parent",
          "internal",
        ],
      },
    ],
    "jsx-quotes": ["warn", "prefer-double"],
    "max-len": [
      "warn",
      {
        code: 120,
      },
    ],
    "no-console": "warn",
    "no-duplicate-imports": "warn",
    "no-unused-vars": "off",
    "object-curly-spacing": ["warn", "always"],
    quotes: ["warn", "double"],
    "react/jsx-curly-spacing": [
      "warn",
      {
        allowMultiline: true,
        children: {
          when: "always",
        },
        spacing: {
          objectLiterals: "always",
        },
        when: "always",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react/prop-types": "warn",
    semi: "warn",
    "sort-imports": [
      "warn",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
  },
  settings: {
    react: {
      // Detect react version
      version: "detect",
    },
  },
};
