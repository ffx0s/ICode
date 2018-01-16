/**
 * 主题列表页
 */

import React from 'react'
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollList, Transition } from '../../components'
import { getScrollableTabViewProps } from '../../util'
import TopicItem from './modules/TopicItem'
import TopicItemShell from './modules/TopicItem.shell'
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

const Shell = props => {
  const el = []
  let count = 8
  while (count) {
    el.push(<TopicItemShell key={count} />)
    count--
  }
  return el
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
    this._loadStatus = {}
  }

  fetch (tab) {
    return v2ex.getTabTopic(tab).then(result => {
      if (!this._loadStatus[tab]) {
        this._loadStatus[tab] = true
        setTimeout(() => { this.refs[`shell-${tab}`].remove() }, 300)
      }
      return result
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          {...getScrollableTabViewProps(this)}
        >
          {this.state.tabs.map((tab, index) => {
            return (
              <View key={index} tabLabel={tab.name}>
                <ScrollList
                  fetch={() => { return this.fetch(tab.tab) }}
                  renderItem={({item, index}) =>
                    <TopicItem
                      item={item}
                      onPress={() => { this.props.navigation.navigate('TopicDetail', { id: item.id, data: item }) }}
                    />
                  }
                  screenProps={this.props.screenProps}
                />
                <Transition ref={`shell-${tab.tab}`} style={{ position: 'absolute', width: '100%' }}>
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
  },
  menuButton: {
    marginRight: 10,
    marginTop: 4
  }
})
