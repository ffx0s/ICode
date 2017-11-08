/**
 * 主题详情页
 */

import React, { Component } from 'react'
import CommentList from './modules/CommentList'
import TopicContent from './modules/TopicContent'
import { BackButton } from '../../components'
import { baseNavigationOptions } from '../../util'

export default class TopicDetail extends Component {
  static navigationOptions ({ navigation, screenProps }) {
    return baseNavigationOptions({ navigation, screenProps }, {
      title: '主题',
      headerLeft: <BackButton text="V2EX" navigation={navigation} />
    })
  }
  render () {
    let data = this.props.navigation.state.params.data
    return <CommentList id={data.id} screenProps={this.props.screenProps} ListHeaderComponent={<TopicContent data={data} />} />
  }
}
