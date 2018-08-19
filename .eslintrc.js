const path = require('path');
module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['redux-saga', 'react', 'jsx-a11y'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'consistent-return': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'arrow-body-style': 0,
    'jsx-a11y/media-has-caption': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'internals/webpack/webpack.prod.babel.js'),
      },
    },
  },
};
