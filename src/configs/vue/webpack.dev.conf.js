var webpack = require('webpack');
var config = require('./webpack.base.conf');
var cssLoaders = require('./../../libs/css-loaders');

// eval-source-map is faster for development
config.devtool = '#eval-source-map';

config.vue = config.vue || {};
config.vue.loaders = cssLoaders();
config.module.loaders.concat(cssLoaders());

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
