/**
 * v2ex 相关接口
 */

import { Request } from '../util'
import cheerio from 'cheerio-without-node-native'

const apiDomain = global.__DEV__ ? 'http://127.0.0.1:3000/mock/11' : 'https://www.v2ex.com'
const request = new Request()
const baseHeaders = {
  'host': 'www.v2ex.com',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
}
request.options.headers = baseHeaders

// 统一处理 http 响应状态
request.response = response => {
  if (response.status !== 200) {
    console.log(response.status, response)
    return []
  } else {
    return response.json()
  }
}

/**
 * 解析器 - 用于解析 html 获取对应数据
 */
class Parser {
  constructor () {
    this.$ = null
    this.body = ''
  }
  load (body) {
    this.body = body
    this.$ = cheerio.load(this.body)
  }
  /**
   * 获取登录字段
   */
  getFields () {
    const fields = []
    this.$('#Main form[action="/signin"] .sl').map((i, el) => fields.push(el.attribs.name))
    return fields
  }
  /**
   * 获取验证码 和 once
   */
  getCode () {
    const el = this.$('#Main form[action="/signin"] tr').eq(2).find('div').eq(0)
    if (el.length) {
      const style = el[0].attribs.style
      const codeImage = 'https://www.v2ex.com' + style.slice(`background-image: url('`.length, style.indexOf(`')`))
      const once = codeImage.split('?once=')[1]
      // return { codeImage, once }
      return { codeImage: 'https://dn-webfed.qbox.me/_captcha.png', once: 'success' }
    }
    return {}
  }
  /**
   * 获取登录失败返回的提示
   */
  getProblem () {
    const el = this.$('.problem li').eq(0)
    return el.length ? el.text() : ''
  }
  /**
   * 获取用户信息 （从设置页面获取）
   */
  getUserInfo () {
    const el = this.$('#Main form[action="/settings"]')
    if (el.length) {
      const once = this.$('#Top td').eq(2).find('a').eq(5).attr('onclick').slice(0, -4).split('once=')[1]
      const td = el.find('td')
      const data = {
        once,
        avatar: 'https:' + td.eq(0).find('img').attr('src'),
        ranking: td.eq(1).text(),
        name: td.eq(3).text(),
        mobile: td.eq(5).text(),
        email: td.eq(9).text(),
        money: this.getMoney()
      }
      return data
    }
    return {}
  }
  /**
   * 获取登录状态 - 通过头部通栏判断
   */
  getLoginStatus () {
    const el = this.$('#Top td').eq(2).find('a')
    if (el.length > 3) return { status: true, name: el.eq(1).text() }
    return { status: false }
  }
  /**
   * 获取铜币
   */
  getMoney () {
    const money = this.$('#money')
    const num = money.text().trim().split('  ')
    const images = []
    money.find('img').map((i, el) => { images.push('https:' + el.attribs.src) })
    return [num, images]
  }
}

/**
 * 登录类
 */
class Login {
  constructor () {
    this.request = new Request()
    this.request.options.headers = baseHeaders
    // const apiDomain = 'https://www.v2ex.com'
    this.loginUrl = `${apiDomain}/signin`
    this.postOptions = {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Content-type': 'application/x-www-form-urlencoded',
        'referer': `${apiDomain}/signin?next=%2Fsettings`
      }
    }
    this.data = {}
  }
  /**
   * 获取登录所需要的数据（验证码）
   */
  getData () {
    return this.request
      .get(this.postOptions.headers.referer)
      .then(response => response.text())
      .then(body => {
        parser.load(body)
        this.data = {
          ...parser.getCode(),
          fields: parser.getFields(),
          problem: parser.getProblem(),
          next: '/settings'
        }
        return this.data
      })
  }
  /**
   * 提交操作：登录账户
   */
  submit ({ user, password, code, next = this.data.next }) {
    const { once, fields } = this.data
    const data = {
      once,
      next,
      [fields[0]]: user,
      [fields[1]]: password,
      [fields[2]]: code
    }
    console.log('submit：', data)
    return this.request
      .post(this.loginUrl, data, this.postOptions)
      .then(this.check.bind(this))
  }
  /**
   * 登录结果
   * @param {Object} response 响应体
   */
  async check (response) {
    console.log('login response:', response)
    const body = await response.text()
    parser.load(body)
    const problem = parser.getProblem()
    if (problem) {
      this.data = {
        problem,
        ...parser.getCode(),
        fields: parser.getFields(),
        next: '/'
      }
      return this.data
    }
    user.getServerData()
    return { status: '登录成功' }
  }
  /**
   * 退出登录
   */
  logout () {
    // const apiDomain = 'https://www.v2ex.com'
    const referer = `${apiDomain}/signout?once=${user.data.once}`
    return this.request
      .get(referer, {}, { headers: { referer } })
      .then(response => { console.log(response); return response.text() })
      .then(body => {
        parser.load(body)
        if (!parser.getLoginStatus().status) {
          user.clear()
          return { error: null }
        }
        return { error: '退出登录出错' }
      })
  }
}

/**
 * 用户类
 */
class User {
  constructor () {
    this.data = {}
    this.request = new Request()
    this.request.options.headers = baseHeaders
    this.waiting = true
    return this
  }
  init () {
    this.getServerData()
    return this
  }
  set (props) {
    Object.assign(this.data, props)
  }
  get (name) {
    return this.data[name]
  }
  clear () {
    this.data = {}
  }
  getServerData () {
    // const apiDomain = 'https://www.v2ex.com'
    this.waiting = true
    return this.request
      .get(`${apiDomain}/settings`)
      .then(response => { console.log(response); return response.text() })
      .then(body => {
        parser.load(body)
        this.set(parser.getUserInfo())
        this.waiting = false
        return this.data
      })
  }
}

export const parser = new Parser()
export const user = new User().init()
export const login = new Login()

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
