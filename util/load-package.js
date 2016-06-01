var pluginExists = require('./check').pluginExists
var logger = require('./logger')
var isArray = require('./is').array
var isString = require('./is').string
var exec = require('./exec')

/* istanbul ignore next */
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

  /* istanbul ignore if */
  if (!isString(pkg) && !isArray(pkg)) {
    logger.fatal('use 字段只接受数组和字符串类型')
  }

  /* istanbul ignore next */
  if (isString(pkg)) {
    pkg = [pkg]
  }

  /* istanbul ignore next */
  pkg.forEach(function (name) {
    if (!pluginExists('cooking-package-' + name)) {
      installExtend(name)
    }
  })
}
