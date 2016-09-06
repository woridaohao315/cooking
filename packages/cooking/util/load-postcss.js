'use strict'

const isFunction = require('./is').Function
const isArray = require('./is').Array

module.exports = function (plugins) {
  let postcss = plugins

  if (isArray(plugins)) {
    postcss = function (webpack) {
      return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
    }
  }

  return postcss
}
