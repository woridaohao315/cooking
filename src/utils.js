var path = require('path');
var fs = require('fs');
var cwd = require('cwd');
var CONTACTS = require('./contacts');
var spawn = require('child_process').spawn;

module.exports = {
  loadWebpackConfig: function(type, use) {
    type = type || CONTACTS.DEV;
    use = use || CONTACTS.USEFUL.VUE;

    return require('./configs/' + use + '/webpack.' + type + '.conf');
  },

  dir: function(filePath) {
    return path.join(__dirname, '../' + filePath);
  },

  loadUserConfig: function() {
    try {
      return require(cwd(CONTACTS.FILE));
    } catch(err) {
      throw Error(err);
    }
  },

  fetchUse: function() {
    return this.loadUserConfig().use || CONTACTS.USEFUL.VUE;
  },

  /**
   * 将全局的 cooking 模块 link 到当前项目下
   */
  linkModule: function(cb, options) {
    if (!fs.existsSync(cwd('node_modules/cooking'))) {
      var runner = spawn('npm', ['link', 'cooking']);

      runner.on('close', function () {
        console.log('link cooking');
        cb(options);
      })
    } else {
      cb(options);
    }
  },

  mergeConfig: function(config) {
    var provide = {
      webpack: require('webpack'),
      HtmlWebpackPlugin: require('html-webpack-plugin'),
      ExtractTextPlugin: require('extract-text-webpack-plugin')
    };

    return this.loadUserConfig().webpack(provide, config);
  }
};
