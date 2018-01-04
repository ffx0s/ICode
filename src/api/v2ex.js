/**
 * v2ex 相关接口
 */

import { Request, sleep } from '../util'

const request = new Request()

// 统一处理 http 响应状态
request.response = response => {
  if (response.status !== 200) {
    console.log(response.status, response)
    return []
  } else {
    return response.json()
  }
}

if (global.__DEV__) {
  const mockData = {
    'v2ex_comment.json': require('../data/v2ex_comment.json'),
    'v2ex_topic.json': require('../data/v2ex_topic.json'),
    'v2ex_topics.json': require('../data/v2ex_topics.json')
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
   * 获取最新主题
   */
  getLastest () {
    return request.get('https://www.v2ex.com/api/topics/latest.json', 'v2ex_topics.json')
  },
  /**
   * 获取最热主题
   */
  getHot () {
    return request.get('https://www.v2ex.com/api/topics/hot.json', 'v2ex_topics.json')
  },
  /**
   * 获取主题详情
   * @param {Number} id 主题id
   */
  getDetail (id) {
    return request.get(`https://www.v2ex.com/api/topics/show.json?id=${id}`, 'v2ex_topic.json')
  },
  /**
   * 获取指定节点的主题
   * @param {String} node 节点
   */
  getNodeTopic (node) {
    return request.get(`https://www.v2ex.com/api/topics/show.json?node_name=${node}`, 'v2ex_topics.json')
  },
  /**
   * 获取主题评论
   * @param {Number} id 主题id
   */
  getComment (id) {
    return request.get(`https://www.v2ex.com/api/replies/show.json?topic_id=${id}`, 'v2ex_comment.json')
  }
}
