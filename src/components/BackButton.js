/**
 * 顶部导航左侧返回按钮
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { px2dp } from '../util'

export class BackButton extends Component {
  goBack () {
    this.props.navigation.goBack()
  }

  render () {
    return (
      <TouchableOpacity onPress={this.goBack.bind(this)}>
        <View style={styles.container}>
          <Icon style={styles.icon} name="ios-arrow-back" size={px2dp(30)} color="white" />
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5
  },
  icon: {
    marginTop: 3
  }
})
