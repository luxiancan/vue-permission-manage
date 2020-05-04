'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

// webpack-merge 提供了一个合并函数，它可以合并对象并将合并的对象返回。这里将 dev 和 prod 进行合并
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
