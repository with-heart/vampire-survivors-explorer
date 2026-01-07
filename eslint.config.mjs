// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { tanstackConfig } from '@tanstack/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'
import pluginNeverthrow from 'eslint-plugin-neverthrow'

export default [{
  ignores: ['dist/**', '.output/**', '.vinxi/**', '**/routeTree.gen.*'],
}, ...tanstackConfig, ...pluginRouter.configs['flat/recommended'], ...pluginNeverthrow.configs['recommended'], {
  rules: {
    'import/order': 'off',
    'import/first': 'off',
    'import/newline-after-import': 'off',
  },
}, ...storybook.configs["flat/recommended"]];
