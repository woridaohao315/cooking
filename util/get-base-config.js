var path = require('path')
var PATH = require('./path')
var webpack = require('webpack')

module.exports = function (userConfig) {
  return {
    output: {
      path: path.resolve(PATH.CWD_PATH, 'dist'),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[id].js'
    },

    template: true,

    plugins: {
      'occurenceorder': new webpack.optimize.OccurenceOrderPlugin()
    },

    devServer: {
      publicPath: '/',
      enable: true,
      port: 8080,
      hot: true,
      historyApiFallback: true,
      lazy: false
    },

    resolve: {
      extensions: ['', '.js'],
      root: [
        path.join(PATH.CWD_PATH, 'node_modules'),
        path.join(PATH.PLUGIN_PATH, 'node_modules')
      ],
      fallback: [
        path.join(PATH.ROOT_PATH, 'node_modules')
      ]
    },

    resolveLoader: {
      root: [
        path.join(PATH.CWD_PATH, 'node_modules'),
        path.join(PATH.PLUGIN_PATH, 'node_modules')
      ],
      fallback: [
        path.join(PATH.ROOT_PATH, 'node_modules')
      ]
    },

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
          test: /\.(gif|png|jpe?g|svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: userConfig.urlLoaderLimit || 10000,
            name: path.join(userConfig.assetsPath || '', '[name].[hash:7].[ext]')
          }
        }
      }
    }
  }
}
