var path = require('path')
var PLUGIN_PATH = require('../util/path').PLUGIN_PATH
var info = require(path.join(PLUGIN_PATH, 'package.json'))
var dependencies = info.dependencies

module.exports = function (program) {
  for (var name in dependencies) {
    if (/^cooking-(\S+)-cli$/.test(name)) {
      var commandName = name.replace(/^cooking-(\S+)-cli$/, '$1')
      var description = require(path.join(name, 'package.json')).description
      var action = (function (_name) {
        return function () {
          require(_name)(program)
        }
      })(name)
      var command = program.command(commandName)

      command.description(description)
      try {
        require(path.join(name, 'options'))(command)
      } catch (e) {
        // options.js 文件不存在则不处理
      }
      command.action(action)
    }
  }
}
