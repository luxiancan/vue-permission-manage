// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // js 中强制使用单引号
    'quotes': ['error', 'single'],
    // js 语句强制使用分号结尾
    'semi': ['warn', 'always'],
    // 强制使用 4 个空格缩进
    'indent': ['warn', 4],
    // 强制在对象和数组字面量中使用一致的拖尾逗号。允许（但不要求）使用拖尾逗号
    'comma-dangle': ['error', 'only-multiline'],
    // 禁止在函数括号之前有空格 禁止 ( 前面有空格。
    'space-before-function-paren': ['warn', 'never'],
  }
}
