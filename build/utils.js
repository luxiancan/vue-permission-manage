// utils 是工具的意思，本文件是一个用来处理 css 的文件。
'use strict';
const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json');

// 导出文件的位置，判断开发环境和生产环境 => 为 config 文件中 index.js 文件中定义的 build.assetsSubDirectory 或 dev.assetsSubDirectory
exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;

    // node.js path 模块提供了一些用于处理文件路径的工具
    // 提供对路径方法的 POSIX（可移植性操作系统接口）特定实现的访问，即可跨平台，区别于 win32。
    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
    options = options || {};

    // 使用了 css-loader 和 postcss-loader，通过 options.usePostCSS 属性来判断是否使用 postcssLoader 中压缩等方法
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            });
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            // ExtractTextPlugin 可提取出文本，表示 首先使用上面处理的 loaders，当未能正确引入时使用 vue-style-loader
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            });
        } else {
            // 返回 vue-style-loader 连接 loaders 的最终值
            return ['vue-style-loader'].concat(loaders);
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(), // 需要 css-loader 和 vue-style-loader
        postcss: generateLoaders(), // 需要 css-loader,postcss-loader 和 vue-style-loader
        less: generateLoaders('less'), // 需要 less-loader 和 vue-style-loader
        // vue-cli 默认的 sass 配置
        sass: generateLoaders('sass', { indentedSyntax: true }), // 需要 sass-loader 和 vue-style-loader
        scss: generateLoaders('sass'), // 需要 sass-loader 和 vue-style-loader
        stylus: generateLoaders('stylus'), // 需要 stylus-loader 和 vue-style-loader
        styl: generateLoaders('stylus') // 需要 stylus-loader 和 vue-style-loader
    };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
    const output = [];
    const loaders = exports.cssLoaders(options);

    // 将各种 css,less,sass 等综合在一起得出结果输出 output
    for (const extension in loaders) {
        const loader = loaders[extension];
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }

    return output;
};

exports.createNotifierCallback = () => {
    // 发送跨平台通知系统
    const notifier = require('node-notifier');

    return (severity, errors) => {
        if (severity !== 'error') return;

        // 当报错时输出错误信息的标题，错误信息详情，副标题以及图标
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        });
    };
};
