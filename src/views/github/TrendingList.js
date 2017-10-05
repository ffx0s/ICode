/**
 * Trending 列表页
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import { ScrollList } from '../../components'
import TrendingItem from './modules/TrendingItem'
import github from '../../api/github'

export default class V2ex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabs: [{
        name: 'Today',
        api: 'getTrending',
        params: ['daily']
      }, {
        name: 'Weekly',
        api: 'getTrending',
        params: ['weekly']
      }, {
        name: 'Monthly',
        api: 'getTrending',
        params: ['monthly']
      }]
    }
  }

  render () {
    if (!this.state.tabs.length) return null

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
          tabBarInactiveTextColor="mintcream"
          tabBarActiveTextColor="white"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarBackgroundColor="#3496f0"
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
              fetch={github[tab.api]}
              // 请求参数
              params={tab.params}
              // 渲染 item
              renderItem={({item, index}) =>
                <TrendingItem
                  item={item}
                  onPress={() => { this.props.navigation.navigate('Repository', { uri: `https://github.com/${item.url}` }) }}
                />
              }
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
