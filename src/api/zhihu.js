/**
 * 知乎日报相关接口
 */

import { Request } from '../util'

const apiDomain = global.__DEV__ ? 'http://127.0.0.1:3000/mock/11' : 'https://news-at.zhihu.com'
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

export default {
  /**
   * 获取所有主题类目
   */
  getThemes () {
    return request.get(`${apiDomain}/api/4/themes`)
  },
  /**
   * 获取最新日报列表
   */
  getLastest () {
    return request.get(`${apiDomain}/api/4/news/latest`)
  },
  /**
   * 获取最热日报列表
   */
  getHotNews () {
    return request.get(`${apiDomain}/api/3/news/hot`)
  },
  /**
   * 根据主题类目 id 获取列表
   * @param {Number} id 主题id
   */
  getThemeList (id) {
    return request.get(`${apiDomain}/api/4/theme/${id}`)
  },
  /**
   * 根据主题 id 获取日报内容
   * @param {Number} id 主题id
   */
  getNews (id) {
    return request.get(`${apiDomain}/api/7/story/${id}`)
  }
}
