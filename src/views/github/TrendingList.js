/**
 * Trending 列表页
 */

import React from 'react'
import { StyleSheet, View } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ViewClass from '../ViewClass'
import { ScrollList, Transition } from '../../components'
import { getScrollableTabViewProps } from '../../util'
import TrendingItem from './modules/TrendingItem'
import TrendingItemShell from './modules/TrendingItem.shell'
import github from '../../api/github'

const Shell = props => {
  const el = []
  let count = 6
  while (count) {
    el.push(<TrendingItemShell key={count} />)
    count--
  }
  return el
}

export default class TrendingList extends ViewClass {
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
    this._loadStatus = {}
  }

  fetch ({ api, params, name }) {
    return github[api](...(params || [])).then(result => {
      if (!this._loadStatus[name]) {
        this._loadStatus[name] = true
        setTimeout(() => { this.refs[`shell-${name}`].remove() }, 300)
      }
      return result
    })
  }

  render () {
    if (!this.state.tabs.length) return null

    return (
      <View style={styles.container}>
        <ScrollableTabView
          {...getScrollableTabViewProps(this)}
        >
          {this.state.tabs.map((tab, index) => {
            return (
              <View key={index} tabLabel={tab.name}>
                <ScrollList
                  // tab 标题
                  tabLabel={tab.name}
                  key={index}
                  // 数据请求方法
                  fetch={github[tab.api]}
                  fetch={() => { return this.fetch(tab) }}
                  // 渲染 item
                  renderItem={({item, index}) =>
                    <TrendingItem
                      item={item}
                      onPress={() => { this.props.navigation.navigate('WebView', { uri: `https://github.com/${item.url}`, title: 'Repository' }) }}
                    />
                  }
                  screenProps={this.props.screenProps}
                />
                <Transition ref={`shell-${tab.name}`} style={{ position: 'absolute', width: '100%', backgroundColor: '#e9e9ef' }}>
                  <Shell />
                </Transition>
              </View>
            )
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
