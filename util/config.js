var PLUGIN_PATH = require('./path').PLUGIN_PATH
var fs = require('fs')
var path = require('path')

var filename = 'config.json'
var filePath = path.join(PLUGIN_PATH, filename)

var formatBoolean = function (value) {
  if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  }

  return value
}
var requireFile = function () {
  return require(filePath)
}

exports.init = function () {
  if (!fs.existsSync(filePath)) {
    var config = {
      template: 'vue',
      registry: '',
      updateCheck: true,
      github: '',
      author: ''
    }

    fs.writeFileSync(filePath, JSON.stringify(config, null, 2))
  }
}

exports.get = function (option) {
  if (!option) {
    return requireFile()
  }

  return requireFile()[option]
}

exports.set = function (option, value) {
  var config = requireFile()

  if (config[option] !== undefined) {
    config[option] = formatBoolean(value)
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2))

    return true
  }

  return false
}
