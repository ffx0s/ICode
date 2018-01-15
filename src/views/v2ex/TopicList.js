/**
 * 主题列表页
 */

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'

import { ScrollList } from '../../components'
import { getScrollableTabViewProps } from '../../util'

import TopicItem from './modules/TopicItem'
import v2ex, { user } from '../../api/v2ex'
import ViewClass from '../ViewClass'

const MenuButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        if (user.waiting) return Alert.alert('', '正在获取用户数据，请稍等...')
        props.navigation.navigate(user.get('name') ? 'Account' : 'Login')
      }}
      style={styles.menuButton}
    >
      <Icon name="md-person" size={26} color="white" />
    </TouchableOpacity>
  )
}

export default class TopicList extends ViewClass {
  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...ViewClass.navigationOptions({ navigation, screenProps }),
      headerRight: <MenuButton navigation={navigation} />
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      tabs: [{
        name: '最新',
        tab: 'all'
      }, {
        name: '热门',
        tab: 'hot'
      }, {
        name: '创意',
        tab: 'creative'
      }, {
        name: '问与答',
        tab: 'qna'
      }, {
        name: '好玩',
        tab: 'play'
      }, {
        name: '技术',
        tab: 'tech'
      }, {
        name: '酷工作',
        tab: 'jobs'
      }, {
        name: '交易',
        tab: 'deals'
      }]
    }
  }

  render () {
    if (!this.state.tabs.length) return null

    return (
      <View style={styles.container}>
        <ScrollableTabView
          {...getScrollableTabViewProps(this)}
        >
          {this.state.tabs.map((tab, index) => {
            return <ScrollList
              // tab 标题
              tabLabel={tab.name}
              key={index}
              // 数据请求方法
              fetch={() => { return v2ex.getTabTopic(tab.tab) }}
              // 渲染 item
              renderItem={({item, index}) =>
                <TopicItem
                  item={item}
                  onPress={() => { this.props.navigation.navigate('TopicDetail', { id: item.id, data: item }) }}
                />
              }
              screenProps={this.props.screenProps}
            />
          })}
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuButton: {
    marginRight: 10,
    marginTop: 4
  }
})
