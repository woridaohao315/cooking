module.exports = {
  // Required. Optional vue, react or angular.
  use: 'angular',

  // 'provide' about
  // - webpack
  // - HtmlWebpackPlugin
  // - ExtractTextPlugin
  webpack: function(provide, config) {
    var HtmlWebpackPlugin = provide.HtmlWebpackPlugin;

    // enable / disable to run node server
    config.nodeServer = false;

    // node server port
    config.port = 8080;

    // entry files
    // http://webpack.github.io/docs/multiple-entry-points.html
    config.entry = {
      app: 'src/entry.js'
    };

    // output
    // be sure to use the absolute path
    // https://webpack.github.io/docs/configuration.html#configuration-object-content
    // config.output.path = __dirname + '/dist';

    // webpack plugins config
    config.plugins = (config.plugins || []).concat([
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.template.html',
        inject: true
      })
    ]);

    // eslint config. cooking provide a default eslint file. If `.eslintrc` or
    // `.eslintrc.js` exists in the current directory which will be used.
    // config.eslint.configFile = '.eslintrc';

    // Default vue, js, jsx file will pre-parsed with eslint.
    config.module.preLoaders = (config.module.preLoaders || []).concat([

    ]);

    // Or don't use preLoaders
    // config.module.preLoaders = [];

    // loaders. Default use vue, css, js(x), scss loaders.
    config.module.loaders = (config.module.loaders || []).concat([

    ]);

    // postcss
    // config.postcss = [];

    return config;
  }
};
