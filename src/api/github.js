/**
 * github 相关接口
 */

import GitHubTrending from 'GitHubTrending'
import { Request } from '../util'

const trending = new GitHubTrending()
const request = new Request()

// 统一处理 http 响应状态
request.response = response => {
  if (response.status !== 200) {
    console.log(response.status, response)
    return {items: []}
  } else {
    return response.json()
  }
}

export default {
  /**
   * 
   * @param {String} language 编程语言
   * @param {String} since 时间 (三选一：daily / weekly / monthly)
   */
  getTrending (since = 'daily', language = '') {
    return trending.fetchTrending(`https://github.com/trending/${language}?since=${since}`)
  },
  /**
   * 搜索项目
   * @param {String} key 关键字
   * @param {Number} page 当前页
   */
  search (key, page) {
    return request.get(`https://api.github.com/search/repositories?q=${key}&page=${page}`)
  }
}
