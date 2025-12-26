module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:auto-import/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'auto-import'],
  rules: {
   // 自定义规则（可根据需求调整）
    "react/prop-types": "off", // TS 已做类型检查，关闭 prop-types
    "@typescript-eslint/no-explicit-any": "warn", // 禁止 any 类型（警告级别）
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // 忽略以下划线开头的未使用变量
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ], // 确保热更新正常
    "import/order": [
      "error",
      {
        // 规范导入顺序
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
