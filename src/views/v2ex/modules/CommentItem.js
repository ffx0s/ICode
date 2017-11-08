/**
 * 主题评论 item
 */

import React, { Component, PropTypes } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Markdown from 'react-native-simple-markdown'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { dateFrom, px2dp, markdownStyles } from '../../../util'

export default class CommentItem extends Component {
  static PropTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  }

  render () {
    let item = this.props.item
    let index = this.props.index

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.props.onPress}
        style={styles.container}
      >
        <View style={styles.row}>
          <View style={styles.rightSpac}>
            {/* 用户头像 */}
            <Image
              style={styles.image}
              source={{uri: `http:${item.member.avatar_normal}`}}
            />
          </View>
          <View style={[styles.column, styles.header]}>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              {/* 用户名 */}
              <Text style={{ color: this.props.screenProps.theme.color }}>{item.member.username}</Text>
              <View style={[styles.row, styles.alignCenter]}>
                {
                  item.thanks ? (
                    <View style={[styles.row, styles.alignCenter]}>
                      <Icon name="md-heart" size={px2dp(15)} color="#ccc" />
                      <Text style={styles.gray}> {item.thanks}</Text>
                    </View>
                  ) : null
                }
                <Text style={styles.gray}>  # {index + 1}</Text>
              </View>
            </View>
            {/* 内容 */}
            <Markdown
              styles={markdownStyles}
            >
              {item.content}
            </Markdown>
            {/* 评论时间 */}
            <Text style={[styles.gray, styles.smallFont, styles.rightSpac]}>{dateFrom(new Date(item.created * 1000))}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  rightSpac: {
    marginRight: 10
  },
  header: {
    flex: 1,
    paddingBottom: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 12
  },
  smallFont: {
    fontSize: 12
  },
  gray: {
    color: '#757575'
  },
  alignCenter: {
    alignItems: 'center'
  }
})
