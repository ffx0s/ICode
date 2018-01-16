/**
 * 列表item shell
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class TrendingItemShell extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.block, { marginBottom: 10, width: '100%' }]} />
        <View style={[styles.block, { marginBottom: 15, width: '100%' }]} />
        <View style={styles.row}>
          <View style={[styles.block, { width: '20%' }]} />
          <View style={[styles.block, { width: '40%' }]} />
          <View style={[styles.block, { width: '20%' }]} />
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
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
