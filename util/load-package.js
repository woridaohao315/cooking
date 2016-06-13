'use strict'

const pluginExists = require('./check').pluginExists
const logger = require('./logger')
const isArray = require('./is').array
const isString = require('./is').string
const exec = require('./exec')

/* istanbul ignore next */
const installExtend = name => {
  logger.warn(`依赖包不存在，自动下载依赖包: ${name}`)
  exec('cooking', ['import', name, '-p'], {
    stdio: 'inherit'
  })
}

module.exports = pkg => {
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
  pkg.forEach(name => {
    if (!pluginExists(`cooking-package-${name}`)) {
      installExtend(name)
    }
  })
}
