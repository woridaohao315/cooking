# cooking
提供基本 webpack 的配置和运行环境，立刻开始开发 vue, react 或 angular 的项目。

# Quick Start
1. Install cooking
```shell
npm i cooking -g
```

2. Create project
```shell
mkdir test-vue & cd test-vue
```

3. Run cooking
```shell
cooking init & cooking watch
```

4. Enjoy!

# Command
- init [name]

init project, defualt use **vue**, it will create `entry file` and `cooking.conf.js`.

- watch

watch mode, support hot reload, linting, css extraction.

- build

build mode, output assets to the `dist` directory.

# cooking.conf.js

Configure your webpack.

# Inspiration
[@egoist/tooling](https://github.com/egoist/tooling)

# License
[MIT](https://github.com/ElemeFE/cooking/LICENSE)
