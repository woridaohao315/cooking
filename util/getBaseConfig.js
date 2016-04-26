var path = require('path')
var PATH = require('./path')

return
module.exports = function (config) {
  return {
    devtool: '#eval-source-map',

    output: {
      path: path.resolve(PATH.CWD_PATH, 'dist'),
      publicPath: '/',
      filename: '[name].js'
    },

    plugins: [],

    resolve: {
      extensions: ['', '.js'],
      root: [
        path.join(PATH.CWD_PATH, 'node_modules'),
        path.join(PATH.LIB_PATH, 'node_modules')
      ],
      fallback: [
        path.join(PATH.ROOT_PATH, 'node_modules')
      ]
    },

    resolveLoader: {
      root: [
        path.join(PATH.CWD_PATH, 'node_modules'),
        path.join(PATH.LIB_PATH, 'node_modules')
      ],
      fallback: [
        path.join(PATH.ROOT_PATH, 'node_modules')
      ]
    },

    module: {
      loaders: [
        {
          key: 'js',
          test: /\.(jsx?|babel|es6)$/,
          include: PATH.CWD_PATH,
          exclude: /node_modules|bower_components/,
          loaders: ['babel']
        },
        {
          key: 'json',
          test: /\.json$/,
          loaders: ['json']
        },
        {
          key: 'css',
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          key: 'html',
          test: /\.html$/,
          loaders: ['html']
        },
        {
          key: 'font',
          test: /\.(gif|png|jpe?g|svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
          loaders: ['url'],
          query: {
            limit: config.urlLoaderLimit || 10000,
            name: path.join(config.assetsPath || '', '[name].[hash:7].[ext]')
          }
        }
      ]
    }
  }
}
