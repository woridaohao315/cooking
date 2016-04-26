var getBaseConfig = require('../util/getBaseConfig')
var merge = require('../util/merge')

module.exports = function (config) {
  return merge(config, getBaseConfig(config))
}
