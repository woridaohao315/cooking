var production = process.env.NODE_ENV === 'production';

module.exports = {
  'root': true,

  'plugins': [
    'react'
  ],

  'env': {
    'browser': true,
    'node': true
  },

  'globals': {
    'React': true
  },

  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
      'arrowFunctions': true,
      'destructuring': true,
      'classes': true,
      'defaultParams': true,
      'blockBindings': true,
      'modules': true,
      'objectLiteralComputedProperties': true,
      'objectLiteralShorthandMethods': true,
      'objectLiteralShorthandProperties': true,
      'restParams': true,
      'spread': true,
      'forOf': false,
      'generators': false,
      'templateStrings': true,
      'superInFunctions': true,
      'experimentalObjectRestSpread': true
    }
  }
};
