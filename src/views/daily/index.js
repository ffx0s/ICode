/**
 * 知乎日报首页
 */

import React from 'react'
import { StyleSheet, View, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Swiper, SwiperShell, ScrollList, Transition } from '../../components'
import zhihu from '../../api/zhihu'
import Category from './modules/Category'
import ThemeItem from './modules/ThemeItem'
import ThemeItemShell from './modules/ThemeItem.shell'
import ViewClass from '../ViewClass'

const MenuButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        DeviceEventEmitter.emit('toggleCategory')
      }}
      style={styles.menuButton}
    >
      <Icon name="md-menu" size={28} color="white" />
    </TouchableOpacity>
  )
}

export default class extends ViewClass {
  static navigationOptions ({ navigation, screenProps }) {
    const { params = {} } = navigation.state
    return {
      ...ViewClass.navigationOptions({ navigation, screenProps }),
      headerTitle: params.title || '今日热闻',
      headerRight: <MenuButton navigation={navigation} />
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      imgList: []
    }
    this._categoryId = ''
    this._timer = null
  }

  loadData (categoryId) {
    return zhihu[categoryId ? 'getThemeList' : 'getLastest'](categoryId)
      .then(data => {
        this.setState({ imgList: data.top_stories ? this.computeImgList(data.top_stories) : [] })
        clearTimeout(this._timer)
        this.refs.shell.hide()
        return data.stories
      })
  }

  onCategoryItemClick (category) {
    this._categoryId = category.id
    if (this._categoryId) {
      this.setState({ imgList: [] })
    }
    clearTimeout(this._timer)
    this._timer = setTimeout(() => {
      this.refs.shell.show()
    }, 500)
    this.props.navigation.setParams({ title: category.name })
    this.refs.ScrollList.setState({ isLoading: true, data: [] })
    this.refs.ScrollList.refresh()
  }

  computeImgList (items) {
    return items.map(item => {
      return { id: item.id, uri: item.image, text: item.title }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Category onClick={this.onCategoryItemClick.bind(this)} />
        <ScrollList
          ref="ScrollList"
          fetch={() => { return this.loadData(this._categoryId) }}
          renderItem={({item, index}) =>
            <ThemeItem
              onPress={() => { this.props.navigation.navigate('DailyDetail', { id: item.id }) }}
              item={{ title: item.title, image: item.images ? item.images[0] : '' }}
            />
          }
          ListHeaderComponent={
            this.state.imgList.length && (
              <View style={styles.container}>
                <Swiper
                  imgList={this.state.imgList}
                  onPress={(item, i) => {
                    this.props.navigation.navigate('DailyDetail', { id: item.id })
                  }}
                />
              </View>
            )
          }
          screenProps={this.props.screenProps}
        />
        <Transition ref="shell" style={{ position: 'absolute', top: 0, width: '100%' }}>
          <SwiperShell />
          <ThemeItemShell />
          <ThemeItemShell />
          <ThemeItemShell />
          <ThemeItemShell />
          <ThemeItemShell />
        </Transition>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuButton: {
    marginRight: 10,
    marginTop: 4
  }
})
