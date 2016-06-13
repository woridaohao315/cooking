'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const is = require('./is')
const loadTemplate = require('./load-template')
const CWD_PATH = require('./path').CWD_PATH
const logger = require('./logger')

const extractCSS = (extractcss, config, hash) => {
  if (!extractcss) {
    return
  }
  let filename = extractcss

  config.extractCSS = true

  if (extractcss === true) {
    filename = hash ? '[name].[contenthash:7].css' : '[name].css'
  }
  // import plugin
  config.plugins.ExtractText = new ExtractTextPlugin(filename)

  // update css loader
  config.module.loaders.css = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
  }
}

/**
 * merge
 * @param  {object} userConfig
 * @param  {object} baseConfig
 * @return {object} webpack config
 */
module.exports = (userConfig, baseConfig) => {
  let config = baseConfig

  // entry
  config.entry = userConfig.entry

  // dist
  config.output.path = path.resolve(CWD_PATH, userConfig.dist || baseConfig.output.path)

  // publicPath
  config.output.publicPath = userConfig.publicPath || config.output.publicPath

  // template
  if (userConfig.template !== false) {
    Object.assign(config.plugins, loadTemplate(userConfig.template || config.template))
  }

  // format
  if (userConfig.format === 'cjs') {
    config.output.libraryTarget = 'commonjs2'
  } else {
    config.output.libraryTarget = userConfig.format
  }

  // moduleName
  if (userConfig.format === 'umd' || userConfig.format === 'amd') {
    if (userConfig.moduleName) {
      config.output.library = userConfig.moduleName
      config.output.umdNamedDefine = true
    } else {
      logger.fatal('请配置 moduleName')
    }
  }

  // development
  if (process.env.NODE_ENV === 'development') {
    config.devtool = '#eval-source-map'
    config.devServer = userConfig.devServer

    // plugin
    config.plugins.NoErrors = new webpack.NoErrorsPlugin()

    // extractCSS
    if (userConfig.devServer) {
      extractCSS(userConfig.devServer.extractCSS, config, false)
    }

    // devtool
    if (!userConfig.devServer || !userConfig.devServer.enable) {
      config.devtool = userConfig.sourceMap ? '#source-map' : false
    }
  } else {
    config.devtool = userConfig.sourceMap ? '#source-map' : false

    // hash
    if (userConfig.hash) {
      config.output.filename = '[name].[chunkhash:7].js'
      config.output.chunkFilename = '[id].[chunkhash:7].js'
    }

    // plugin
    config.plugins.Define = new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
    config.plugins.UglifyJs = new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false}
    })

    extractCSS(userConfig.extractCSS, config, userConfig.hash)
  }

  // clean
  if (is.boolean(userConfig.clean)) {
    config.__COOKING_CLEAN__ = userConfig.clean
  } else {
    config.__COOKING_CLEAN__ = true
  }

  // chunk
  const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin

  if (is.string(userConfig.chunk)) {
    config.plugins['commons-chunk'] = new CommonsChunkPlugin(userConfig.chunk)
  } else {
    for (const name in userConfig.chunk) {
      if ({}.hasOwnProperty.call(userConfig.chunk, name)) {
        if (!userConfig.chunk[name].names) {
          userConfig.chunk[name].name = userConfig.chunk[name].name || name
        }
        config.plugins[`${name}-chunk`] = new CommonsChunkPlugin(userConfig.chunk[name])
      }
    }
  }

  return config
}
