import test from 'ava'
import hotReload from '../util/hot-reload'

test('load hotreload', t => {
  const entry = 'entry.js'
  const host = 'http://localhost:8080'

  const config = hotReload(entry, host, true)

  t.deepEqual(config, {
    app: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080/',
      'entry.js'
    ]
  })
})

test('multiple enty', t => {
  const entry = {
    pageA: 'pageA.js',
    pageB: 'pageB.js'
  }
  const host = 'http://localhost:8080'
  const config = hotReload(entry, host, true)

  t.deepEqual(config, {
    pageA: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080/',
      'pageA.js'
    ],
    pageB: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080/',
      'pageB.js'
    ]
  })
})

test('disabled hotreload', t => {
  const entry = 'entry.js'
  const host = 'http://localhost:8080'
  const config = hotReload(entry, host, false)

  t.deepEqual(config, {
    app: ['entry.js']
  })
})
