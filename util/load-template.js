var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CWD_PATH = require('./path').CWD_PATH
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
      if ({}.hasOwnProperty.call(template, name)) {
        if (is.string(template[name])) {
          templates[name] = new HtmlWebpackPlugin({
            filename: name,
            template: template[name]
          })
        } else {
          templates[name] = new HtmlWebpackPlugin(template[name])
        }
      }
    }
  }

  return templates
}
