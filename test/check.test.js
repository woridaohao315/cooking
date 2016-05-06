import path from 'path'
import fs from 'fs'
import test from 'ava'
import check from '../util/check'
import PATH from '../util/path'

test('check registry', t => {
  const result = check.registry('abc')

  t.is(result, '--registry=abc')
})

test('check registry error', t => {
  const result = check.registry()

  t.is(result, '')
})

test('check init package', t => {
  check.initPluginPackage()

  t.true(fs.existsSync(path.join(PATH.PLUGIN_PATH, 'package.json')))
})

test('check pluginExists', t => {
  t.notThrows(function () {
    check.pluginExists('vue')
  })
})

test('check version', t => {
  t.notThrows(check.checkVersion)
})
