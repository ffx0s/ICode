/**
 * 列表item shell
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class TopicItemShell extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.block, { marginBottom: 8, width: '100%' }]} />
        <View style={styles.row}>
          <View style={styles.row}>
            <View style={[styles.block, styles.image]} />
            <View style={[styles.block, { width: 130 }]} />
          </View>
          <View style={styles.row}>
            <View style={[styles.block, { marginRight: 10, width: 30 }]} />
            <View style={[styles.block, { width: 30 }]} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  block: {
    height: 15,
    backgroundColor: '#f6f6f6'
  },
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderColor: '#ddd',
    borderBottomWidth: 0.5
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 22,
    width: 22,
    marginRight: 5,
    borderRadius: 10
  }
})
