var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CWD_PATH = require('./path').CWD_PATH
var is = require('./is')
var logger = require('./logger')

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
          template[name].filename = template[name].filename || name
          templates[name] = new HtmlWebpackPlugin(template[name])
        }
      }
    }
  } else if (is.array(template)) {
    template.forEach(function (item) {
      if (!item.filename) {
        logger.fatal('template filename is required.')
      }
      templates[item.filename] = new HtmlWebpackPlugin(item)
    })
  }

  return templates
}
