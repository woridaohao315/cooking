var isArray = require('./is').array

module.exports = function (config) {
  var plugins = config.postcss

  if (isArray(plugins)) {
    config.postcss = function () {
      return plugins
    }
  }
}
