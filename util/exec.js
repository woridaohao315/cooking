var spawnSync = require('cross-spawn').sync
var logger = require('./logger')

module.exports = function exec(cmd, args, opts) {
  opts = opts || {}

  var errMessage = opts.errorMessage
  var command = spawnSync(cmd, args || [], opts)

  if (command.status === 1) {
    if (command.stderr) {
      logger.fatal(errMessage || command.stderr.toString())
    }
    process.exit(1)
  }

  return command
}
