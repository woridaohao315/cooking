var cwd = require('cwd');
var existsSync = require('fs').existsSync;
var deepMap = require('deep-map');
var provide = {
  'es2015': 'babel-preset-es2015',
  'stage-0': 'babel-preset-stage-0',
  'stage-2': 'babel-preset-stage-2',
  'react-hmre': 'babel-preset-react-hmre',
  'transform-runtime': 'babel-plugin-transform-runtime'
}

// @see https://github.com/babel/babel-loader/issues/149
module.exports = function (config) {
  if (!config.babel) {
    return config;
  }

  config.babel = deepMap(config.babel, function(value) {
    var module = provide[value];

    if (module) {
      return require.resolve(module);
    }

    if (existsSync(cwd('node_modules/', module))) {
      return module;
    }

    throw Error ('you should install ' + module);
  });

  return config;
};
