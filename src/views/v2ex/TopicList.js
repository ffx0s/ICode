/**
 * 主题列表页
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import { ScrollList } from '../../components'
import { baseNavigationOptions } from '../../util'

import TopicItem from './modules/TopicItem'
import v2ex from '../../api/v2ex'

export default class TopicList extends Component {
  static navigationOptions = baseNavigationOptions

  constructor (props) {
    super(props)
    this.state = {
      tabs: [{
        name: '最新',
        api: 'getLastest'
      }, {
        name: '热门',
        api: 'getHot'
      }, {
        name: '创意',
        api: 'getNodeTopic',
        params: ['create']
      }, {
        name: '问与答',
        api: 'getNodeTopic',
        params: ['qna']
      }, {
        name: '设计',
        api: 'getNodeTopic',
        params: ['design']
      }, {
        name: '技术',
        api: 'getNodeTopic',
        params: ['tech']
      }, {
        name: '程序员',
        api: 'getNodeTopic',
        params: ['programmer']
      }, {
        name: '酷工作',
        api: 'getNodeTopic',
        params: ['jobs']
      }, {
        name: '交易',
        api: 'getNodeTopic',
        params: ['deals']
      }],
      tabBarBackgroundColor: '#3496f0'
    }
  }

  render () {
    if (!this.state.tabs.length) return null

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor: 'white', height: 2}}
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarBackgroundColor={this.props.screenProps.theme.color}
          ref="scrollableTabView"
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar style={{height: 40, borderWidth: 0, elevation: 2}} itemstyle={{height: 39}} />}
        >
          {this.state.tabs.map((tab, index) => {
            return <ScrollList
              // tab 标题
              tabLabel={tab.name}
              key={index}
              // 数据请求方法
              fetch={() => { return v2ex[tab.api](...(tab.params || [])) }}
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
  }
})
