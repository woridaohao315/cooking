var logger = require('./logger')
var isObject = require('./is').object
var exec = require('./exec')
var pluginExists = require('./check').pluginExists

var importExtend = function (extend, cooking, options) {
  require('cooking-' + extend)(cooking, options)
  logger.success('插件加载成功: ' + extend)
}

var installExtend = function (name) {
  logger.warn('插件不存在，自动下载插件: ' + name)
  exec('cooking', ['import', name], {
    stdio: 'inherit'
  })
}

/**
 * 加载并装配插件
 * @param  {array} extends
 * @param  {object} config - webpack config
 */
module.exports = function (_extends, cooking) {
  var isObj = isObject(_extends)

  Object.keys(_extends || {}).forEach(function (key) {
    var extend = isObj ? key : _extends[key]
    var options = isObj ? _extends[key] : null

    if (!pluginExists('cooking-' + extend)) {
      installExtend(extend)
    }

    importExtend(extend, cooking, options)
  })
  console.log()
}
