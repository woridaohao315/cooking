var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('style-loader', sourceLoader)
    } else {
      return ['style-loader', sourceLoader].join('!')
    }
  }

  return [
    {
      test: /\.css$/,
      loader: generateLoaders(['css', 'postcss'])
    },
    {
      test: /\.less$/,
      loader: generateLoaders(['css', 'less', 'postcss'])
    },
    {
      test: /\.sass$/,
      loader: generateLoaders(['css', 'sass?indentedSyntax', 'postcss'])
    },
    {
      test: /\.scss$/,
      loader: generateLoaders(['css', 'sass', 'postcss'])
    },
    {
      test: /\.stylus$/,
      loader: generateLoaders(['css', 'stylus', 'postcss'])
    },
    {
      test: /\.styl$/,
      loader: generateLoaders(['css', 'stylus', 'postcss'])
    }
  ]
}