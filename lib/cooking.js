var getBaseConfig = require('../util/get-base-config')
var merge = require('../util/merge')
var parse = require('../util/parse')
var loadExtend = require('../util/load-extend')
var _set = require('lodash.set')
var _unset = require('lodash.unset')

/**
 * loader.vue => module.loaders.vue
 */
var replacePath = function (path) {
  return path
          .replace(/^((pre|post)?loader)s?/ig, 'module.$1s')
          .replace(/^(plugin)s?/g, '$1s')
}

/**
 * set config
 */
exports.set = function (config) {
  this.config = merge(config, getBaseConfig(config || {}))

  loadExtend(this.config.__COOKING_EXTENDS__, {
    add: this.add,
    remove: this.remove,
    config: this.config
  })

  return this
}

/**
 * remove option
 * @param  {string} _path
 * @example
 * cooking.remove('loader.js')
 */
exports.remove = function (_path) {
  _unset(this.config, replacePath(_path))

  return this
}

/**
 * add a option config
 * @param {string} _path - path of config
 * @param {object} value - config
 * @example
 * cooking.add('loader.vue', {
 *   test: /\.vue$/,
 *   loaders: ['vue']
 * })
 */
exports.add = function (_path, value) {
  _set(this.config, replacePath(_path), value)

  return this
}

/**
 * return webpack config
 */
exports.resolve = function () {
  return parse(this.config)
}
