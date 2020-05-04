'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder'); // 查看空闲端口位置，默认情况下搜索 8000 这个端口

const HOST = process.env.HOST; // processs 为 node 的一个全局对象，这里获取当前程序的环境变量，即 host
const PORT = process.env.PORT && Number(process.env.PORT);

// 通过 webpack-merge 实现 webpack.dev.conf.js 对 webpack.base.config.js 的继承
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        // 规则是工具 utils 中处理出来的 styleLoaders，生成了css,sass,postcss 等规则
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool, // 增强调试

    // these devServer options should be customized in /config/index.js
    // 此处的配置都是在 config/index.js 中设定好的
    devServer: {
        clientLogLevel: 'warning', // 控制台显示的选项有 none, error, warning 或者 info
        // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
            ]
        },
        hot: true, // 热更新
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true, // 压缩
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser, // 调试时自动打开浏览器
        // warning 和 error 都要显示
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable, // 接口代理
        // 控制台是否禁止打印警告和错误，若用 FriendlyErrorsPlugin 此处为 true
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll // 文件系统检测改动
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env')
        }),
        new webpack.HotModuleReplacementPlugin(), // 热更新的插件，修改代码时不需要刷新页面
        // 显示文件的正确名字
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // 当 webpack 编译错误的时候，来中端打包进程，防止错误代码打包到文件中
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // copy custom static assets
        // 一个文件复制的插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;
    // 查找端口号
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            // 端口被占用时就重新设置 evn 和 devServer 的端口
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port;
            // add port to devServer config
            devWebpackConfig.devServer.port = port;

            // 友好地输出信息，设置一些格式，换行、颜色等
            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
                },
                onErrors: config.dev.notifyOnErrors
                    ? utils.createNotifierCallback()
                    : undefined
            }));

            resolve(devWebpackConfig);
        }
    });
});
