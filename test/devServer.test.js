import test from 'ava'
import devServer from '../util/load-server'
const defaultServer = {
  publicPath: '/',
  port: 8080,
  hot: true,
  enable: true,
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
  const result = {
    enable: false,
    stats: 'errors-only'
  }

  t.deepEqual(server, result)
  t.deepEqual(serverA, result)
})

test('config', t => {
  const server = devServer({
    publicPath: '/dist/'
  })
  let config = defaultServer
  config.publicPath = '/dist/'

  t.deepEqual(server, config)
})
