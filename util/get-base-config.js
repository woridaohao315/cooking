var path = require('path')
var PATH = require('./path')
var isObject = require('./is').object
var webpack = require('webpack')

module.exports = function (userConfig) {
  // hack assetsPath
  if (userConfig.devServer === true || isObject(userConfig.devServer)) {
    userConfig.assetsPath = userConfig.assetsPath || 'static'
  } else {
    userConfig.assetsPath = userConfig.assetsPath || '/static'
  }

  return {
    output: {
      path: path.resolve(PATH.CWD_PATH, 'dist'),
      publicPath: '/dist',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    template: true,

    plugins: {
      'occurenceorder': new webpack.optimize.OccurenceOrderPlugin()
    },

    resolve: {
      extensions: ['', '.js']
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
        assets: {
          test: /\.(gif|png|jpe?g|svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: userConfig.urlLoaderLimit || 10000,
            name: path.join(userConfig.assetsPath, '[name].[hash:7].[ext]')
          }
        }
      }
    }
  }
}
