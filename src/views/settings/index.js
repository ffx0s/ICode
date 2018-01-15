/**
 * 设置页
 */

import React from 'react'
import { StyleSheet, View, Switch, DeviceEventEmitter } from 'react-native'
import { Group, Cell } from '../../components'
import ViewClass from '../ViewClass'

export default class Settings extends ViewClass {
  constructor (props) {
    super(props)
    this.state = { enabled: true }
  }

  onValueChange (value) {
    DeviceEventEmitter.emit('LOCKTO', value ? 'Portrait' : 'Landscape')
    this.setState({ enabled: value })
  }

  render () {
    return (
      <View style={styles.container}>
        <Group>
          <Cell title="更换主题" onPress={() => { this.props.navigation.navigate('Theme') }} />
        </Group>
        <Group>
          <Cell title="竖屏浏览" isLink={false} rightComponent={<Switch onValueChange={this.onValueChange.bind(this)} value={this.state.enabled} />} />
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
