'use strict'

const path = require('path')
const PATH = require('./path')

const rootPath = [
  'node_modules',
  path.join(PATH.CWD_PATH, 'node_modules'),
  path.join(PATH.PLUGIN_PATH, 'node_modules'),
  path.join(PATH.ROOT_PATH, 'node_modules')
]

module.exports = config => {
  config.resolve = config.resolve || {}
  config.resolveLoader = config.resolveLoader || {}

  config.resolve.modules = (config.resolve.root || []).concat(rootPath)
  config.resolveLoader.modules = (config.resolveLoader.root || []).concat(rootPath)
}
