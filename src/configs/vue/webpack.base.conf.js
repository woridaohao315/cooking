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
    alias: {
      'src': cwd('src'),
      'root': cwd()
    }
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
    // formatter: require('eslint-friendly-formatter'),
    // emitWarning: true
  }
};
var babelConfig = {
  presets: [
    'es2015',
    'stage-0',
    'stage-2'
  ],
  plugins: ['transform-runtime']
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
