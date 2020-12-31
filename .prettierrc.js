module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  arrowParens: 'always',
  printWidth: 80,
  overrides: [
    {
      files: '*.md',
      options: {
        printWidth: 60,
      },
    },
  ],
}
