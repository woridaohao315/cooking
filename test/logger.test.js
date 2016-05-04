import test from 'ava'
import logger from '../util/logger'

test('logger warn', t => {
  t.notThrows(function () {
    logger.warn('ok')
  })
})

test('logger log', t => {
  t.notThrows(function () {
    logger.log('ok')
  })
})

test('logger success', t => {
  t.notThrows(function () {
    logger.success('ok')
  })
})

test('logger error', t => {
  t.notThrows(function () {
    logger.error('ok')
  })
})
