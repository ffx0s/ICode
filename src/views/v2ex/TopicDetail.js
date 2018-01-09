/**
 * 主题详情页
 */

import React, { Component } from 'react'
import CommentList from './modules/CommentList'
import TopicContent from './modules/TopicContent'
import { BackButton, Spinner } from '../../components'
import { baseNavigationOptions } from '../../util'
import v2ex from '../../api/v2ex'

export default class TopicDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.navigation.state.params.id,
      data: Object.assign({}, this.props.navigation.state.params.data)
    }
    if (!this.state.data.url) {
      this.getData()
    }
  }
  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...baseNavigationOptions({ navigation, screenProps }),
      title: '主题',
      headerLeft: <BackButton text="V2EX" navigation={navigation} />
    }
  }
  async getData () {
    const data = await v2ex.getDetail(this.state.id)
    this.setState({ data: data[0] || [] })
  }
  render () {
    let data = this.state.data
    if (!data.url) return <Spinner delay={500} />
    return <CommentList id={data.id} screenProps={this.props.screenProps} ListHeaderComponent={<TopicContent data={data} />} />
  }
}
