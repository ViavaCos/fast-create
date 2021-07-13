// const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const fileConfig = require('./config')

// 封装log
const errorLog = error => console.log(chalk.red(`${error}`))
const successLog = text => console.log(chalk.green(`${text}`))

// 生成文件
const generateFile = function(filePath, content, dirPath){
  // console.log('dirPath: ', dirPath);

  try {
    // 检测当前路径文件夹是否存在
    if(dirPath && !fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath) // 不存在, 创建文件
      // successLog(`Create ${dirPath} successfully.`)
    }

    // 检测当前路径文件是否存在
    if(fs.existsSync(filePath)) {
      errorLog('File already exists.')
    } else {
      fs.openSync(filePath, 'w') // 新建文件
      successLog(`Create ${filePath} successfully.`)
      fs.writeFileSync(filePath, content)
    }
  } catch (err) {
    errorLog(err)
  }
}

successLog(`请输入模块名称(英文)：`)

// 键盘终端输入 (process.stdin)
process.stdin.on('data', (chunk) => {
  try {
    chunk = chunk.slice(0,-2) // delete /n
    successLog(`new module name is ${chunk}`)

    const fileName = chunk.toString()
    fileConfig.forEach(file => {
      file.generate(fileName, generateFile)
    })
    
    process.stdin.emit('end')
  } catch (error) {
    errorLog(error)
  }
})
process.stdin.on('end', () => {
  successLog('create module success')
})
