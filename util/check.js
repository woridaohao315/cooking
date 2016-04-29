var path = require('path')
var PLUGIN_PATH = require('./path').PLUGIN_PATH
var fs = require('fs')
var package = require('../package.json')
var updateNotifier = require('update-notifier')

exports.registry = function (registry) {
  if (!registry) {
    return ''
  }

  return '--registry=' + registry
}

exports.initPluginPackage = function () {
  if (!fs.existsSync(PLUGIN_PATH)) {
    fs.mkdirSync(PLUGIN_PATH)
  }

  var pkg = path.join(PLUGIN_PATH, 'package.json')

  if (!fs.existsSync(pkg)) {
    fs.writeFileSync(pkg, '{}')
  }
}

exports.checkVersion = function () {
  var notifier = updateNotifier({pkg: package})

  notifier.notify()
  if (notifier.update) {
    console.log(notifier.update)
  }
}

exports.pluginExists = function (name) {
  return fs.existsSync(path.join(PLUGIN_PATH,'node_modules', name))
}
