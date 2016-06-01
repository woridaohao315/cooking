var path = require('path')
var fs = require('fs')
var isRoot = require('is-root')
var updateNotifier = require('update-notifier')
var pkg = require('../package.json')
var logger = require('../util/logger')
var PLUGIN_PATH = require('./path').PLUGIN_PATH

exports.registry = function (registry) {
  if (!registry) {
    return ''
  }

  return '--registry=' + registry
}

/* istanbul ignore next */
exports.initPluginPackage = function () {
  if (!fs.existsSync(PLUGIN_PATH)) {
    fs.mkdirSync(PLUGIN_PATH)
  }

  var pluginPkg = path.join(PLUGIN_PATH, 'package.json')

  if (!fs.existsSync(pluginPkg)) {
    fs.writeFileSync(pluginPkg, '{}')
  }
}

/* istanbul ignore next */
exports.checkVersion = function () {
  var notifier = updateNotifier({pkg: pkg})

  notifier.notify()
  if (notifier.update) {
    console.log(notifier.update)
  }
}

/* istanbul ignore next */
exports.pluginExists = function (name) {
  return fs.existsSync(path.join(PLUGIN_PATH, 'node_modules', name))
}

/* istanbul ignore next */
exports.preventSudo = function () {
  if (isRoot()) {
    console.log()
    logger.fatal('禁止使用 sudo 执行\n')
  }
}
