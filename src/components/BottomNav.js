/**
 * 底部导航
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export class BottomNav extends Component {
  static PropTypes = {
    items: PropTypes.array.isRequired
  }

  render () {
    return (
      <View style={styles.wrap}>
        {
          this.props.items.map((item, index) => <Icon key={index} name={item.name} style={styles.item} size={item.size || 28} onPress={() => { item.onPress && item.onPress() }} />)
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  item: {
    flex: 1,
    color: '#bbb',
    textAlign: 'center'
  }
})
