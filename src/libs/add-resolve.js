var cwd = require('cwd');
var utils = require('./../utils');

module.exports = function (config) {
  config.resolve = config.resolve || {};
  config.resolveLoader = config.resolveLoader || {};

  config.resolve.fallback = (config.resolve.fallback || [])
    .concat([cwd('node_modules')]);
  config.resolve.root = (config.resolve.root || []).concat([
    process.cwd(),
    cwd('node_modules'),
    utils.dir('node_modules')
  ]);

  config.resolveLoader.fallback = (config.resolveLoader.fallback || [])
    .concat([cwd('node_modules')]);
  config.resolveLoader.root = (config.resolveLoader.root || [])
    .concat([
      utils.dir('node_modules'),
      cwd('node_modules')
    ]);

  return config;
}