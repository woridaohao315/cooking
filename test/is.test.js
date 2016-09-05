import test from 'ava'
import is from '../packages/cooking/util/is'

test('is String', t => {
  t.true(is.String(''))
  t.false(is.String(123))
})

test('is Array', t => {
  t.true(is.Array([]))
  t.false(is.Array(''))
})

test('is Object', t => {
  t.true(is.Object({}))
  t.false(is.Object(''))
})

test('is Boolean', t => {
  t.true(is.Boolean(true))
  t.true(is.Boolean(false))
  t.false(is.Boolean({}))
})

test('is Function', t => {
  t.true(is.Function(function () {}))
  t.false(is.Function('🌚'))
})
