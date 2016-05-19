var isString = require('./is').string
var logger = require('./logger')

module.exports = function (entry, devServer) {
  var result = {}

  if (!entry) {
    logger.fatal('请配置 entry')
  }

  if (isString(entry)) {
    result.app = [].concat(entry)
  } else {
    Object.keys(entry || {}).forEach(function (name) {
      result[name] = [].concat(entry[name])
    })
  }

  if (devServer.enable) {
    var data = [
      'webpack-dev-server/client?' + devServer.host + '/',
      'webpack/hot/dev-server'
    ]

    if (devServer.log) {
      data.push('webpack-hud')
    }

    Object.keys(result).forEach(function (name) {
      result[name] = data.concat(result[name])
    })
  }

  return result
}
