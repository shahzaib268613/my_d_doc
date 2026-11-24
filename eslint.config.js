import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import boundaries from 'eslint-plugin-boundaries'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'jsx-a11y': jsxA11y,
      boundaries,
    },
    rules: {
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/label-has-associated-control': 'off',
      'boundaries/element-types': [
        'error',
        {
          default: 'allow',
          rules: [
            { from: ['shared'], allow: ['shared'] },
            { from: ['features'], disallow: ['app'], allow: ['shared', 'features'] },
            { from: ['app'], disallow: [''], allow: ['app', 'features', 'shared'] },
          ],
        },
      ],
    },
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        { type: 'features', pattern: 'src/features/**' },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },
  },
])
