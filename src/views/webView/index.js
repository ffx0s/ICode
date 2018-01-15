/**
 * 通用 webview 页面
 */

import React from 'react'
import { WebViewComponent, BackButton } from '../../components'
import ViewClass from '../ViewClass'

export default class WebView extends ViewClass {
  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...ViewClass.navigationOptions({ navigation, screenProps }),
      title: navigation.state.params.title || '',
      headerLeft: <BackButton text="返回" navigation={navigation} />
    }
  }
  render () {
    let uri = this.props.navigation.state.params.uri
    return <WebViewComponent uri={uri} />
  }
}
