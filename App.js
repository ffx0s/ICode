import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import { px2dp } from './src/util'
import { HeaderLeft } from './src/components'

import TopicList from './src/views/v2ex/TopicList'
import TopicDetail from './src/views/v2ex/TopicDetail'
import TrendingList from './src/views/github/TrendingList'
import Repository from './src/views/github/Repository'

// 设置状态栏样式
StatusBar.setBarStyle('light-content')

/**
 * 顶部导航默认样式
 * @return {Object}
 */
function baseOptions () {
  return {
    headerStyle: {
      backgroundColor: '#3496f0',
      height: 65,
      borderBottomColor: '#3496f0'
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerBackTitleStyle: {
      color: 'white'
    }
  }
}

/**
 * 底部 TAB 图标
 * @param {图标名称} name 
 * @param {是否选中} focused 
 */
function icon (name, focused) {
  return <Icon name={name} size={px2dp(25)} color={focused ? '#3496f0' : '#666'}/>
}

const V2exTab = StackNavigator({
  Home: {
    screen: TopicList,
    path: '/',
    navigationOptions: Object.assign({
      title: 'V2EX'
    }, baseOptions())
  },
  Detail: {
    screen: TopicDetail,
    path: '/detail/:id',
    navigationOptions: ({ navigation }) => (Object.assign({
      title: '主题',
      tabBarVisible: false,
      headerLeft: <HeaderLeft text="V2EX" navigation={navigation} />
    }, baseOptions()))
  }
})

const GithubTab = StackNavigator({
  Home: {
    screen: TrendingList,
    path: '/',
    navigationOptions: Object.assign({
      title: 'Github'
    }, baseOptions())
  },
  Repository: {
    screen: Repository,
    path: '/repository/:uri',
    navigationOptions: ({ navigation }) => (Object.assign({
      title: 'Repository',
      tabBarVisible: false,
      headerLeft: <HeaderLeft text="Github" navigation={navigation} />
    }, baseOptions()))
  }
})

// https://reactnavigation.org/docs/navigators/tab#TabNavigatorConfig
let tabNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#3496f0'
  },
  lazy: true
  // animationEnabled: true
}

const App = TabNavigator({
  V2ex: {
    screen: V2exTab,
    navigationOptions: {
      title: 'V2EX',
      tabBarIcon: ({ tintColor, focused }) => icon('logo-vimeo', focused)
    }
  },
  Github: {
    screen: GithubTab,
    navigationOptions: {
      title: 'Github',
      tabBarIcon: ({ tintColor, focused }) => icon('logo-github', focused)
    }
  }
}, tabNavigatorConfig)

export default App
