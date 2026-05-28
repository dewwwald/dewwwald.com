const angular = require('angular-eslint');

const tsFiles = ['src/**/*.ts'];
const templateFiles = ['src/**/*.html'];

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'src/app/**'],
  },
  ...angular.configs.tsRecommended.map((config) => ({
    ...config,
    files: tsFiles,
  })),
  {
    files: tsFiles,
    processor: angular.processInlineTemplates,
    rules: {},
  },
  ...angular.configs.templateRecommended.map((config) => ({
    ...config,
    files: templateFiles,
  })),
];
