/**
 * 通用 webview 页面
 */

import React, { Component } from 'react'
import { WebViewComponent, BackButton } from '../../components'
import { baseNavigationOptions } from '../../util'

export default class WebView extends Component {
  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...baseNavigationOptions({ navigation, screenProps }),
      title: navigation.state.params.title || '',
      headerLeft: <BackButton text="返回" navigation={navigation} />
    }
  }
  render () {
    let uri = this.props.navigation.state.params.uri
    return <WebViewComponent uri={uri} />
  }
}
