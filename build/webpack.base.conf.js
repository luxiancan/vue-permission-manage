'use strict';
const path = require('path');
const webpack = require('webpack');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    // 拼接出绝对路径
    return path.join(__dirname, '..', dir);
}

// 配置 eslint-loader
const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
});

module.exports = {
    // path.join 将路径片段进行拼接，而 path.resolve 将以 / 开始的路径片段作为根目录，在此之前的路径将会被丢弃
    context: path.resolve(__dirname, '../'),
    // 配置入口，默认为单页面所以只有 app 一个入口
    entry: {
        // app: './src/main.js' // vue-cli 默认的配置
        app: ['babel-polyfill', './src/main.js'] // 使用 babel-polyfill 将 es6 转换为 es5
    },
    // 配置出口，默认是 /dist 作为目标文件夹的路径
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        // 公共存放路径，根据环境变量做判断，使用不同的路径
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        // 导入文件时，如果没写后缀将根据这里的配置进行寻找匹配，自动扩展后缀，比如一个 js 文件，则引用时书写可不用写 .js
        // 后缀列表要尽可能小，频率出现最高的文件后缀要优先放在最前面，
        // 在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。根据配置列表如果找不到的话就报错。
        extensions: ['.js', '.vue', '.json'],
        // 创建引用路径的别名，比如增加 'components': resolve('src/components') 等
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    // 使用插件配置相应文件的处理方法
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            // 使用 vue-loader 将 vue 文件转化成 js 的模块①
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            // 配置 babel-loader，只应用在 js 文件
            {
                test: /\.js$/,
                // 将 Babel 编译过的文件缓存起来，下次只需要编译更改过的代码文件即可，这样可以加快打包时间
                loader: 'babel-loader?cacheDirectory=true',
                // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
                // 只在 src 文件夹下查找。上面注释掉的代码是默认的，目前没有做单元测试
                include: [resolve('src')],
                // 不会去查找的路径
                exclude: /node_modules/
            },
            // 图片、音像、字体都使用 url-loader 进行处理，超过 10000 会编译成 base64
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname, // 与 Dllplugin 里的 context 所指向的上下文保持一致，这里都是指向了当前文件的 build 目录
            manifest: require('../vendor-manifest.json') // 引入 Dllplugin 所生成的的 manifest
        })
    ],
    // 以下选项是 node.js 全局变量或模块，这里主要是防止 webpack 注入一些 node.js 的东西到 vue 中
    node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
