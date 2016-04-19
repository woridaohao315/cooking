var logger = require('./logger')
var spawnSync = require('child_process').spawnSync

module.exports = function exec(cmd, args, opts) {
  var errMessage = opts.errorMessage
  var command = spawnSync(cmd, args || [], opts)

  delete opts.errorMessage

  if (command.status === 1) {
    if (command.stderr) {
      logger.fatal(errMessage || command.stderr.toString())
    }
    process.exit(1)
  }

  return command
}