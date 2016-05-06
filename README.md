# cooking [![Build Status](https://travis-ci.org/ElemeFE/cooking.svg?branch=master)](https://travis-ci.org/ElemeFE/cooking) [![Coverage Status](https://coveralls.io/repos/github/ElemeFE/cooking/badge.svg?branch=master)](https://coveralls.io/github/ElemeFE/cooking?branch=master) [![npm](https://img.shields.io/npm/dm/cooking.svg?maxAge=2592000)](https://www.npmjs.com/package/cooking) [![npm](https://img.shields.io/npm/v/cooking.svg?maxAge=2592000)](https://www.npmjs.com/package/cooking)

> 基于 webpack 的模块化构建工具

## 文档
http://cookingjs.github.io

在项目开发中每次创建一个新项目都要去安装一堆的如 babel、webpack、eslint 等依赖，其实多数情况下每个项目的依赖和版本都是相同的；如果用 webpack 做构建工具的话，配置又较为繁琐。所以 cooking 将为你做这些事

- 全局安装依赖，无需每个项目重复安装
- 提供 webpack 的预配置（内置 ES6、dev server、hotload 特性），同时提供一套简洁的配置参数和函数
- 扩展配置和依赖模块化，只在需要的时候才安装且引入到配置中
- 完全兼容已有 webpack 的配置文件，除了未提供的依赖需要自己安装，其它情况下使用一致
- 内置脚手架工具


## 安装
**只能使用 NPM 3 及其以上版本安装**

```shell
npm i cooking -g
```

## 快速开始
Step 1. 创建一个 vue 项目 （将自动下载 vue 项目脚手架，只需下载一次）
```shell
> cooking create my-project vue
> cd my-project
```

Step 2. 开始开发
```shell
> cooking watch
```


## cooking.conf.js
cooking 将 webpack 的配置重新包装过，提供的基础配置能满足大部分项目的需求。同时提供的 `add`, `remove` 方法能方便去增加（覆盖）和删除已有配置。以下为提供的完整配置，除了 entry 和具体说明的外其他都是默认配置。

```javascript
var cooking = require('cooking')

cooking.set({
  // 当前项目需要引入的依赖包
  use: '',
  // 入口文件。同 webpack 的 entry，接受 String|Array|Object，使用相对路径
  entry: './src/entry.js',
  // 项目输出路径。同 output.path，使用相对路径
  dist: './dist',
  // 模板文件。使用 html-webpack-plugin，接受 Boolean|String|Object
  // 填 true 会自动创建 index.html
  // 填 String（模板相对路径）会使用模板创建 index.html
  // 填 Object，可指定 filename, template，参数同 html-webpack-plugin
  template: {
    'index.html': './src/index.template.html'
  },

  // Development
  // 内置 webpack dev server，配置与其一致。
  // 填 true 会启动 devServer 并采用默认配置，false 将不启用
  // 填 Object 会与下面默认配置进行 merge
  devServer: {
    // 与 webpack 文档不同的是，这里的 publicPath 会覆盖 output.publicPath (启动 server 时)
    publicPath: '/',
    // 是否启用 dev server
    enable: false,
    // 端口
    port: 8080,
    // 热替换
    hot: true,
    // HTML5 history API
    historyApiFallback: true,
    noInfo: true,
    quiet: false,
    lazy: false,
    stats: 'errors-only',
    protocol: 'http:',
    hostname: 'localhost'
  },

  // Production
  // build 时候清理 dist 目录
  clean: true,
  // 构建的文件带 hash
  hash: false,
  // 访问路径
  publicPath: '/dist/',
  // 静态资源路径，相对于 publicPath
  assetsPath: 'static',
  // 带 source map
  sourceMap: false,
  // 多大以内的资源内嵌到 JS/CSS 中（单位 Byte)
  urlLoaderLimit: 10000,
  // 接受 amd cjs umd var，其中 cjs 会被翻译成  webpack 的 commonjs2
  format: 'var',
  // 如果format 为 'umd' 或 'amd'，需要设置该值
  moduleName: '',

  // 会加载 CommonsChunkPlugin，接受 String|Object
  // 如果有多个可以配制成 Object, {'name': 'filename'}
  chunk: 'vendor',

  // 提取 CSS，接受 Boolean|String
  // 填 true 会提取 CSS 并以 '[name].[contenthash:7].css' 命名文件，false 为不提取
  // 填 string 是自定义文件名
  extractCSS: '[name].[contenthash:7].css',

  // 加载额外的配置，默认为空，接受 Array|Object，其中 Object 可以为插件传参数
  extends: ['vue']
})

// 调用 resolve 会生成 webpack 配置
module.exports = cooking.resolve()

```

## 提供的方法
### set(config: Object)
自定义配置

### add(path: string, options: Object)
原有的 webpack 中 loader 和 plugin 配置都是传入的数组，想去修改预配置就变得不方便。提供的 add 方法能直接在配置中插入或覆盖原有 loader 或者 plugin，支持修改 loader, preLoader, postLoader 以及 plugin。（当然其他的路径也是支持的，如果你知道 webpack 配置的路径的话）

```javascript
var webpack = require('webpack')

cooking.add('loader.vue', {
  test: /\.vue$/,
  loader: ['vue-loader']
})

cooking.add('plugin.NoErrors', new webpack.NoErrorsPlugin())

// 其实这种也是支持的
cooking.add('output.filename', '[name].bundle.js')
```
将会被翻译成
```javascript
{
  module: {
    loaders: [
     //...
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      //...
    ]
  },

  plugins: [
    //...
    new webpack.NoErrorsPlugin()
  ]
}
```

### remove(path: string)
移除 loader/plugin
```javascript
cooking.remove('loader.vue')
```

### resolve()
生成 webpack 配置。
```javascript
var config = cooking.resolve()

// 你可以继续去扩展你的配置
config.resolve.extensions.push('.json')
```

## 命令
### config
配置默认信息

```shell
# 查看配置信息
> cooking config
# 配置属性，value 不填则清空
> cooking config <option> [value]
```

目前支持的配置内容如下
```javascript
{
  // 执行 cooking init 默认使用的模版，默认为 vue
  "template": "vue",
  // update, init, import 时的镜像，国内用户可配配置成 taobao 镜像，默认为空
  "registry": "https://registry.npm.taobao.org",
  // 是否自动检查更新，cooking 版本升级会有提示
  "updateCheck": true,
  // 脚手架会读取配置的 github repository, author
  "github": "",
  "author": ""
}
```

### create
创建目录并初始化项目（生成后并不会自动进入目录）
```shell
> cooking create <project-name> <template>
```

### init
初始化项目
```shell
> cooking init <template>
```

### watch
开发模式(Development)
```shell
> cooking watch
```
默认使用 cooking.conf.js 文件，可自己指定
```shell
> cooking watch -c <configfile>
```

### build
生产模式(Production)，打包、合并、压缩等
```shell
> cooking build
```

默认使用 cooking.conf.js 文件，可自己指定
```shell
> cooking build -c <configfile>
```

### import
安装插件
```shell
> cooking import <plugin-name>
```

安装依赖包
```shell
> cooking import <package-name> -p
```


### remove
卸载插件
```shell
> cooking remove <plugin-name>
```

卸载脚手架
```shell
> cooking remove <template-name> -t
```

卸载依赖包
```shell
> cooking remove <package-name> -p
```


### update
更新插件，可指定版本号，同 npm update
```shell
> cooking update <plugin-name>
```

更新脚手架
```shell
> cooking update <template-name> -t
```

更新依赖包
```shell
> cooking update <package-name> -p
```

### list
查看安装的插件和脚手架
```shell
> cooking list
```

## 依赖包列表
- [vue](https://github.com/cookingjs/cooking-package-vue) 提供 vue、vuex、vue-router 和 vue-resource

## 插件列表
- [vue](https://github.com/cookingjs/cooking-vue) vue 相关配置
- [sass](https://github.com/cookingjs/cooking-sass) sass 配置
- [postcss](https://github.com/cookingjs/cooking-postcss) postcss-loader, 内置 cssnext
- [lint](https://github.com/cookingjs/cooking-lint) lint 在 JS 文件 babel 之前
- [lint-cli](https://github.com/cookingjs/cooking-lint-cli) 增加 lint 的命令 （开发中）

### 如何写插件
规定插件项目要以 cooking-* 命名，如果是命令行工具命名为 cooking-*-cli
```javascript
/**
 * @param  {object} cooking - 提供 add, remove 和 config
 * @param  {*} options - 支持自定义参数
 */
module.exports = function (cooking, options) {
  // do it
};
```


可以直接初始化一个插件的项目
```shell
> cooking init plugin
```


## 脚手架列表
- [vue](https://github.com/cookingjs/slush-cooking-vue) 基础的 vue 的脚手架
- [plugin](https://github.com/cookingjs/slush-cooking-plugin) 开发 cooking 插件的脚手架
- [generator](https://github.com/cookingjs/slush-cooking-generator) 开发 cooking 脚手架的脚手架

### 如何写脚手架
脚手架项目的命名为 slush-cooking-*，内置的脚手架工具为 [slush](https://github.com/slushjs/slush)，当然这里也提供了写脚手架的脚手架。

```shell
> cooking init generator
```

## FAQ
- eslint-loader 使用 warning 而不是 error 的原因

eslint 默认是触发 error，这将会打断 webpack 的 build，解决方法是去掉 webpack 的 NoErrorsPlugin，但是这样又不能保证 webpack 构建报错时不自动中断；另一种方法是把 eslint 触发 error 改成 warn。因此当使用 lint 插件时看到的提示是 warn

``` javascript
eslint: {
  emitWarning: true
}
```

- loader 不要使用简写

如果需要增加新 loader, 或者使用自己的 webpack 配置, 请将 loader 改成完整名字而不是简写。如果用户本地安装了 vue 依赖, 查找路径的顺序问题会把用户的 vue 模块当作 vue-loader 使用导致报错。[link](http://stackoverflow.com/questions/29883534/webpack-node-modules-css-index-js-didnt-return-a-function)

```javascript
cooking.add('loader.vue', {
  test: /\.vue$/,
  loaders: ['vue-loader']
})

// 而不是
cooking.add('loader.vue', {
  test: /\.vue$/,
  loaders: ['vue']
})
```


- babel 配置

虽然提供 babel 相关插件，但是并没有提供默认配置，所以你可以直接在项目下创建 .babelrc 文件或者写到配置文件里。默认提供的插件如下

.babelrc
```javascript
{
  presets: ['es2015', 'stage-0', 'stage-2'],
  plugins: ['transform-runtime']
}
```

- eslint 配置

创建一个 .eslintrc 到项目目录下，如果安装了 cooking-lint 会提供几种配置，例如引入 elemefe

.eslintrc
```javascript
{
  "plugins": ["vue"], // 如果你是 vue 项目的话
  "extends": ["elemefe"]
}
```


## RoadMap
- 支持指令插件，可自定义指令，例如新增一个 cooking lint

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
