import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

import Guide from '../views/guide'
import WebView from '../views/webView'
import Daily from '../views/daily'
import DailyDetail from '../views/daily/DailyDetail'
import TopicList from '../views/v2ex/TopicList'
import TopicDetail from '../views/v2ex/TopicDetail'
import Login from '../views/v2ex/Login'
import Account from '../views/v2ex/Account'
import TrendingList from '../views/github/TrendingList'
import Settings from '../views/settings'
import Theme from '../views/settings/Theme'
import AboutICode from '../views/settings/AboutICode'
import AboutAuthor from '../views/settings/AboutAuthor'

const tabBarComponent = props => {
  return <TabBarBottom {...props} activeTintColor={props.screenProps.theme.color} />
}

// https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig
let tabNavigatorConfig = {
  tabBarComponent,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  initialRouteName: 'Daily',
  lazy: true // 懒加载 Tab
  // animationEnabled: true
}

let TabNav = TabNavigator({
  Daily: {
    screen: Daily,
    path: '/daily'
  },
  V2ex: {
    screen: TopicList,
    path: '/v2ex'
  },
  Github: {
    screen: TrendingList,
    path: '/github'
  },
  Settings: {
    screen: Settings,
    path: '/settings'
  }
}, tabNavigatorConfig)

const Routers = StackNavigator({
  Root: {
    screen: TabNav
  },
  DailyDetail: {
    screen: DailyDetail,
    path: '/dailyDetail/:id'
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
    path: '/guide'
  },
  Login: {
    screen: Login,
    path: '/login'
  },
  Account: {
    screen: Account,
    path: '/account'
  }
}, {
  initialRouteName: 'Guide'
})

export default Routers
