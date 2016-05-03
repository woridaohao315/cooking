import test from 'ava'
import devServer from '../util/load-server'
const defaultServer = {
  publicPath: '/',
  port: 8080,
  hot: true,
  historyApiFallback: true,
  lazy: false,
  stats: 'errors-only',
  protocol: 'http:',
  hostname: 'localhost'
}

test('default config', t => {
  const server = devServer(true)

  t.deepEqual(server, defaultServer)
})

test('disabled server', t => {
  const server = devServer(false)
  const serverA = devServer()

  t.deepEqual(server, {})
  t.deepEqual(serverA, {})
})

test('config', t => {
  const server = devServer({
    publicPath: '/dist/'
  })
  let config = defaultServer
  config.publicPath = '/dist/'

  t.deepEqual(server, config)
})
