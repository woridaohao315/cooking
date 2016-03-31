module.exports = function(config) {
  // add hot-reload related code to entry chunks
  var webpackDevServer = 'webpack-dev-server/client?http://localhost:' + config.port + '/';
  var hotDevServer = 'webpack/hot/dev-server';

  Object.keys(config.entry).forEach(function(name, i) {
    config.entry[name] = [webpackDevServer, hotDevServer].concat(config.entry[name]);
  });


  return config;
};