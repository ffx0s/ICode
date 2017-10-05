/**
 * webview
 */

import React, { Component, PropTypes } from 'react'
import { WebView } from 'react-native'

export class WebViewComponent extends Component {
  // 组件属性
  static PropTypes = {
    // webview打开的链接
    uri: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  render () {
    return (
      <WebView
        source={{uri: this.props.uri}}
        startInLoadingState={true}
      />
    )
  }
}
