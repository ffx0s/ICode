/**
 * 设置页
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Group, Cell } from '../../components'
import { baseNavigationOptions } from '../../util'

export default class Settings extends Component {
  static navigationOptions = baseNavigationOptions

  render () {
    return (
      <View style={styles.container}>
        <Group>
          <Cell title="更换主题" onPress={() => { this.props.navigation.navigate('Theme') }} />
        </Group>
        <Group>
          <Cell title="意见反馈" />
          <Cell title="关于 ICode" onPress={() => { this.props.navigation.navigate('AboutICode') }} />
        </Group>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  }
})
