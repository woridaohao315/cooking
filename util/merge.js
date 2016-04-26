var loadTemplate = require('./load-template')

/**
 * merge
 * @param  {object} userConfig
 * @param  {object} baseConfig
 * @return {object} webpack config
 */
module.exports = function (userConfig, baseConfig) {
  var config = baseConfig

  // in
  config.entry = userConfig.in

  // dist
  config.output.path = userConfig.dist

  // publicPath
  config.output.publicPath = userConfig.publicPath

  // template
  config.plugins = config.plugins.concat(loadTemplate(config.template))

  // clean

  // hash

  // sourceMap

  // extractCSS

  return config
}