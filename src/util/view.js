/**
 * 视图工具类
 */

import React from 'react'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollableTabBar } from 'react-native-scrollable-tab-view'

export const { width: deviceW, height: deviceH } = Dimensions.get('window')

/**
 * 占位图
 */
export const placeholderImage = require('../assets/images/placeholder-image.png')

/**
 * loading image
 */
export const loadingImage = require('../assets/images/loading.gif')

export function px2dp (px) {
  const basePx = 375
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
      borderBottomColor: screenProps.theme.color
    },
    headerLeft: null,
    headerRight: null
  }, options)
}

/**
 * 获取 ScrollTab 全局配置
 * @param {Object} context 组件上下文
 */
export function getScrollableTabViewProps (context) {
  return {
    tabBarUnderlineStyle: {backgroundColor: context.props.screenProps.theme.color, height: 2},
    tabBarInactiveTextColor: 'black',
    tabBarActiveTextColor: context.props.screenProps.theme.color,
    tabBarTextStyle: { fontSize: 15 },
    tabBarBackgroundColor: 'white',
    ref: 'scrollableTabView',
    initialPage: 0,
    renderTabBar () { return <ScrollableTabBar style={{height: 40, borderWidth: 1, borderBottomColor: '#ddd', elevation: 2}} itemstyle={{height: 39}} /> }
  }
}

const CONTENT_FONT_SIZE = 16
const TITLE_FONT_SIZE = 18
const CONTENT_LINEHEIGHT = 26
const MARGIN = 10

// markdown 标签样式
export const markdownStyles = {
  heading1: {
    fontSize: 22
  },
  strong: {
    fontSize: TITLE_FONT_SIZE
  },
  paragraph: {
    marginVertical: MARGIN,
    fontSize: CONTENT_FONT_SIZE,
    lineHeight: CONTENT_LINEHEIGHT
  },
  image: {
    width: deviceW - 20,
    height: 200
  }
}

// htmlview 样式
export const htmlViewStyles = {
  p: {
    marginVertical: MARGIN,
    fontSize: CONTENT_FONT_SIZE,
    lineHeight: CONTENT_LINEHEIGHT
  },
  ul: {
    marginVertical: MARGIN
  },
  li: {
    lineHeight: CONTENT_LINEHEIGHT,
    fontSize: CONTENT_FONT_SIZE
  },
  blockquote: {
    marginVertical: MARGIN,
    lineHeight: CONTENT_LINEHEIGHT,
    fontSize: CONTENT_FONT_SIZE
  },
  ol: {
    marginVertical: MARGIN
  },
  strong: {
    fontWeight: 'bold',
    fontSize: TITLE_FONT_SIZE
  },
  h1: {
    fontSize: TITLE_FONT_SIZE
  },
  h2: {
    fontSize: TITLE_FONT_SIZE
  }
}

// 路由与图标的映射
let iconsMap = {
  'Daily': 'ios-paper',
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
