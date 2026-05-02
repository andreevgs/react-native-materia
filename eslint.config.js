const reactNativeConfig = require("@react-native/eslint-config/flat");

module.exports = [
  {
    ignores: [
      "eslint.config.js",
      "node_modules/",
      "lib/",
      "example/.expo/",
      "example/node_modules/",
      "example/dist/",
      "example/web-build/",
      "**/*.d.ts",
      "example/expo-env.d.ts",
    ],
  },

  ...reactNativeConfig,

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        requireConfigFile: false,
      },
    },
    rules: {
      "react-native/no-inline-styles": "off",
    },
  },
];
