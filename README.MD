# cooking
全局安装 webpack 基本的配置和依赖，让所有用 vue, react 或者 angular 的项目都能共用同一个 webpack 环境。同时提供一个简易通用的 webpack 配置。

# Quick Start
Install cooking
```shell
[sudo] npm i cooking -g
```

Create project
```shell
mkdir test-vue && cd test-vue
```

Initinal project (default vue)
```shell
cooking init
```

Modify `nodeServer` or `port` option in *cooking.conf.js* if you need **webpack-dev-server**
```javascript
...
  config.nodeServer = true; // default false
  config.port = 8080; // default 8080
...

```

Finally, start cooking! (open http://localhost:8080)
```
cooking watch
```

# Command
- init [template-name]

init project, defualt use **vue**, Optional `vue`, `angular`, `react`. it will create `entry file` and *cooking.conf.js*. Or you can use custom template.

```shell
# Where `username/repo` is the GitHub repo.

cooking init username/repo
```

- watch

watch mode, support hot reload, linting, css extraction.

- build

build mode, output assets to the `dist` directory.

# Options
- -c, --config [file]

Use this if you want to specify something different than cooking.conf.js, which is the default.


# cooking.conf.js
If you need to configure webpack...

```javascript
module.exports = {
  // Required. Optional vue, react or angular.
  use: 'vue',

  // 'provide' about (0.3.0 不再支持)
  // - webpack
  // - HtmlWebpackPlugin
  // - ExtractTextPlugin
  webpack: function(provide, config) {
    var HtmlWebpackPlugin = provide.HtmlWebpackPlugin;

    // enable / disable to run node server
    // http://webpack.github.io/docs/webpack-dev-server.html
    // 决定是否开启 webpack dev server，支持 hot reload
    config.nodeServer = false;

    // node server port
    config.port = 8080;

    // entry files
    // http://webpack.github.io/docs/multiple-entry-points.html
    config.entry = {
      app: 'src/entry.js'
    };

    // output
    // be sure to use the absolute path
    // https://webpack.github.io/docs/configuration.html#configuration-object-content
    // config.output.path = __dirname + '/dist';


    // webpack plugins config
    config.plugins = (config.plugins || []).concat([
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.template.html',
        inject: true
      })
    ]);

    // eslint config. cooking provide a default eslint file. If `.eslintrc` or
    // `.eslintrc.js` exists in the current directory which will be used.
    // config.eslint.configFile = '.eslintrc';

    // Default vue, js, jsx file will pre-parsed with eslint.
    config.module.preLoaders = (config.module.preLoaders || []).concat([

    ]);

    // Or don't use preLoaders
    // config.module.preLoaders = [];

    // loaders. Default use vue, css, js(x), scss loaders.
    config.module.loaders = (config.module.loaders || []).concat([

    ]);

    // postcss
    // config.postcss = [];

    return config;
  }
};
```

# Roadmap
- 0.3.0 将去掉 `provide` 参数，获取内置模块将成

```javascript
var webpack = require('cooking/lib/webpack');
var HtmlWebpackPlugin = require('cooking/lib/html-webpack-plugin');
var ExtractTextPlugin = require('cooking/lib/extract-text-webpack-plugin');

```

# Inspiration
[@egoist/tooling](https://github.com/egoist/tooling)

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
