var webpack = require('webpack');
var config = require('./webpack.base.conf');
var cssLoaders = require('./../../libs/css-loaders');
var vueCssLoaders = require('./../../libs/vue-css-loaders');

// eval-source-map is faster for development
config.devtool = '#eval-source-map';

config.vue = config.vue || {};
config.vue.loaders = vueCssLoaders();
config.module.loaders = config.module.loaders.concat(cssLoaders());

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin()

  // NoErrorsPlugin 会使 eslint-loader 打断 build
  // new webpack.NoErrorsPlugin()
]);

module.exports = config;
