# Room Booking Backend Guide

> Author : [柳李逸 (Sapphire611)](https://git.shgbit.xyz:9443/liuliyi)


## Commands

```bash
yarn start // 启动项目
```

```bash
yarn test // 运行所有测试文件
```
```bash
// 运行单个测试文件，根据具体情况决定具体文件名
npx cross-env NODE_ENV=test mochapack --timeout 0 --webpack-config webpack.test.config.js $(find test -name xxx.spec.js) 
```
---

## Project Structure

```js
|-- config
|   |-- default.yaml 配置文件（开发用）
|   |-- test.yaml 配置文件（测试用）
|-- src
|   |-- infra                  // 基础设施相关 
|   |-- misc                   // 杂项
|   |   |-- error              // 自定义错误
|   |   |-- mongoose-plugins   // mongoose 相关插件
|   |-- model                  // 模型层
|   |-- schema                 // 数据校验层
|   |-- server
|   |   |-- WebServer.js       // Koa Server 启动加载项
|   |   |-- middleware         // 相关中间件
|   |   |-- routers            // 路由
|   |-- service                // 业务逻辑层
|   |-- App.js                 // 程序启动入口
|   |-- index.js               // 入口文件
|-- test                       // 单元测试相关
    |-- router                 // 以router为单位的测试
    |-- tools                  // 测试的工具类
```
