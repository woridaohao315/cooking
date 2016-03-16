var utils = require('./../utils');

module.exports = function(config) {
  // add hot-reload related code to entry chunks
  var polyfill = 'eventsource-polyfill';
  var devClient = utils.dir('src/libs/dev-client');

  Object.keys(config.entry).forEach(function(name, i) {
    var extras = i === 0 ? [polyfill, devClient] : [devClient];
    config.entry[name] = extras.concat(config.entry[name]);
  });

  return config;
};