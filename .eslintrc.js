module.exports = {
  env: {
    browser: true, // Browser global variables like `window` etc.
    commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
    es6: true, // Enable all ECMAScript 6 features except for modules.
    jest: true, // Jest global variables like `it` etc.
    node: true, // Defines things like process.env when generating through node
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react",
    "plugin:react/jsx-runtime",
  ],
  parser: "babel-eslint", // Uses babel-eslint transforms.
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: [
    "import", // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
  ],
  root: true, // For configuration cascading.
  rules: {
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
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: ["builtin", "external", "index", "sibling", "parent", "internal"],
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
    "no-unused-vars": "warn",
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
    "sort-keys": [
      "warn",
      "asc",
      {
        caseSensitive: true,
        minKeys: 2,
        natural: false,
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    },
  },
};
