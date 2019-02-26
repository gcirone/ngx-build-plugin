# Ngx Build Plugin

<p align="left">
  <a href="https://www.npmjs.com/package/ngx-build-plugin">
    <img src="https://img.shields.io/npm/v/ngx-build-plugin.svg?style=flat-square" alt="CircleCI Build Status">
  </a>
  <a href="https://circleci.com/gh/gcirone/ngx-build-plugin">
    <img src="https://circleci.com/gh/gcirone/ngx-build-plugin.svg?style=shield" alt="CircleCI Build Status">
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg?style=flat-square" alt="Jest">
  </a>
  <a href="https://codecov.io/gh/gcirone/ngx-build-plugin">
    <img src="https://codecov.io/gh/gcirone/ngx-build-plugin/branch/master/graph/badge.svg" alt="Codecov" />
  </a>
</p>

Enhance Angular CLI's default build configuration by plugging a custom one.

This package gives low-level access to the default configuration without providing a webpack merge behavior. Feel free to add your specific use case without limitations.


## Installation

*In the commands below I'll use [yarn](https://yarnpkg.com) but you could use [npm](https://www.npmjs.com) instead.*

```
yarn add -D ngx-build-plugin
```

## Usage

- In your `angular.json` file:
  ```
  "architect-target": {
    "build": {
      "builder": "ngx-build-plugin:browser",
      "options": {
        "plugin": "config/ng-build.config.js",
        ...
      }
    }
  }
  ```
  Where:
  - `builder` support one of the following builders [[browser](#browser)|[server](#server)] *(soon dev-server and karma)*.
  - `plugin` (**required**) should contain a valid path for the javascript plugin file relative to the **workspace root**.

- Then run the build architect like this:  
  `ng [architect-target]` or `ng run [project]:[architect-target]` 

It's possible to change the plugin javascript file by using the `--plugin` switch:

`ng [architect-target] --plugin other-path/ng-build.config.js`

## Builders

 - [ngx-build-plugin:browser](#browser)
 - [ngx-build-plugin:server](#server)
 

## Plugin

The plugin empowers you to change the default webpack **config** by hooking  it before running the builder architect, so it's possible to full override if needed. 

In addition, the plugin provides **pre** and **post** hook for tasks that need to happen before and after building.

For example:
```javascript
module.exports = {
  pre(builderConfig) {
    console.log('pre');
  },
  
  config(webpackConfig) {
    console.log('config');
    return webpackConfig;
  },
  
  post(builderConfig) {
    console.log('post');
  }
}
```

*PS: The plugin concept is based on the [ngx-build-plus](https://www.npmjs.com/package/ngx-build-plus) package approach created by [@ManfredSteyer](https://twitter.com/ManfredSteyer)* 

## Examples

A few examples that show the `ng-build-plugin` usages:

### Change build progress plugin

Use a progress bar plugin for webpack ([progress-bar-webpack-plugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)).

```javascript
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  config(webpackConfig) {
    webpackConfig.plugins.forEach((plugin, index) => {
      if (plugin.constructor.name === 'ProgressPlugin') {
        webpackConfig.plugins[index] = new ProgressBarPlugin();
      }
    });

    return webpackConfig;
  }
}
```

To execute this plugin check the [usage](#usage) above.

*Note: no webpack merge plugin used just plugin instance replace.*

### Use custom webpack merge strategy

It's possible to use [webpack-merge](https://www.npmjs.com/package/webpack-merge) with different strategy based on your specific use case:

```javascript
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = {
  config(webpackConfig) {
    const strategy = merge.strategy({
      externals: 'append',
      plugins: 'prepend'
    });

    return strategy (webpackConfig, {
      externals: [/^@angular/],
      plugins: [
        new webpack.DefinePlugin({
          VERSION: JSON.stringify('1.0.1')
        })
      ]
    });
  }
};
```

To execute this plugin check the [usage](#usage) above.

## Changelog

[GitHub Releases](https://github.com/gcirone/ngx-build-plugin/releases)

## Contributing

Thank you for contributions!

### Feature Implementing

Please use GitHub Pull Requests.

There are some scripts to help developments.

- `yarn build` - Make *build/package* directory from src directory.
- `yarn build:watch` - Watch for files changes and rebuild package directory.
- `yarn build:clean` - Delete directories which are created by other commands.
- `yarn test` - Run tests and collect coverage (html report in *build/coverage*).
- `yarn test:watch` - Run tests when each file was modified.
- `yarn lint` - Run TSLint.
- `yarn prettier` - Run Prettier.

## License

ngx-build-plugin is [MIT licensed](./LICENSE).
