'use strict'

var _toArray = require('lodash.toarray')

module.exports = config => {
  // parse loader
  [
    'loaders',
    'preLoaders',
    'postLoaders'
  ].forEach(key => {
    config.module[key] = _toArray(config.module[key])
  })
  // parse plugin
  config.plugins = _toArray(config.plugins)

  return config
}
