/**
 * 全局事件
 */
import { DeviceEventEmitter } from 'react-native'

export default function (App) {
  /**
   * 更换主题
   */
  DeviceEventEmitter.addListener('CHANGE_THEME', theme => {
    App.setState({ screenProps: { theme } })
  })
  /**
   * 显示图片预览组件
   */
  DeviceEventEmitter.addListener('SHOW_IMAGE_VIEWER', imageViewer => {
    App.setState({ imageViewer })
  })
}
