/**
 * 主题详情页
 */

import React from 'react'
import { View, Alert, StatusBar } from 'react-native'
import Toast from 'react-native-root-toast'
import ViewClass from '../ViewClass'
import CommentList from './modules/CommentList'
import CommentBox from './modules/CommentBox'
import TopicContent from './modules/TopicContent'
import { BottomNav, Spinner } from '../../components'
import v2ex, { user } from '../../api/v2ex'

export default class TopicDetail extends ViewClass {
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
  static navigationOptions = {
    header: null,
    headerLeft: null
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
        <View style={{ height: 20, backgroundColor: 'white' }}>
          <StatusBar
            barStyle="dark-content"
          />
        </View>
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
    flex: 1,
    backgroundColor: 'white'
  }
}
