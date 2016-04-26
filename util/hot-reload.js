module.exports = function(entry, host) {
  // add hot-reload related code to entry chunks
  var webpackDevServer = 'webpack-dev-server/client?' + host + '/'
  var hotDevServer = 'webpack/hot/dev-server'

  Object.keys(entry).forEach(function(name, i) {
    entry[name] = [webpackDevServer, hotDevServer].concat(entry[name])
  })


  return entry
}
