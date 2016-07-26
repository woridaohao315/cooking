import test from 'ava'
import is from '../util/is'

test('is string', t => {
  t.true(is.string(''))
  t.false(is.string(123))
})

test('is array', t => {
  t.true(is.array([]))
  t.false(is.array(''))
})

test('is object', t => {
  t.true(is.object({}))
  t.false(is.object(''))
})

test('is boolean', t => {
  t.true(is.boolean(true))
  t.true(is.boolean(false))
  t.false(is.boolean({}))
})

test('is function', t => {
  t.true(is.function(function () {}))
  t.false(is.function('🌚'))
})
