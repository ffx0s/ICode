/**
 * 上下拉刷新列表组件
 */

import React, { Component, PropTypes } from 'react'
import {
  FlatList,
  RefreshControl,
  View,
  Text
} from 'react-native'

export class ScrollList extends Component {
  // 组件属性
  static PropTypes = {
    // FlatList 组件 renderItem 函数
    renderItem: PropTypes.func.isRequired,
    // 刷新请求函数
    fetch: PropTypes.func.isRequired,
    // 请求参数
    params: PropTypes.array,
    // 列表头部组件
    ListHeaderComponent: PropTypes.element
  }

  static defaultProps = {
    params: []
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
    this.onRefresh()
  }

  async onRefresh () {
    // 设置loading状态
    this.setState({ isLoading: true })
    // 请求数据
    let result = await this.props.fetch(...this.props.params)
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
        ListEmptyComponent={!this.state.isLoading ? <ListEmptyComponent text="空空如也～" /> : null}
        refreshControl={
          <RefreshControl
            title='Loading...'
            titleColor='#2196F3'
            colors={['#2196F3']}
            refreshing={this.state.isLoading}
            onRefresh={this.onRefresh.bind(this)}
            tintColor='#2196F3'
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
