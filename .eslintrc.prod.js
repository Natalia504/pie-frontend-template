const defaultConfig = require("./.eslintrc.js");

module.exports = {
  ...defaultConfig,
  rules: {
    ...defaultConfig.rules,
    "@typescript-eslint/no-unused-vars": ["error"]
  }
};
