var webpack = require('webpack');
var config = require('./webpack.base.conf');
var cssLoaders = require('./../../libs/css-loaders');
var utils = require('./../../utils');

// eval-source-map is faster for development
config.devtool = '#eval-source-map';
config.module.loaders.concat(cssLoaders({
  ourceMap: false,
  extract: false
}));

// add hot-reload related code to entry chunks
var polyfill = 'eventsource-polyfill';
var devClient = utils.dir('src/libs/dev-client');
Object.keys(config.entry).forEach(function(name, i) {
  var extras = i === 0 ? [polyfill, devClient] : [devClient];
  config.entry[name] = extras.concat(config.entry[name]);
});

config.plugins = (config.plugins || []).concat([
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
