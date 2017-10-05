/**
 * 项目仓库页
 */

import React, { Component } from 'react'
import { WebViewComponent } from '../../components'

export default class Repository extends Component {
  render () {
    let uri = this.props.navigation.state.params.uri
    return <WebViewComponent uri={uri} />
  }
}
