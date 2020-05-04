'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
    // 开发环境下的配置
    dev: {

        // Paths
        assetsSubDirectory: 'static', // 子目录，一般存放 js,css,images 等文件
        assetsPublicPath: '/', // 根目录
        proxyTable: {}, // 可利用这个属性解决开发环境的跨域问题

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        // 默认为 8080，改为了 2001
        port: 2001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true, // 是否在编译（输入npm run dev）后使用默认浏览器打开 http://localhost:2001/ 页面，改为了自动打开
        errorOverlay: true, // 当发生错误时，是否在浏览器界面上直接提示
        notifyOnErrors: true, // 跨平台错误提示
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        // false -> 在开发环境下，禁止 eslint 在控制台打印 错误/警告 信息
        useEslint: false,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map', // 增加调试的功能

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // 代码压缩后进行调试将非常困难，于是引入 sourcemap 记录压缩前后的位置信息，当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
        cssSourceMap: true
    },

    // 生产环境下的配置
    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'), // index.html 编译打包后生成的位置和名字，根据需要改变后缀，比如 index.php

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'), // 打包后存放生产环境代码的位置
        assetsSubDirectory: 'static', // 子目录，存放 js,css,images 等文件
        assetsPublicPath: '/', // 发布的根目录，通常本地打包 dist 后打开文件会报错，此处改为 ./。如果是上线的文件，可根据文件存放位置更改路径

        /**
         * Source Maps
         */

        productionSourceMap: true, // 是否开启 源程序映射，便于生产环境调试
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        // unit 的 gzip 命令用来压缩文件，gzip 模式下需要压缩的文件的扩展名有 js 和 css
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
