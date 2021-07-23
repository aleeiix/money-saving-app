const RULES = {
  ERROR: 'error',
  WARN: 'warn',
  OFF: 'OFF'
}

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'react-hooks'
  ],
  rules: {
    'no-use-before-define': RULES.OFF,
    '@typescript-eslint/no-use-before-define': [RULES.ERROR],
    'react/react-in-jsx-scope': RULES.OFF
  }
}
