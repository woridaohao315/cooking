var path = require('path');
var fs = require('fs');
var cwd = require('cwd');
var CONTACTS = require('./contacts');

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
      return require(cwd('cooking.conf.js'));
    } catch(err) {
      throw Error(err);
      return;
    }
  },

  fetchUse: function() {
    return this.loadUserConfig().use || CONTACTS.USEFUL.VUE;
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
