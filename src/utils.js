var path = require('path');
var fs = require('fs');
var cwd = require('cwd');
var CONTACTS = require('./contacts');
var merge = require('webpack-merge');

module.exports = {
  loadWebpackConfig: function(type, use) {
    type = type || CONTACTS.DEV;
    use = use || CONTACTS.USEFUL.VUE;

    return require('./configs/' + use + '/webpack.' + type + '.conf');
  },

  dir: function(filePath) {
    return path.join(__dirname, '../' + filePath);
  },

  moveFile: function(oldPath, targetPath) {
    try {
      var readStream = fs.createReadStream(oldPath);
      var writeStream = fs.createWriteStream(targetPath);

      readStream.pipe(writeStream);
    } catch (e) {
      throw Error(e);
    }
  },

  loadUserConfig: function() {
    var provide = {
      webpack: require('webpack'),
      HtmlWebpackPlugin: require('html-webpack-plugin'),
      ExtractTextPlugin: require('extract-text-webpack-plugin')
    };

    try {
      return require(cwd('cooking.conf.js'))(provide);
    } catch(err) {
      throw Error(err);
      return;
    }
  },

  webpackMerge: function(a, b) {
    return merge(a, b);
  }
};
