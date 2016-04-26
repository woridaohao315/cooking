var HtmlWebpackPlugin = require('html-webpack-plugin')
var CWD_PATH = require('./path').CWD_PATH
var logger = require('.logger')
var path = require('path')

module.exports = function (template) {
  var config = []

  if (template === true) {
    config.push(new HtmlWebpackPlugin())

  } else if ({}.toString.call(template) === '[object String]') {
    config.push(new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(CWD_PATH, template)
    }))

  } else if ({}.toString.call(template) === '[object Object]') {
    for (var name in template) {
      config.push(new HtmlWebpackPlugin({
        filename: name,
        template: path.resolve(CWD_PATH, template[name])
      }))
    }
  } else {
    logger.fatal('template 选项只接受 String 或 Object.')
  }

  return config
}
