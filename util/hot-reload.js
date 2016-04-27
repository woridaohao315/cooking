var isString = require('./is').string

module.exports = function(entry, host) {
  var result = {}
  // add hot-reload related code to entry chunks
  var webpackDevServer = 'webpack-dev-server/client?' + host + '/'
  var hotDevServer = 'webpack/hot/dev-server'

  if (isString(entry)) {
    result['app'] = [webpackDevServer, hotDevServer].concat(entry)
  } else {
    Object.keys(entry).forEach(function(name, i) {
      result[name] = [webpackDevServer, hotDevServer].concat(entry[name])
    })
  }

  return result
}
