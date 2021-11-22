const { promisify } = require('util'); //promisify将函数转化成promise形式
const download = promisify(require('download-git-repo')) //download-git-repo下载插件
const { open } = require('open');
const path = require('path');

const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminol');
const { compile, writeToFile, createDirSync } = require('../utils/utils');

// 创建项目action
const createProjectAction = async (project) => {
  console.log('why helps you create your project~')

  // 1.clone项目
  await download(vueRepo, project, { clone: true });
  
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'; //window系统上npm实际执行的是npm.cmd
  await commandSpawn(command, ['install'], { cwd: `./${project}` });
  // 3.运行 npm run server
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  // 4.打开浏览器
  open('http://localhost:8080/');
}

// 添加组件action
const addCompomentAction = async (name, dest) => {
  // 1.编译ejs模板
  const result = await compile('vue-component.ejs', { name, lowerName: name.toLowerCase() });

  // 2.写入文件
  const targetPath = path.resolve(dest, `${name}.vue`);
  writeToFile(targetPath, result);
}

// 添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // const data = { name, lowerName: name.toLowerCase() };
  // const pageResult = await compile('vue-component.ejs', data);
  // const routeResult = await compile('vue-router.ejs', data);

  // // 写入文件
  // if (createDirSync(dest)) {
  //   const targetPagePath = path.resolve(dest, `${name}.vue`);
  //   const targetRoutePath = path.resolve(dest, 'router.js');
  //   writeToFile(targetPagePath, pageResult);
  //   writeToFile(targetRoutePath, routeResult);
  // }
}

module.exports = {
  createProjectAction,
  addCompomentAction,
  addPageAndRoute
}