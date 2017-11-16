import React, { Component } from 'react'
import {
  StyleSheet, Animated, View, ScrollView, Text, Image,
  DeviceEventEmitter, TouchableOpacity
} from 'react-native'
import { deviceH, deviceW, sleep } from '../../../util'
import zhihu from '../../../api/zhihu'

const CategoryItem = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={styles.item}
    >
      <Image
        blurRadius={8}
        style={styles.image}
        source={{ uri: props.image }}
      />
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
    this.duration = 400
    this._animate = new Animated.Value(false)
  }

  async componentDidMount () {
    this.subscription = DeviceEventEmitter.addListener('toggleCategory', this.toggle.bind(this))
    const { others } = await zhihu.getThemes()
    this.setState({ items: others || [] })
  }

  componentWillUnmount () {
    this.subscription.remove()
  }

  toggle () {
    Animated.timing(this._animate, { toValue: !this._animate._value, duration: this.duration }).start()
  }

  async itemClick (category) {
    this.toggle()
    await sleep(this.duration)
    this.props.onClick(category)
  }

  render () {
    return (
      <Animated.View style={[styles.container, {
        transform: [{
          translateY: this._animate.interpolate({
            inputRange: [false, true],
            outputRange: [-deviceH, 0],
            extrapolate: 'clamp'
          })
        }]
      }]}>
        <ScrollView>
          <View style={styles.list}>
            <CategoryItem
              title="今日热闻"
              image="https://o818xvhxo.qnssl.com/ceddJB493dB4A.jpg"
              onPress={() => { this.itemClick({}) }}
            />
            {
              this.state.items.map((item, index) =>
                <CategoryItem
                  title={item.name}
                  image={item.thumbnail}
                  onPress={() => { this.itemClick(item) }}
                  key={index}
                />
              )
            }
          </View>
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    transform: [{
      translateY: -deviceH
    }],
    width: '100%',
    height: '100%',
    zIndex: 1,
    backgroundColor: 'white'
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    width: '33.33333%',
    height: deviceW / 3,
    backgroundColor: 'transparent',
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)'
  },
  title: {
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9
  }
})
