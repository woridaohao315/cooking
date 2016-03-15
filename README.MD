# cooking
全局安装 webpack 基本的配置和依赖，让所有用 vue, react 或者 angular 的项目都能共用同一个 webpack 环境。

# Quick Start
Install cooking
```shell
npm i cooking -g
```

Create project
```shell
mkdir test-vue & cd test-vue
```

Run cooking
```shell
cooking init & cooking watch
```

Enjoy!

# Command
- init [name]

init project, defualt use **vue**, it will create `entry file` and `cooking.conf.js`.

- watch

watch mode, support hot reload, linting, css extraction.

- build

build mode, output assets to the `dist` directory.

# cooking.conf.js

```javacript
// 'provide' about
// - webpack
// - HtmlWebpackPlugin
// - ExtractTextPlugin
module.exports = function(provide) {
  var HtmlWebpackPlugin = provide.HtmlWebpackPlugin;

  return {
    // Optional vue, react or angular
    use: '${use}',

    // enable / disable to run node server
    nodeServer: false,

    // node server port
    port: 8080,

    // entry files
    // http://webpack.github.io/docs/multiple-entry-points.html
    entry: ['entry.js'],

    // webpack plugins config
    plugins: [
      // if 'nodeServer' is true, should set 'filename' value to 'index.html'
      new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'index.template.html',
        inject: true
      })
    ],

    // webpack other config

  };
};
```

# Inspiration
[@egoist/tooling](https://github.com/egoist/tooling)

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
