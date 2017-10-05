/**
 * 请求数据序列化
 * @param {Object} data 数据对象
 * @return {String} 返回对数据列化后的字符串
 */
export const serialize = data => {
  return Object.keys(data).map(keyName => {
    return keyName + '=' + data[keyName]
  }).join('&')
}

/**
 * 休眠
 * @param {Number} ms 休眠时间
 * @return {Object} 返回 promise 对象
 */
export const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

/**
 * 检测对象是否为空
 * @param {Object} obj
 * @return {Boolean}
 */
export const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

/**
 * 通过时间戳计算距现在多少年/月/日/周/小时/分钟
 * @param {Number} time 时间戳
 * @return {String}
 */
export function dateFrom (time) {
  let nowTime = new Date().getTime()
  let diffValue = nowTime - time

  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let year = month * 12

  if (diffValue / year >= 1) return parseInt(diffValue / year) + '年前'
  if (diffValue / month >= 1) return parseInt(diffValue / month) + '月前'
  if (diffValue / (7 * day) >= 1) return parseInt(diffValue / (7 * day)) + '星期前'
  if (diffValue / day >= 1) return parseInt(diffValue / day) + '天前'
  if (diffValue / hour >= 1) return parseInt(diffValue / hour) + '小时前'
  if (diffValue / minute >= 1) return parseInt(diffValue / minute) + '分钟前'
  return '刚刚'
}
