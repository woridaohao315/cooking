var isArray = require('./is').array
var isFunction = require('./is').function

module.exports = function (config) {
  var plugins = config.postcss

  if (isArray(plugins)) {
    config.postcss = function (webpack) {
      return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
    }
  }
}
