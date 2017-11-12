/**
 * 知乎日报首页
 */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { baseNavigationOptions } from '../../util'
import { Swiper, ScrollList } from '../../components'
import zhihu from '../../api/zhihu'

export default class extends Component {
  static navigationOptions = baseNavigationOptions

  constructor (props) {
    super(props)
    this.state = {
      imgList: [
        'https://pic2.zhimg.com/v2-316de02ece9353001dac41f871be1569.jpg',
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
        'https://pic1.zhimg.com/v2-42773e9d9a65c8ad437114062808214c.jpg',
        'https://pic4.zhimg.com/v2-d83d61d4fef2b265619899d533fb3077.jpg',
        'https://pic4.zhimg.com/v2-9486fe27e1051860ccd319dd77d14a2f.jpg'
      ]
    }
  }

  render () {
    return (
      <ScrollList
        fetch={() => { return zhihu.getLastest().then(data => { return data.stories }) }}
        renderItem={({item, index}) =>
          <View style={{}}></View>
        }
        screenProps={this.props.screenProps}
        ListHeaderComponent={
          <View style={styles.container}>
            <Swiper screenProps={this.props.screenProps} imgList={this.state.imgList} />
          </View>
        }
        ListEmptyComponent={null}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
