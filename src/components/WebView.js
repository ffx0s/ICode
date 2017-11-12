/**
 * webview
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { WebView } from 'react-native'

export class WebViewComponent extends Component {
  static PropTypes = {
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
