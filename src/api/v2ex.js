/**
 * v2ex 相关接口
 */

import { Request } from '../util'

const apiDomain = global.__DEV__ ? 'http://127.0.0.1:3000/mock/11' : 'https://www.v2ex.com'
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

export default {
  /**
   * 获取最新主题
   */
  getLastest () {
    return request.get(`${apiDomain}/api/topics/latest.json`)
  },
  /**
   * 获取最热主题
   */
  getHot () {
    return request.get(`${apiDomain}/api/topics/hot.json`)
  },
  /**
   * 获取主题详情
   * @param {Number} id 主题id
   */
  getDetail (id) {
    return request.get(`${apiDomain}/api/topics/show.json?id=${id}`)
  },
  /**
   * 获取指定节点的主题
   * @param {String} node 节点
   */
  getNodeTopic (node) {
    return request.get(`${apiDomain}/api/topics/show.json?node_name=${node}`)
  },
  /**
   * 获取主题评论
   * @param {Number} id 主题id
   */
  getComment (id) {
    return request.get(`${apiDomain}/api/replies/show.json?topic_id=${id}`)
  }
}
