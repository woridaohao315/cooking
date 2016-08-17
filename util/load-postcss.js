var isArray = require('./is').array
var isFunction = require('./is').function

module.exports = function (plugins) {
  var postcss = plugins

  if (isArray(plugins)) {
    postcss = function (webpack) {
      return plugins.map(plugin => isFunction(plugin) ? plugin(webpack) : plugin)
    }
  }

  return postcss
}
