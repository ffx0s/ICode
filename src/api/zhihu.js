/**
 * 知乎日报相关接口
 */

import { Request } from '../util'

const request = new Request()

// 统一处理 http 响应状态
request.response = response => {
  if (response.status !== 200) {
    console.log(response.status, response)
    return {}
  } else {
    return response.json()
  }
}

if (global.__DEV__) {
  request.get = function (url) {
    return new Promise((resolve, reject) => {
      let data = url.indexOf('/news/latest') !== -1 ? require('../data/zhihu_latest.json') : require('../data/zhihu_news.json')
      resolve(data)
    })
  }
}

export default {
  /**
   * 获取最新日报列表
   */
  getLastest () {
    return request.get('https://news-at.zhihu.com/api/4/news/latest')
  },
  /**
   * 获取最热日报列表
   */
  getHotNews () {
    return request.get(`https://news-at.zhihu.com/api/3/news/hot`)
  },
  /**
   * 获取日报内容
   * @param {Number} id 主题id
   */
  getNews (id) {
    return request.get(`https://news-at.zhihu.com/api/4/news/${id}`)
  }
}
