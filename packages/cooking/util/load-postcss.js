'use strict'

const isArray = require('./is').Array

module.exports = function (plugins) {
  let postcss = plugins

  if (isArray(plugins)) {
    postcss = function () {
      return plugins
    }
  }

  return postcss
}
