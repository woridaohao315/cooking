var path = require('path')
var ROOT_PATH = path.join(__dirname, '..')

exports.CWD_PATH = process.cwd()
exports.ROOT_PATH = ROOT_PATH
exports.PLUGIN_PATH = path.join(ROOT_PATH, '.cooking')
exports.LIB_PATH = path.join(ROOT_PATH, 'lib')
