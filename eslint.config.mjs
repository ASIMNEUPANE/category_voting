import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: { globals: globals.node },
    //to prettifying the code using eslint but we dont do it we will use preetier
    rules: {
      // Indentation rule: 2 spaces
      indent: ['error', 2],
      // Space before function parenthesis
      'space-before-function-paren': ['error', 'always'],
      // No space inside parentheses
      'space-in-parens': ['error', 'never'],
    },
    
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];