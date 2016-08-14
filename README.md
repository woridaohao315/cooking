<p align="center"><a href="http://elemefe.github.io/cooking/" target="_blank"><img src="https://cdn.rawgit.com/ElemeFE/cooking/master/example/landingpage/src/assets/logo.svg"></a></p>
<h3 align="center">cooking</h3>
<p align="center">
  更易上手的前端构建工具
</p>

<p align="center">
<a target="_blank" href="https://travis-ci.org/ElemeFE/cooking"><img src="https://travis-ci.org/ElemeFE/cooking.svg?branch=master" alt="Build Status"></a>
<a target="_blank" href='https://coveralls.io/github/ElemeFE/cooking?branch=master'><img src='https://coveralls.io/repos/github/ElemeFE/cooking/badge.svg?branch=master' alt='Coverage Status' /></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/dm/cooking.svg?maxAge=2592000" alt="npm"></a>
<a target="_blank" href="https://www.npmjs.com/package/cooking"><img src="https://img.shields.io/npm/v/cooking.svg?maxAge=6000" alt="npm"></a>
<a target="_blank" href="https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link"><img src="https://img.shields.io/gitter/room/QingWei-Li/cooking.svg?maxAge=2592000" alt="Gitter"></a>
</p>

## 文档
http://cookingjs.github.io

## 讨论
使用上遇到的问题请到 [Gitter 聊天室](https://gitter.im/QingWei-Li/cooking?utm_source=share-link&utm_medium=link&utm_campaign=share-link), issue 仅仅用来处理 bug 和 feature 等的问题。

## 介绍
在项目开发中每次创建一个新项目都要去安装一堆的如 babel、webpack、eslint 等依赖，其实多数情况下每个项目的依赖和版本都是相同的；如果用 webpack 做构建工具的话，配置又较为繁琐。所以 cooking 将为你做这些事

- 全局安装开发依赖，无需每个项目重复安装
- 提供 webpack 的预配置（内置 ES6、dev server、hotload 特性），同时提供一套简洁的配置参数和函数
- 扩展配置和依赖模块化，只在需要的时候才安装且引入到配置中
- 完全兼容已有 webpack 的配置文件，除了未提供的依赖需要自己安装，其它情况下使用一致
- 内置脚手架工具
- 支持测试

## 安装

运行环境
- Node.js 4+
- npm 3+
- Python 2.7.x

```shell
npm i cooking -g
```

## 快速开始
Step 1. 创建一个 vue 项目 （将自动下载 vue 项目脚手架，只需下载一次）
```shell
$ cooking create my-project vue
$ cd my-project
```

Step 2. 开始开发
```shell
$ cooking watch
```

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
