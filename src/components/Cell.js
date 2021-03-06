/**
 * Cell
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export class Cell extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    isLink: PropTypes.bool,
    rightComponent: PropTypes.element,
    onPress: PropTypes.func,
    style: PropTypes.object
  }

  static defaultProps = {
    // 是否显示右侧箭头
    isLink: true,
    onPress: () => {},
    style: {}
  }

  renderCell () {
    return (
      <View style={[styles.cell, this.props.style]}>
        <View>
          <Text style={styles.title}>{ this.props.title }</Text>
        </View>
        <View style={styles.right}>
          { this.props.rightComponent || null }
          {
            this.props.isLink ? (
              <View>
                <Icon name="ios-arrow-forward" size={22} color="#ccc" style={{ marginLeft: 10, marginTop: 1 }} />
              </View>
            ) : null
          }
        </View>
      </View>
    )
  }

  render () {
    return this.props.isLink ? (
      <TouchableHighlight
        underlayColor="#ddd"
        activeOpacity={1}
        onPress={this.props.onPress}
      >
        {this.renderCell()}
      </TouchableHighlight>
    ) : <View>{this.renderCell()}</View>
  }
}

const styles = StyleSheet.create({
  cell: {
    paddingHorizontal: 15,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
