var isString = require('./is').string
var logger = require('./logger')

module.exports = function(entry, host, enable) {
  var result = {}
  // add hot-reload related code to entry chunks
  var hotDevServer = 'webpack/hot/dev-server'

  if (!entry) {
    logger.fatal('请配置 entry')
  }

  if (isString(entry)) {
    result['app'] = [hotDevServer].concat(entry)
  } else {
    Object.keys(entry || {}).forEach(function(name, i) {
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
