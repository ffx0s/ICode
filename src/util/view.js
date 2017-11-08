/**
 * 视图工具类
 */

import React from 'react'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const basePx = 375

export const { width: deviceW, height: deviceH } = Dimensions.get('window')

export function px2dp (px) {
  return px * deviceW / basePx
}

/**
 * 视图通用 navigation options
 */
export function baseNavigationOptions ({ navigation, screenProps }, options = {}) {
  return Object.assign({
    title: navigation.state.routeName,
    tabBarIcon: ({ tintColor, focused }) => icon(navigation.state.routeName, screenProps.theme.color, focused),
    headerTitleStyle: {
      color: 'white'
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerStyle: {
      backgroundColor: screenProps.theme.color,
      borderBottomColor: screenProps.theme.color,
      height: 65
    },
    headerLeft: null,
    headerRight: null
  }, options)
}

// markdown 标签样式
export const markdownStyles = {
  heading1: {
    fontSize: 22
  },
  strong: {
    fontSize: 18
  },
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 26
  },
  image: {
    width: deviceW - 20,
    height: 200
  }
}

// 路由与图标的映射
let iconsMap = {
  'V2ex': 'logo-vimeo',
  'Github': 'logo-github',
  'Settings': 'md-settings'
}

/**
 * 获取底部 TAB 图标
 * @param {路由} routeName 
 * @param {主题颜色} themeColor 
 * @param {是否选中} focused 
 */

function icon (routeName, themeColor, focused) {
  return <Icon name={iconsMap[routeName]} size={px2dp(25)} color={focused ? themeColor : '#666'}/>
}
