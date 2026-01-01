import { tanstackConfig } from '@tanstack/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default [
  {
    ignores: ['dist/**', '.output/**', '.vinxi/**', '**/routeTree.gen.*'],
  },
  ...tanstackConfig,
  ...pluginRouter.configs['flat/recommended'],
  {
    rules: {
      'import/order': 'off',
      'import/first': 'off',
      'import/newline-after-import': 'off',
    },
  },
]
