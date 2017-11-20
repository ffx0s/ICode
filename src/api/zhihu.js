/**
 * 知乎日报相关接口
 */

import { Request, sleep } from '../util'

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
  const mockData = {
    'zhihu_theme.json': require('../data/zhihu_theme.json'),
    'zhihu_latest.json': require('../data/zhihu_latest.json'),
    'zhihu_news.json': require('../data/zhihu_news.json'),
    'zhihu_themeList.json': require('../data/zhihu_themeList.json')
  }
  request.get = function (url, fileName) {
    return new Promise(async (resolve, reject) => {
      await sleep(200)
      resolve(mockData[fileName])
    })
  }
}

export default {
  /**
   * 获取所有主题类目
   */
  getThemes () {
    return request.get('https://news-at.zhihu.com/api/4/themes', 'zhihu_theme.json')
  },
  /**
   * 获取最新日报列表
   */
  getLastest () {
    return request.get('https://news-at.zhihu.com/api/4/news/latest', 'zhihu_latest.json')
  },
  /**
   * 获取最热日报列表
   */
  getHotNews () {
    return request.get(`https://news-at.zhihu.com/api/3/news/hot`, 'zhihu_latest.json')
  },
  /**
   * 根据主题类目 id 获取列表
   * @param {Number} id 主题id
   */
  getThemeList (id) {
    return request.get(`https://news-at.zhihu.com/api/4/theme/${id}`, 'zhihu_themeList.json')
  },
  /**
   * 根据主题 id 获取日报内容
   * @param {Number} id 主题id
   */
  getNews (id) {
    return request.get(`https://news-at.zhihu.com/api/7/story/${id}`, 'zhihu_news.json')
  }
}
