/**
 * APP 引导页
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  DeviceEventEmitter
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import service from '../../api'
import { sleep } from '../../util'

export default class Guide extends Component {
  static navigationOptions = {
    header: null
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.initApp()
  }

  /**
   * 应用初始化操作
   */
  async initApp () {
    // 更换主题
    let theme = await service.getCurrentTheme()
    DeviceEventEmitter.emit('chnageTheme', theme)
    // 休眠500ms
    await sleep(500)
    this.props.navigation.navigate('V2ex')
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.logo}>ICode</Text>
          <Icon style={styles.icon} name="md-heart" size={25} />
        </View>
        <Text>console.log('Hello Word')</Text>
      </View>
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
