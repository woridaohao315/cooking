var pluginExists = require('./check').pluginExists
var logger = require('./logger')
var isArray = require('./is').array
var isString = require('./is').string
var exec = require('./exec')

var installExtend = function (name) {
  logger.warn('依赖包不存在，自动下载依赖包: ' + name)
  exec('cooking', ['import', name, '-p'], {
    stdio: 'inherit'
  })
}

module.exports = function (pkg) {
  if (!pkg) {
    return
  }

  if (!isString(pkg) && !isArray(pkg)) {
    logger.fatal('use 字段只接受数组和字符串类型')
  }

  if (isString(pkg)) {
    pkg = [pkg]
  }

  pkg.forEach(function (name) {
    if (!pluginExists('cooking-package-' + name)) {
      installExtend(name)
    }
  })
}
