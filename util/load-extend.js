var logger = require('./logger')
var isObject = require('./is').object
var exec = require('./exec')
var pluginExists = require('./check').pluginExists

/* istanbul ignore next */
var importExtend = function (extend, cooking, options) {
  require('cooking-' + extend)(cooking, options)
  logger.success('插件加载成功: ' + extend)
}

/* istanbul ignore next */
var installExtend = function (name) {
  logger.warn('插件不存在，自动下载插件: ' + name)
  exec('cooking', ['import', name], {
    stdio: 'inherit'
  })
}

/* istanbul ignore next */
/**
 * 加载并装配插件
 * @param  {array} extends
 * @param  {object} config - webpack config
 */
module.exports = function (_extends, cooking) {
  var isObj = isObject(_extends)

  Object.keys(_extends || {}).forEach(function (key) {
    var extend = isObj ? key : _extends[key]
    var options = isObj ? _extends[key] : {}
    var extendName = extend.split('@')[0]

    if (!pluginExists('cooking-' + extendName)) {
      installExtend(extend)
    }

    importExtend(extendName, cooking, options)
  })
  console.log()
}
