var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var is = require('./is')
var loadTemplate = require('./load-template')
var CWD_PATH = require('./path').CWD_PATH
var logger = require('./logger')

/**
 * merge
 * @param  {object} userConfig
 * @param  {object} baseConfig
 * @return {object} webpack config
 */
module.exports = function (userConfig, baseConfig) {
  var config = baseConfig

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

  // development
  if (process.env.NODE_ENV === 'development') {
    config.devtool = '#eval-source-map'
    config.devServer = userConfig.devServer

    // plugin
    config.plugins.NoErrors = new webpack.NoErrorsPlugin()
  } else {
    config.devtool = userConfig.sourceMap ? '#source-map' : false

    // hash
    if (userConfig.hash) {
      config.output.filename = '[name].[chunkhash:7].js'
      config.output.chunkFilename = '[id].[chunkhash:7].js'
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

    var extractcss = userConfig.extractCSS
    if (extractcss) {
      config.extractCSS = true

      // import plugin
      config.plugins.ExtractText = new ExtractTextPlugin(
        extractcss === true ?
        '[name].[contenthash:7].css' :
        extractcss
      )

      // update css loader
      config.module.loaders.css = {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    }
  }

  // clean
  if (is.boolean(userConfig.clean)) {
    config.__COOKING_CLEAN__ = userConfig.clean
  } else {
    config.__COOKING_CLEAN__ = true
  }

  // chunk
  var hashContent = userConfig.hash === true && process.env.NODE_ENV === 'production' ? '.[hash:7]' : ''
  if (is.string(userConfig.chunk)) {
    var vendorName = userConfig.chunk + hashContent + '.js'

    config.plugins['commons-chunk'] = new webpack.optimize.CommonsChunkPlugin(userConfig.chunk, vendorName)
  } else {
    for (var name in userConfig.chunk) {
      if ({}.hasOwnProperty.call(userConfig.chunk, name)) {
        userConfig.chunk[name].name = userConfig.chunk[name].name || name
        userConfig.chunk[name].filename = userConfig.chunk[name].filename || (name + hashContent + '.js')

        config.plugins[name + '-chunk'] = new webpack.optimize.CommonsChunkPlugin(userConfig.chunk[name])
      }
    }
  }

  return config
}
