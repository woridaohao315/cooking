'use strict'

const path = require('path')
const webpack = require('webpack')
const PATH = require('./path')

module.exports = userConfig => {
  let limit = 1

  if (userConfig.urlLoaderLimit !== false) {
    limit = userConfig.urlLoaderLimit || 10000
  }
  const assetsPath = userConfig.assetsPath || 'static'

  return {
    output: {
      path: path.resolve(PATH.CWD_PATH, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    template: true,

    plugins: {
      occurenceorder: new webpack.optimize.OccurenceOrderPlugin()
    },

    resolve: {
      extensions: ['', '.js', '.json']
    },

    resolveLoader: {},

    module: {
      loaders: {
        js: {
          test: /\.(jsx?|babel|es6)$/,
          include: PATH.CWD_PATH,
          exclude: /node_modules|bower_components/,
          loaders: ['babel-loader']
        },
        json: {
          test: /\.json$/,
          loaders: ['json-loader']
        },
        css: {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        },
        html: {
          test: /\.html$/,
          loaders: ['html-loader?minimize=false']
        },
        font: {
          test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.join(assetsPath, '[name].[hash:7].[ext]')
          }
        },
        svg: {
          test: /\.svg(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.join(assetsPath, '[name].[hash:7].[ext]')
          }
        },
        image: {
          test: /\.(gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.join(assetsPath, '[name].[hash:7].[ext]')
          }
        }
      }
    }
  }
}
