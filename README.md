# Ngx Build Plugin

<p align="left">
  <a href="https://circleci.com/gh/gcirone/ngx-build-plugin">
    <img src="https://circleci.com/gh/gcirone/ngx-build-plugin.svg?style=shield" alt="CircleCI Build Status">
  </a>
  <a href="https://github.com/facebook/jest">
    <img src="https://img.shields.io/badge/tested_with-jest-99424f.svg" alt="Jest">
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

*PS: The plugin concept is based on a `ngx-build-plus` package approach created by * 

## License

ngx-build-plugin is [MIT licensed](./LICENSE).
