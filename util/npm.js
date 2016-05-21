var exec = require('./exec')
var PLUGIN_PATH = require('./path').PLUGIN_PATH
var checkRegistry = require('./check').registry
var config = require('./config')
var shelljs = require('shelljs')

var npm = function (options, registry) {
  registry = registry || config.get('registry')

  if (registry) {
    options.push(checkRegistry(registry))
  }

  var pwd = shelljs.pwd().stdout

  shelljs.cd(PLUGIN_PATH)
  options = options.concat(['--save', '--silent'])
  exec('npm', options, {stdio: 'inherit'})
  shelljs.cd(pwd)
}

exports.install = function (name, registry) {
  npm(['install', name], registry)
}

exports.update = function (name, registry) {
  npm(['update', name], registry)
}

exports.uninstall = function (name) {
  npm(['uninstall', name])
}

exports.list = function () {
  npm(['list', '--depth=0'])
}
