/**
 * 页面通用视图
 */

import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

// 路由与图标的映射
const iconsMap = {
  'Daily': 'ios-paper',
  'V2ex': 'logo-vimeo',
  'Github': 'logo-github',
  'Settings': 'md-settings'
}

export default class ViewClass extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: navigation.state.routeName,
      tabBarIcon: ({ tintColor, focused }) => <Icon name={iconsMap[navigation.state.routeName]} size={24} color={focused ? screenProps.theme.color : '#666'}/>,
      headerTitleStyle: {
        color: 'white'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: screenProps.theme.color,
        borderBottomColor: screenProps.theme.color
      },
      headerLeft: null,
      headerRight: null
    }
  }
}
