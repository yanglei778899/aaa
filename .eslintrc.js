module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components':'off',
    "vue/multi-word-component-names": [
        "error",
        {
          ignores: ["index"], //需要忽略的组件名
        },
      ],
      "prettier/prettier": "off",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "error"
  }
}
