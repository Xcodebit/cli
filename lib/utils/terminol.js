/**
 * 执行终端命令相关代码
 */ 

const { spawn } = require('child_process');

const commandSpawn = (...args) => { // ...args可选参数
  return new Promise((resolve, reject) => {
    //开启一个子进程
    const childProcess = spawn(...args);

    //stdout.pipe:输出流; process.stdout:当前进程流
    childProcess.stdout.pipe(process.stdout);//把输出流里面的信息放到当前进程的流里面
    childProcess.stderr.pipe(process.stderr);//把输出流里面的错误信息放到当前进程的错误流里面
    
    //监听关闭
    childProcess.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  commandSpawn
}