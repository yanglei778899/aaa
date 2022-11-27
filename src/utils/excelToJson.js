// 设置异步间隔延迟
// export function delay(interval = 0){
// }

// 把文件按照二进制进行读取
export function readFile(file){
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}

//字段对应表
export let character = {
  name: {
    text: '姓名',
    type: 'string'
  },
  phone: {
    text: '手机号',
    type: 'string'
  }
}
