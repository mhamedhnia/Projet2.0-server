const fs = require('fs');
const path = require('path');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  env: {
    node: true,
    jest: true,
    es6: true,
    mongo: true
  },
  extends: ['airbnb-base', 'plugin:security/recommended', 'plugin:prettier/recommended'],
  plugins: ['security', 'prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'no-console': 'error',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'jest/expect-expect': 'off',
    'security/detect-object-injection': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', ['external', 'internal'], ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    'no-param-reassign': 'off'
  }
};
