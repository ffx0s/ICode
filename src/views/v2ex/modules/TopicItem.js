/**
 * 列表item
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight } from 'react-native'

export default class TopicItem extends Component {
  render () {
    let item = this.props.item
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={this.props.onPress}
      >
        <View style={styles.container}>
          {/* 标题 */}
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              {/* 用户头像 */}
              <Image
                style={styles.image}
                source={{uri: `http:${item.member.avatar_normal}`}}
              />
              {/* 用户名 */}
              <Text style={styles.gray}>{item.member.username}</Text>
              {/* 帖子发布节点 */}
              <Text style={[styles.gray, styles.smallFont, { marginLeft: 5 }]}>· {item.node.title}</Text>
            </View>
            <View style={styles.row}>
              {/* 发布时间 */}
              <Text style={[styles.gray, styles.smallFont, { marginRight: 10 }]}>{item.created}</Text>
              {
                item.replies ? (
                  <TouchableHighlight style={styles.reply}>
                    {/* 回复数量 */}
                    <Text style={[styles.smallFont, styles.white]}>{item.replies}</Text>
                  </TouchableHighlight>
                ) : null
              }
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
    padding: 12,
    borderColor: '#ddd',
    borderBottomWidth: 0.5
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
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
  reply: {
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    height: 15,
    minWidth: 23
  },
  image: {
    height: 22,
    width: 22,
    marginRight: 5,
    borderRadius: 10
  }
})
