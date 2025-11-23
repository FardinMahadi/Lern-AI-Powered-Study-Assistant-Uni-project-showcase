import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const invalidLiteralSelector = 'Literal[value=/bg' + '-linear-/]';
const invalidGradientMessage = [
  "Use 'bg-gradient-*' instead of '",
  'bg',
  '-linear-',
  "*'. bg-linear is not a valid Tailwind CSS class.",
].join('');

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    plugins: {
      perfectionist: perfectionistPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Prevent using incorrect bg-linear classes (should be bg-gradient)
      // Note: The warning you're seeing is likely from Tailwind CSS IntelliSense extension
      // This ESLint rule will catch actual usage of bg-linear in code
      'no-restricted-syntax': [
        'warn',
        {
          selector: invalidLiteralSelector,
          message: invalidGradientMessage,
        },
      ],
    },
  },
  // File-specific rules for React/TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      perfectionist: perfectionistPlugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      // Warn about common mistakes
      'no-template-curly-in-string': 'warn',
      // Import ordering with pyramid structure
      'perfectionist/sort-imports': [
        2, // error level
        {
          order: 'asc',
          ignoreCase: true,
          type: 'line-length', // creates pyramid structure
          newlinesBetween: 'always', // blank lines between groups
          internalPattern: ['^src/.+'],
          groups: [
            'style',
            'side-effect',
            'type',
            ['builtin', 'external'],
            'custom-ionic',
            'custom-capacitor',
            'custom-mobile',
            'custom-components',
            'custom-lib',
            'custom-contexts',
            'custom-data',
            'internal',
            ['parent', 'sibling', 'index'],
            ['parent-type', 'sibling-type', 'index-type'],
            'object',
            'unknown',
          ],
          customGroups: {
            value: {
              'custom-ionic': ['^@ionic/.+'],
              'custom-capacitor': ['^@capacitor/.+'],
              'custom-mobile': ['^src/mobile/.+'],
              'custom-components': ['^src/components/.+'],
              'custom-lib': ['^src/lib/.+'],
              'custom-contexts': ['^src/contexts/.+'],
              'custom-data': ['^src/data/.+'],
            },
          },
        },
      ],
      // Require newline after imports
      'import/newline-after-import': 2,
      // Warn about unused imports
      'unused-imports/no-unused-imports': 1,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },
];

export default eslintConfig;
