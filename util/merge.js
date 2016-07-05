'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const is = require('./is')
const loadTemplate = require('./load-template')
const CWD_PATH = require('./path').CWD_PATH

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
  const sourceMap = config.sourceMap ? '?sourceMap' : ''
  const cssLoader = `css-loader${sourceMap}!postcss-loader${sourceMap}`

  config.module.loaders.css = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', cssLoader)
  }
}

const calcSourceMap = sourceMap => {
  if (sourceMap === true) {
    return '#source-map'
  } else if (sourceMap === false) {
    return false
  }
  return sourceMap
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
  config.output.library = userConfig.moduleName
  if (userConfig.format === 'umd' || userConfig.format === 'amd') {
    config.output.umdNamedDefine = true
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
    if (!config.devServer ||
        (is.object(config.devServer) &&
        config.devServer.enable === false)) {
      config.devtool = calcSourceMap(userConfig.sourceMap)
    }
  } else {
    config.devtool = calcSourceMap(userConfig.sourceMap)

    // hash
    userConfig.hash = Boolean(userConfig.hash)
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

    const minimize = userConfig.minimize
    const UglifyJs = new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: Boolean(userConfig.sourceMap)
    })
    const UglifyCss = new webpack.LoaderOptionsPlugin({
      minimize: true
    })

    if (is.boolean(minimize)) {
      if (minimize) {
        config.plugins.UglifyJs = UglifyJs
        config.plugins.LoaderOptions = UglifyCss
      }
    } else if (is.object(minimize)) {
      if (minimize.js) {
        config.plugins.UglifyJs = UglifyJs
      }

      if (minimize.css) {
        config.plugins.LoaderOptions = UglifyCss
      }
    }

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
  const chunks = userConfig.chunk

  if (is.string(chunks)) {
    config.plugins['commons-chunk'] = new CommonsChunkPlugin(chunks)
  } else if (chunks) {
    Object.keys(chunks).forEach(name => {
      config.plugins[`${name}-chunk`] = new CommonsChunkPlugin(chunks[name])
    })
  }

  return config
}
