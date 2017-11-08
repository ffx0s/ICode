import React from 'react'
import { StatusBar } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

import Guide from '../views/guide'
import WebView from '../views/webView'
import TopicList from '../views/v2ex/TopicList'
import TopicDetail from '../views/v2ex/TopicDetail'
import TrendingList from '../views/github/TrendingList'
import Settings from '../views/settings'
import Theme from '../views/settings/Theme'
import AboutICode from '../views/settings/AboutICode'
import AboutAuthor from '../views/settings/AboutAuthor'

// 设置状态栏样式
StatusBar.setBarStyle('light-content')

const tabBarComponent = props => {
  return <TabBarBottom {...props} activeTintColor={props.screenProps.theme.color} />
}

// https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig
let tabNavigatorConfig = {
  tabBarComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  initialRouteName: 'V2ex',
  lazy: true // 懒加载 Tab
  // animationEnabled: true
}

let TabNav = TabNavigator({
  V2ex: {
    screen: TopicList,
    path: '/'
  },
  Github: {
    screen: TrendingList,
    path: '/Github'
  },
  Settings: {
    screen: Settings,
    path: '/Settings'
  }
}, tabNavigatorConfig)

const Routers = StackNavigator({
  Root: {
    screen: TabNav
  },
  TopicDetail: {
    screen: TopicDetail,
    path: '/topicDetail/:id'
  },
  WebView: {
    screen: WebView,
    path: '/webView/:uri'
  },
  Theme: {
    screen: Theme,
    path: '/settings/theme'
  },
  AboutICode: {
    screen: AboutICode,
    path: '/settings/AboutICode'
  },
  AboutAuthor: {
    screen: AboutAuthor,
    path: '/settings/AboutAuthor'
  },
  Guide: {
    screen: Guide,
    path: '/Guide'
  }
}, {
  initialRouteName: 'Guide'
})

export default Routers
