var webpack = require('webpack');
var config = require('./webpack.base.conf');
var cssLoaders = require('./../../libs/css-loaders');
var utils = require('./../../utils');

// eval-source-map is faster for development
config.devtool = '#eval-source-map';

config.vue = config.vue || {};
config.vue.loaders = config.vue.loaders || {};
cssLoaders({
  sourceMap: true,
  extract: false
}).forEach(function(loader) {
  config.vue.loaders[loader.key] = loader.value;
});

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
