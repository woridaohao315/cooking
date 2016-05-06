import test from 'ava'
import loadPackage from '../util/load-package'

test('load package fail', t => {
  process.env.NODE_ENV = 'testing'

  t.is(loadPackage(), undefined)
  t.throws(function () {
    loadPackage({})
  })
  t.throws(function () {
    loadPackage(123)
  })
})
