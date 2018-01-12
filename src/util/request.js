import { isEmptyObject, serialize } from './shared'

/**
 * API 请求方法封装
 */
export class Request {
  constructor (props) {
    // 是否启用JSON形式提交数据
    this.emulateJSON = false
    // 是否缓存
    this.cache = true
    // 请求响应函数
    this.response = response => response
    // 错误捕获函数
    this.catch = error => console.warn(error)
    // 请求选项
    this.options = {
      credentials: 'include',
      headers: {}
    }
    Object.assign(this, props)

    return this
  }
  /**
   * 封装 fetch 方法
   * @param {String} url 接口 URL
   * @param {Object} options 发送选项
   */
  fetch (url, options) {
    return window.fetch(url, options).then(this.response).catch(this.catch)
  }
  /**
   * get 方法
   * @param {String} url 接口 URL
   * @param {Object} data 请求数据
   * @param {Object} options 发送选项
   */
  get (url, data = {}, options = {}) {
    // 不缓存加时间戳
    if (!this.cache) {
      data.timeStamp = Date.now()
    }
    // 拼接数据到 URL
    if (!isEmptyObject(data)) {
      url += `?${serialize(data)}`
    }
    options.headers = { ...this.options.headers, ...options.headers }
    return this.fetch(url, Object.assign({}, this.options, options))
  }
  /**
   * post 方法
   * @param {String} url 接口 URL
   * @param {Object} data 请求数据
   * @param {Object} options 发送选项
   */
  post (url, data = {}, options = {}) {
    let postOptions = {
      method: 'post',
      headers: {
        'Accept': 'text/plain; charset=utf-8',
        'Content-type': this.emulateJSON ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    options.body = this.emulateJSON ? JSON.stringify(data) : serialize(data)
    options.headers = { ...postOptions.headers, ...this.options.headers, ...options.headers }
    return this.fetch(url, Object.assign({}, this.options, postOptions, options))
  }
}
