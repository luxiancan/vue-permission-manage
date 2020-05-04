// 此文件文件用于检测 node 和 npm 的版本，实现版本依赖
'use strict';
const chalk = require('chalk');
const semver = require('semver'); // 对版本进行检查的插件
const packageConfig = require('../package.json');
const shell = require('shelljs');

function exec(cmd) {
    // 返回通过 child_process 模块的新建子进程，执行 Unix 系统命令后转成前后没有空格的字符串
    return require('child_process').execSync(cmd).toString().trim();
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version), // 使用 semver 格式化版本
        versionRequirement: packageConfig.engines.node // 获取 package.json 中设置的 node 版本
    }
];

if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'), // 自动调用 npm --version 命令，并且把参数返回给 exec 函数，从而获取纯净的版本号
        versionRequirement: packageConfig.engines.npm
    });
}

module.exports = function() {
    const warnings = [];

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i];

        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            // 上面这个判断就是如果版本号不符合 package.json 文件中指定的版本号，就执行下面错误提示的代码
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
            );
        }
    }

    if (warnings.length) {
        console.log('');
        console.log(chalk.yellow('To use this template, you must update following to modules:'));
        console.log();

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i];
            console.log('  ' + warning);
        }

        console.log();
        process.exit(1);
    }
};
