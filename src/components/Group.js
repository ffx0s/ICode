/**
 * Group
 */

import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

export class Group extends Component {
  static propTypes = {
    footer: PropTypes.any,
    borderWidthAuto: PropTypes.bool
  }

  renderChildren () {
    return React.Children.map(this.props.children, (component, i) => {
      if (!React.isValidElement(component)) return

      return (
        <View key={'cell-group-child-' + i}>
          {component}
          {
            i < this.props.children.length - 1 && <View style={[styles.separator, { marginLeft: this.props.borderWidthAuto ? 0 : 15 }]} />
          }
        </View>
      )
    })
  }
  render () {
    return (
      <View style={styles.container}>
        {this.renderChildren()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    borderColor: '#d9d9d9',
    borderWidth: 0.5,
    backgroundColor: 'white'
  },
  separator: {
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 0.5
  }
})
