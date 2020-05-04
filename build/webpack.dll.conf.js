var path = require('path');
var webpack = require('webpack');

/* 将特定的类库提前打包然后引入，不但能够极大减少打包时间，
也实现了将公共代码抽离成单独文件的优化方案，可以很大程度的减小打包之后的文件体积。 */

module.exports = {
    // 你想要提前打包的类库的数组。注意 vue 要写成别名
    entry: {
        // 如果这些类库有版本更新了（一般很少更新），就需要重新执行 npm run dll 打包类库，再执行 npm run build 打包项目上线
        // 这里用 vendor 作为 key 值表示后文用到的 [name] ，后续生成的打包文件就为 vendor-manifest.json  vendor.dll.js
        vendor: ['vue/dist/vue.esm.js', 'vuex', 'axios', 'vue-router', 'element-ui', 'echarts']
    },
    output: {
        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置，放到项目根目录的 static/js 下
        filename: '[name].dll.js', // 打包后的文件名 vendor.dll.js
        library: '[name]_library'
        // vendor.dll.js 中暴露出的全局变量名，主要是给 DllPlugin 中的 name 使用。
        // 所以这里需要和 webpack.DllPlugin 中的 name: '[name]_library', 保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            // manifest.json 生成的文件夹及名字，这里路径写成 .. 代表上一级目录，也就是让它生成在了根目录下
            path: path.join(__dirname, '../[name]-manifest.json'),
            // 和 output.library 保持一致即可
            name: '[name]_library',
            // manifest 文件中请求的上下文，默认为本文件的上下文
            context: __dirname
        }),
        // 压缩打包的文件，使用 UglifyJsPlugin 插件压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
