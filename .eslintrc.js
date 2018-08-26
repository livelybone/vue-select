module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue'
  ],
  'extends': ['plugin:vue/essential', 'airbnb-base'],
  rules: {
    // allow debugger during development
    'quote-props': [2, 'consistent'],
    'import/prefer-default-export': [0],
    'linebreak-style': 'off',
    'global-require': 'off',
    'object-shorthand': [2, 'always', { avoidQuotes: false }],
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-mixed-operators':'off',
  },
};