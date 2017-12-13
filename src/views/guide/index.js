/**
 * APP 引导页
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter,
  Animated
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from 'react-navigation'
import { sleep } from '../../util'
import service from '../../api'

export default class Guide extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {}
    this._fadeAnim = new Animated.Value(1)
    this._fadeAnim.addListener(this.redirect.bind(this))
  }

  componentDidMount () {
    this.initApp()
  }

  redirect ({ value }) {
    if (value === 0) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Root' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  /**
   * 应用初始化操作
   */
  async initApp () {
    // 读取本地主题并进行切换
    let theme = await service.getCurrentTheme()
    DeviceEventEmitter.emit('CHANGE_THEME', theme)
    await sleep(1000)
    Animated.timing(this._fadeAnim, { toValue: 0, duration: 500 }).start()
  }

  render () {
    return (
      <Animated.View style={[
        styles.container,
        {
          opacity: this._fadeAnim,
          transform: [{
            scale: this._fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1.8, 1],
              extrapolate: 'clamp'
            })
          }]
        }
      ]}>
        <View style={styles.title}>
          <Text style={styles.logo}>ICode</Text>
          <Icon style={styles.icon} name="md-heart" size={25} />
        </View>
        <Text>console.log('Hello Word')</Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  logo: {
    fontSize: 55,
    fontWeight: 'bold'
  },
  icon: {
    marginLeft: 5,
    marginBottom: 9
  }
})
