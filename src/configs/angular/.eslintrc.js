var production = process.env.NODE_ENV === 'production';

module.exports = {
  'root': true,

  'plugins': [
    'angular'
  ],

  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  }
};
