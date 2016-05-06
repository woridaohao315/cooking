import test from 'ava'
import exec from '../util/exec'

test('exec', t => {
  t.notThrows(function () {
    exec('echo', ['hello world'])
  })

  t.notThrows(function () {
    exec('echo', ['hello world'], {
      stdio: 'inherit',
      errMessage: 'error'
    })
  })
})
