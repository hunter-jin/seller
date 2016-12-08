module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // 开发阶段允许debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 行尾分号
    'semi': ['error', 'always'],
    // 4个空格缩进
    "indent": ["error", 2],
    // 函数括号前空格
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "ignore",
        "asyncArrow": "ignore"
    }]
  }
}
