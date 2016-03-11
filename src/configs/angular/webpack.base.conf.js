var cwd = require('cwd');
var path = require('path');
var utils = require('./../../utils');

module.exports = {
  entry: {
    app: 'app.js'
  },
  output: {
    path: cwd('dist/'),
    publicPath: './',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [cwd('node_modules')],
    root: [
      process.cwd(),
      cwd('node_modules'),
      utils.dir('node_modules')
    ],
    alias: {
      'src': cwd('src'),
      'root': cwd()
    }
  },
  resolveLoader: {
    fallback: [cwd('node_modules')],
    root: [
      cwd('node_modules'),
      utils.dir('node_modules')
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules|bower_components/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname) + '!html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.raw\.html$/,
        loader: 'html'
      },
    ]
  },
  babel: {
    presets: [
      require('babel-preset-es2015'),
      require('babel-preset-stage-0')
    ],
    plugins: [require('babel-plugin-transform-runtime')]
  },
  postcss: [
    require('postcss-opacity'),
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: [
        'ie >= 8',
        'chrome >= 26',
        'Firefox ESR'
      ]
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    configFile: utils.dir('src/configs/angular/.eslintrc.js')
  }
};
