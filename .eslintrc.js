module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '.'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/no-named-as-default': 0,
    'no-unused-vars': ['error', { varsIgnorePattern: '[rR]eact' }],
    'react/prop-types': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/named': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
};
