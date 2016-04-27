var exec = require('./exec')
var PLUGIN_PATH = require('./path').PLUGIN_PATH
var checkRegistry =require('./check').registry
var config = require('./config')

var npm = function (options, registry) {
  registry = registry || config.get('registry')

  if (registry) {
    options.push(checkRegistry(registry))
  }

  options = options.concat(['--prefix', PLUGIN_PATH, '--save', '--silent'])
  exec('npm', options, { stdio: 'inherit'})
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
