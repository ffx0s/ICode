/**
 * 主题设置页
 */

import React, { Component } from 'react'
import {
  StyleSheet, View, Button, Image, ScrollView, TouchableHighlight,
  DeviceEventEmitter
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import { baseNavigationOptions, deviceW, deviceH, px2dp } from '../../util'
import { BackButton } from '../../components'
import themeData from '../../data/theme.json'
import service from '../../api'

export default class Settings extends Component {
  static navigationOptions ({ navigation, screenProps }) {
    return baseNavigationOptions({ navigation, screenProps }, {
      title: '更换主题',
      headerLeft: <BackButton text="取消" navigation={navigation} />,
      headerRight: (
        <Button
          title="使用"
          color="white"
          onPress={() => { DeviceEventEmitter.emit('save') }}
        />
      )
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      theme: this.props.screenProps.theme
    }
  }

  componentDidMount () {
    this.subscription = DeviceEventEmitter.addListener('save', this.save.bind(this))
  }

  componentWillUnmount () {
    this.subscription.remove()
  }

  onSelectTheme (theme) {
    this.setState({ theme })
  }

  async save () {
    Toast.show('更换成功', { position: 0 })
    await service.saveTheme(this.state.theme)
    DeviceEventEmitter.emit('CHANGE_THEME', this.state.theme)
    this.props.navigation.goBack()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            resizeMode="stretch"
            style={[styles.imageSize, { backgroundColor: this.state.theme.color }]}
            source={require('../../assets/images/theme.png')}
          />
        </View>
        <View style={styles.select}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              themeData.map(theme =>
                <TouchableHighlight underlayColor="transparent" key={theme.id} activeOpacity={1} onPress={() => { this.onSelectTheme(theme) }}>
                  <View style={[styles.item, {backgroundColor: theme.color}]}>
                    {
                      theme.id === this.state.theme.id ? <Icon style={styles.selectIcon} name="ios-checkmark-outline" size={px2dp(35)} color="white" /> : null
                    }
                  </View>
                </TouchableHighlight>
              )
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  image: {
    flex: 5,
    marginVertical: 20,
    alignItems: 'center'
  },
  select: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#d9d9d9'
  },
  imageSize: {
    width: deviceW * 0.69,
    height: deviceH * 0.69,
    alignItems: 'center'
  },
  selectIcon: {
    marginTop: 8
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 55,
    height: 55,
    borderRadius: 10
  }
})
