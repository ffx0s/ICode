/**
 * swiper shell
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export class SwiperShell extends Component {
  render () {
    return (
      <View style={[styles.block, styles.container]}>
        <View style={[styles.row, styles.dots]}>
          <View style={[styles.dot]} />
          <View style={[styles.dot]} />
          <View style={[styles.dot]} />
          <View style={[styles.dot]} />
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
    flex: 1,
    height: 180
  },
  dots: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 6,
    marginTop: '51%'
  },
  dot: {
    marginHorizontal: 3,
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  }
})
