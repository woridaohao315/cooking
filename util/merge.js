var path = require('path')
var is = require('./is')
var loadTemplate = require('./load-template')
var CWD_PATH = require('./path').CWD_PATH
var logger = require('./logger')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

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
  config.output.path = path.resolve(CWD_PATH, userConfig.dist)

  // publicPath
  config.output.publicPath = userConfig.publicPath

  // template
  Object.assign(config.plugins, loadTemplate(userConfig.template || config.template))

  // development
  if (process.env.NODE_ENV === 'development') {
    config.devtool = '#eval-source-map'
    config.devServer = userConfig.devServer

    // plugin
    config.plugins['NoErrors'] = new webpack.NoErrorsPlugin()
    config.plugins['HotModuleReplacement'] = new webpack.HotModuleReplacementPlugin()

  } else if (process.env.NODE_ENV === 'production') {
    config.devtool = userConfig.sourceMap ? '#source-map' : false

    // hash
    if (userConfig.hash) {
      config.output.filename = '[name].[chunkhash:7].js';
      config.output.chunkFilename = '[id].[chunkhash:7].js';
    }

    // format
    if (userConfig.format === 'cjs') {
      config.output.libraryTarget = 'commonjs2'
    } else {
      config.output.libraryTarget = userConfig.format
    }

    // umdName
    if (userConfig.format === 'umd' && !userConfig.umdName) {
      logger.fatal('请配置 umdName')
    }
    config.output.library = userConfig.umdName

    // plugin
    config.plugins['Define'] = new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
    config.plugins['UglifyJs'] = new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false }
    })

    var extractcss = userConfig.extractCSS
    if (extractcss) {
      // import plugin
      config.plugins['ExtractText'] = new ExtractTextPlugin(
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

  // extends
  config.__COOKING_EXTENDS__ = userConfig.extends

  // chunk
  if (is.string(userConfig.chunk)) {
    config.plugins['commons-chunk'] = new webpack.optimize.CommonsChunkPlugin(userConfig.chunk, 'vendor.[chunkhash:7].js')
  } else {
    for (var name in userConfig.chunk) {
      config.plugins[name + '-chunk'] = new webpack.optimize.CommonsChunkPlugin(name, userConfig.chunk[name])
    }
  }

  return config
}
