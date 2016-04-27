var HtmlWebpackPlugin = require('html-webpack-plugin')
var CWD_PATH = require('./path').CWD_PATH
var logger = require('./logger')
var path = require('path')
var is = require('./is')

module.exports = function (template) {
  var templates = {}

  if (template === true) {
    templates['index.html'] = new HtmlWebpackPlugin()

  } else if (is.string(template)) {
    templates['index.html'] = new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(CWD_PATH, template)
    })

  } else if (is.object(template)) {
    for (var name in template) {
      templates[name] = new HtmlWebpackPlugin({
        filename: name,
        template: path.resolve(CWD_PATH, template[name])
      })
    }
  }

  return templates
}
