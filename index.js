#! /usr/bin/env node
// 根据当前的环境执行 node 文件

// "配置bin以后，需要执行下 npm link 命令，这样就会把命令配置的系统的环境变量中去"

const program = require('commander'); //nodejs命令行解决方案

const helpOptions = require('./lib/core/help');

const createCommands = require('./lib/core/create');


//查看版本号
program.version(require('./package.json').version);

// 帮助和可选信息
helpOptions();

// 创建其他指令
createCommands();

program.parse(process.argv);