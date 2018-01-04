/**
 * 设置页
 */

import React, { Component } from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import Orientation from 'react-native-orientation'
import { Group, Cell } from '../../components'
import { baseNavigationOptions } from '../../util'

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = { enabled: true }
  }

  static navigationOptions = baseNavigationOptions

  onValueChange (value) {
    if (value) {
      Orientation.lockToPortrait()
    } else {
      Orientation.lockToLandscape()
    }
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
