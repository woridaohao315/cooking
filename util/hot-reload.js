var isString = require('./is').string

module.exports = function(entry, host, enable) {
  var result = {}
  // add hot-reload related code to entry chunks
  var hotDevServer = 'webpack/hot/dev-server'

  if (isString(entry)) {
    result['app'] = [hotDevServer].concat(entry)
  } else {
    Object.keys(entry).forEach(function(name, i) {
      result[name] = [hotDevServer].concat(entry[name])
    })
  }

  if (enable) {
    var webpackDevServer = 'webpack-dev-server/client?' + host + '/'

    Object.keys(result).forEach(function (name) {
      result[name] = [webpackDevServer].concat(result[name])
    })
  }

  return result
}
