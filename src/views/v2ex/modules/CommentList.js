/**
 * 主题评论列表
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

import { ScrollList } from '../../../components'
import CommentItem from './CommentItem'
import v2ex from '../../../api/v2ex'

export default class CommentList extends Component {
  static PropTypes = {
    // 主题 id
    id: PropTypes.number,
    // 列表头部组件
    ListHeaderComponent: PropTypes.element
  }

  render () {
    // 主题 id，属性id是undefined的话，就取navigation的id
    let id = this.props.id || this.props.navigation.state.params.id

    return (
      <View style={styles.container}>
        <ScrollList
          ListHeaderComponent={this.props.ListHeaderComponent}
          ListEmptyComponent={<View></View>}
          fetch={() => { return v2ex.getComment(id) }}
          renderItem={({item, index}) =>
            <CommentItem item={item} index={index} screenProps={this.props.screenProps} />
          }
          screenProps={this.props.screenProps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
