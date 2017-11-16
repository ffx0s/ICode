/**
 * 上下拉刷新列表组件
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, RefreshControl, View, Text } from 'react-native'

export class ScrollList extends Component {
  static PropTypes = {
    // FlatList 组件 renderItem 函数
    renderItem: PropTypes.func.isRequired,
    // 刷新时请求数据的函数
    fetch: PropTypes.func.isRequired,
    // 列表头部组件
    ListHeaderComponent: PropTypes.element
  }

  constructor (props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }
    this._keyExtractor = (item, index) => index
  }

  componentDidMount () {
    this.refresh()
  }

  async refresh () {
    // 设置loading状态
    this.setState({ isLoading: true })
    // 请求数据
    let result = await this.props.fetch()
    // 设置数据状态
    this.setState({
      data: result,
      isLoading: false
    })
  }

  render () {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.props.renderItem}
        keyExtractor={this._keyExtractor}
        ListHeaderComponent={this.props.ListHeaderComponent}
        ListEmptyComponent={!this.state.isLoading ? this.props.ListEmptyComponent || <ListEmptyComponent text="空空如也～" /> : null}
        refreshControl={
          <RefreshControl
            title='Loading...'
            titleColor={this.props.screenProps.theme.color}
            colors={[this.props.screenProps.theme.color]}
            refreshing={this.state.isLoading}
            onRefresh={this.refresh.bind(this)}
            tintColor={this.props.screenProps.theme.color}
          />
        }
      />
    )
  }
}

class ListEmptyComponent extends Component {
  render () {
    return (
      <View style={{
        marginTop: '50%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{ color: '#666' }}>{this.props.text}</Text>
      </View>
    )
  }
}
