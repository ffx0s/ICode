import React, { Component } from 'react'
import {
  StyleSheet, View, ScrollView, Text, Image, Modal,
  DeviceEventEmitter, TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { deviceW } from '../../../util'
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
      items: [],
      show: false
    }
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
    this.setState({ show: !this.state.show })
  }

  async itemClick (category) {
    this.props.onClick(category)
    this.toggle()
  }

  render () {
    return (
      <Modal visible={this.state.show} transparent={false} animationType="slide">
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
        <View style={styles.footer}>
          <Icon onPress={this.toggle.bind(this)} name="md-close" size={28} />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  footer: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
