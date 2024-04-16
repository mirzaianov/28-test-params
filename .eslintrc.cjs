module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'tailwind.config.js',
    'vite.config.ts',
    'postcss.config.js',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    //
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'no-restricted-syntax': 0,
    'no-unused-expressions': ['error', { allowTernary: true }],
    'linebreak-style': ['error', 'windows'],
    'no-bitwise': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 0,
    'no-extend-native': 0,
    //
  },
};
