const path = require('path');
const fs = require('fs');

const ejs = require('ejs');

const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    })
  })
}

const createDirSync = (pathName) => {
  //如果pathName文件夹存在
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {//path.dirname(pathName): pathName的父路径
      // 创建文件夹
      fs.mkdirSync(pathName);
      return true;
    }
  }
}
//写入文件
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}