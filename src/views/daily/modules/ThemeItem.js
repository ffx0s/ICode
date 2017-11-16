import React, { Component } from 'react'
import {
  StyleSheet, View, Text, Image, TouchableOpacity
} from 'react-native'
import { placeholderImage } from '../../../util'

export default class ThemeItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={styles.item}
      >
        <View style={styles.inner}>
          <Text style={styles.title}>{this.props.item.title}</Text>
          {
            this.props.item.image ? (
              <Image
                style={styles.image}
                source={{ uri: this.props.item.image }}
                defaultSource={placeholderImage}
              />
            ) : (
              <Image
                style={styles.image}
                source={placeholderImage}
              />
            )
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
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
  image: {
    marginLeft: 10,
    flex: 2,
    height: 60,
    backgroundColor: '#eee'
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    flex: 6
  }
})
