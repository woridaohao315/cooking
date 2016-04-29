var path = require('path')
var PLUGIN_PATH = require('../util/path').PLUGIN_PATH
var info = require(path.join(PLUGIN_PATH, 'package.json'))
var dependencies = info.dependencies
var cliPkg = []

module.exports = function (program) {
  for (var name in dependencies) {
    if (/^cooking-(\S+)-cli$/.test(name)) {
      var commandName = name.replace(/^cooking-(\S+)-cli$/, '$1')

      program.command(commandName, '')
    }
  }
}
