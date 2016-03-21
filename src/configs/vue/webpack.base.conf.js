var cwd = require('cwd');
var utils = require('./../../utils');
var fs = require('fs');
var config = {
  output: {
    path: cwd('dist/'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [cwd('node_modules')],
    root: [
      process.cwd(),
      cwd('node_modules'),
      utils.dir('node_modules')
    ],
    alias: {
      'src': cwd('src'),
      'root': cwd()
    }
  },
  resolveLoader: {
    fallback: [cwd('node_modules')],
    root: [
      utils.dir('node_modules'),
      cwd('node_modules')
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules|bower_components/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(gif|png|jpg|svg|ttf|woff2|woff|eot)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};
var babelConfig = {
  presets: [
    require('babel-preset-es2015'),
    require('babel-preset-stage-0'),
    require('babel-preset-stage-2')
  ],
  plugins: [require('babel-plugin-transform-runtime')]
};
var configFile = utils.dir('src/configs/vue/.eslintrc.js');

if (!fs.existsSync(cwd('.babelrc'))) {
  config.babel = babelConfig;
}
if (!fs.existsSync(cwd('.eslintrc'))) {
  config.eslint.configFile = configFile;
};
if (!fs.existsSync(cwd('.eslintrc.js'))) {
  config.eslint.configFile = configFile;
};

module.exports = config;
