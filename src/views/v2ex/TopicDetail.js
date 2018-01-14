/**
 * 主题详情页
 */

import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import Toast from 'react-native-root-toast'
import CommentList from './modules/CommentList'
import CommentBox from './modules/CommentBox'
import TopicContent from './modules/TopicContent'
import { BackButton, BottomNav, Spinner } from '../../components'
import { baseNavigationOptions } from '../../util'
import v2ex, { user } from '../../api/v2ex'

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
  async onSend (content) {
    const result = await user.sendComment(this.state.data.id, content)
    if (result.problem || result.error) {
      Alert.alert(result.problem || result.error)
    } else {
      this.refs.comment.reset()
      Toast.show('已发送', { delay: 300 })
    }
  }
  render () {
    let data = this.state.data
    if (!data.url) return <Spinner delay={500} />
    return (
      <View style={styles.wrap}>
        <CommentList
          id={data.id}
          screenProps={this.props.screenProps}
          ListHeaderComponent={<TopicContent data={data} />}
        />
        <BottomNav items={[
          { name: 'ios-arrow-round-back-outline', onPress: () => { this.props.navigation.goBack() } },
          { name: 'ios-arrow-round-up-outline' },
          { name: 'ios-create-outline', size: 24, onPress: () => { this.refs.comment.setState({ show: true }) } },
          { name: 'ios-share-outline', size: 22 }
        ]} />
        <CommentBox
          ref="comment"
          screenProps={this.props.screenProps}
          onSend={this.onSend.bind(this)}
        />
      </View>
    )
  }
}

const styles = {
  wrap: {
    flex: 1
  }
}
