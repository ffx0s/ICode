/**
 * Trending item
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Icon from 'react-native-vector-icons/Ionicons'

export default class TrendingItem extends Component {
  render () {
    let item = this.props.item
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          {/* 标题 */}
          <Text style={styles.title}>{item.fullName}</Text>
          {/* 描述 */}
          <HTMLView
            value={`<p>${item.description}</p>`}
            stylesheet={{
              p: styles.gray,
              a: styles.gray
            }}
          />
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={styles.row}>
              {
                item.language ? (
                  <View style={styles.row}>
                    <Icon name="ios-code" size={16} color="#ccc" style={{ marginTop: 3 }} />
                    <Text style={[styles.gray, styles.smallFont]}> {item.language}   </Text>
                  </View>
                ) : null
              }
              <Text style={[styles.gray, styles.smallFont]}>Built by </Text>
              {/* 用户头像 */}
              {
                item.contributors.map((uri, index) =>
                  <Image
                    key={index}
                    style={styles.image}
                    source={{ uri }}
                  />
                )
              }
            </View>
            <View style={styles.row}>
              <Icon name="md-star" size={14} color="#ccc" />
              <Text style={[styles.gray, styles.smallFont]}> {item.starCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212121'
  },
  smallFont: {
    fontSize: 12
  },
  gray: {
    color: '#757575'
  },
  white: {
    color: 'white',
    textAlign: 'center'
  },
  image: {
    height: 18,
    width: 18,
    marginRight: 2,
    borderRadius: 10
  }
})
