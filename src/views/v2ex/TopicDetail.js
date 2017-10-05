/**
 * 主题详情页
 */

import React, { Component } from 'react'
import CommentList from './modules/CommentList'
import TopicContent from './modules/TopicContent'

export default class Detail extends Component {
  render () {
    let data = this.props.navigation.state.params.data
    return <CommentList id={data.id} ListHeaderComponent={<TopicContent data={data} />} />
  }
}
