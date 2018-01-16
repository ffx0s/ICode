/**
 * 列表item shell
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class ThemeItemShell extends Component {
  render () {
    return (
      <View style={styles.item}>
        <View style={styles.inner}>
          <View style={styles.column}>
            <View style={[styles.block, { marginBottom: 5, width: '100%' }]} />
            <View style={[styles.block, { marginBottom: 5, width: '90%' }]} />
            <View style={[styles.block, { width: '80%' }]} />
          </View>
          <View style={[styles.block, { flex: 2, height: 60 }]} />
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
  item: {
    padding: 10,
    paddingBottom: 0,
    backgroundColor: 'white'
  },
  inner: {
    flex: 1,
    minHeight: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  column: {
    marginRight: 20,
    flex: 6,
    flexDirection: 'column'
  }
})
