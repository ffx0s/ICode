/**
 * app 接口
 */
import { localStorage } from '../util'
import themeData from '../data/theme.json'

const DEFAULT_THEME = themeData[0]

export default {
  /**
   * 获取当前正在使用的主题
   */
  getCurrentTheme () {
    return localStorage.get('theme').then(theme => {
      return theme !== null ? JSON.parse(theme) : DEFAULT_THEME
    })
  },
  /**
   * 保存主题
   * @param {主题} theme 
   */
  saveTheme (theme) {
    return localStorage.set('theme', JSON.stringify(theme))
  }
}
