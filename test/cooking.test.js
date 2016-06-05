import test from 'ava'
import webpack from 'webpack'
import cooking from '../lib/cooking'

test('cooking set path', t => {
  cooking.set({publicPath: '/'})
  t.is(cooking.config.output.publicPath, '/')

  cooking.set({entry: 'src/index.html'})
  t.is(cooking.config.entry, 'src/index.html')

  cooking.set({dist: '/dist/abc'})
  t.is(cooking.config.output.path, '/dist/abc')
  t.is(cooking.config.output.publicPath, '/dist/')
})

test('cooking set template', t => {
  let templateCount
  let templateCount2
  let templateCount3
  let templateCount4

  cooking.set({template: './src/abc.html'})
  templateCount = Object.keys(cooking.config.plugins).length

  cooking.set({
    template: {
      'index.html': './src/abc.html',
      'pageb.html': 'aaaaa.html',
      'pagec.html': 'aaaaasbbb.html'
    }
  })
  templateCount2 = Object.keys(cooking.config.plugins).length
  t.is(templateCount2 - templateCount, 2)

  cooking.set({
    template: {
      'index.html': './src/abc.html',
      'pageb.html': 'aaaaasbbb.html'
    }
  })
  templateCount3 = Object.keys(cooking.config.plugins).length
  t.is(templateCount3 - templateCount, 1)

  cooking.set({
    template: {
      'index.html': {
        template: './src/aaa.html'
      },
      'page.html': {
        name: 'haha',
        template: './src/bbb.html'
      }
    }
  })
  templateCount4 = Object.keys(cooking.config.plugins).length
  t.is(templateCount4 - templateCount, 1)
})

test('cooking set hash', t => {
  process.env.NODE_ENV = 'production'

  let hasHash = cooking.set({hash: true}).config.output.filename
  let noHash = cooking.set({}).config.output.filename
  let noHash2 = cooking.set({hash: false}).config.output.filename

  t.not(hasHash, noHash)
  t.is(noHash, noHash2)

  process.env.NODE_ENV = 'development'

  let devHasHash = cooking.set({hash: true}).config.output.filename
  let devNoHash = cooking.set().config.output.filename
  let devNoHash2 = cooking.set({hash: false}).config.output.filename

  t.is(devHasHash, devNoHash)
  t.is(devNoHash, devNoHash2)
})

test('cooking set format', t => {
  process.env.NODE_ENV = 'production'

  cooking.set({
    entry: './aaa/index.js',
    format: 'cjs'
  })

  t.is(cooking.config.output.libraryTarget, 'commonjs2')

  cooking.set({
    format: 'umd',
    moduleName: 'ABC'
  })

  t.is(cooking.config.output.library, 'ABC')
})

test('cooking set format no moduleName', t => {
  process.env.NODE_ENV = 'testing'

  t.throws(function () {
    cooking.set({
      format: 'umd'
    })
  }, 'exit')
})

test('cooking set chunk', t => {
  cooking.set({
    chunk: 'vendor'
  })

  const chunk = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor')

  t.truthy(cooking.config.plugins['commons-chunk'])
  t.is(cooking.config.plugins['commons-chunk'].chunkNames, chunk.chunkNames)
  t.is(cooking.config.plugins['commons-chunk'].filenameTemplate, chunk.filenameTemplate)

  cooking.set({
    chunk: {
      chunkA: {
        name: 'commonsA',
        filename: 'commonsA.js'
      },
      chunkB: {
        name: 'commonsB'
      },
      chunkC: {
        chunks: ['vendor', 'pageA']
      }
    }
  })

  const chunkA = new webpack.optimize.CommonsChunkPlugin({
    name: 'commonsA',
    filename: 'commonsA.js'
  })
  const chunkC = new webpack.optimize.CommonsChunkPlugin({
    chunks: ['vendor', 'pageA']
  })

  // 插件存在
  t.truthy(cooking.config.plugins['chunkB-chunk'])

  // 设置参数
  t.is(cooking.config.plugins['chunkA-chunk'].chunkNames, chunkA.chunkNames)
  t.is(cooking.config.plugins['chunkA-chunk'].filenameTemplate, chunkA.filenameTemplate)

  // 设置 chunks
  t.deepEqual(cooking.config.plugins['chunkC-chunk'].selectedChunks, chunkC.selectedChunks)
})

test('cooking set extractCSS', t => {
  process.env.NODE_ENV = 'production'

  cooking.set({
    extractCSS: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    extractCSS: true,
    hash: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].[contenthash:7].css')

  cooking.set({
    extractCSS: false
  })

  t.falsy(cooking.config.plugins.ExtractText)

  cooking.set({
    extractCSS: '[name].abc.css'
  })

  t.is(cooking.config.plugins.ExtractText.filename, '[name].abc.css')

  process.env.NODE_ENV = 'development'
  cooking.set({
    extractCSS: '[name].abc.css'
  })
  t.falsy(cooking.config.plugins.ExtractText)
})

test('cooking set extractCSS in development', t => {
  process.env.NODE_ENV = 'development'

  cooking.set({
    devServer: {
      extractCSS: true
    }
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    devServer: {
      extractCSS: true
    },
    hash: true
  })

  t.truthy(cooking.config.plugins.ExtractText)
  t.is(cooking.config.plugins.ExtractText.filename, '[name].css')

  cooking.set({
    extractCSS: false
  })

  t.falsy(cooking.config.plugins.ExtractText)

  cooking.set({
    devServer: {
      extractCSS: '[name].abc.css'
    }
  })

  t.is(cooking.config.plugins.ExtractText.filename, '[name].abc.css')
})

test('cooking clean', t => {
  cooking.set({
    clean: true
  })

  t.true(cooking.config.__COOKING_CLEAN__)

  cooking.set({
    clean: false
  })

  t.false(cooking.config.__COOKING_CLEAN__)
})

test('add method', t => {
  const loaderMP4Config = {
    test: /\.mp4$/,
    loaders: ['file-loader']
  }
  const loaderJSONConfig = {
    test: /\.json$/,
    loaders: ['ahhhh']
  }

  cooking.set()
  cooking.add('loader.mp4', loaderMP4Config)
  cooking.add('loader.json', loaderJSONConfig)

  t.deepEqual(cooking.config.module.loaders.mp4, loaderMP4Config)
  t.deepEqual(cooking.config.module.loaders.json, loaderJSONConfig)
})

test('remove method', t => {
  cooking.set()
  cooking.remove('loader.js')

  t.falsy(cooking.config.module.loaders.js)
})

test('resolve mothod', t => {
  cooking.set()

  const config = cooking.resolve()

  t.true(Array.isArray(config.module.loaders))
  t.true(Array.isArray(config.plugins))
})
