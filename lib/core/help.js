const program = require('commander');

const helpOptions = () => {
  // 添加自己的option
  program.option('-w --why', 'a coderwhy option');

  program.option('-s --src <src>', 'a source folder');
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/pages, 错误/src/pages');
  program.option('-f --framework <framework>', 'your framework name');

  //监听某个(--help)命令
  program.on('--help', function () {
    console.log(" ");
    console.log("other:");
    console.log("  other option~");
  })
}

module.exports = helpOptions;