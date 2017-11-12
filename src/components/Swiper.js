/**
 * swiper封装
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import { deviceW } from '../util'
import SwiperComponent from 'react-native-swiper'

const loading = require('../assets/images/loading.gif')
const styles = {
  wrapper: {
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width: deviceW,
    flex: 1,
    backgroundColor: 'transparent'
  },

  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white'
  },

  loadingImage: {
    width: 60,
    height: 60
  },
  pagination: {
    bottom: 10
  }
}

const Item = props => {
  return (
    <View style={styles.slide}>
      <Image onLoad={props.loadHandle.bind(null, props.i)} resizeMode='cover' style={[styles.image, {height: props.height}]} source={{uri: props.uri}} />
      {
        !props.loaded && (
          <View style={styles.loadingView}>
            <Image style={styles.loadingImage} source={loading} />
          </View>
        )
      }
    </View>
  )
}

export class Swiper extends Component {
  static PropTypes = {
    imgList: PropTypes.array.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }
  static defaultProps = {
    width: deviceW,
    height: 180
  }

  constructor (props) {
    super(props)
    this.state = {
      loadQueue: [0, 0, 0, 0]
    }
    this.loadHandle = this.loadHandle.bind(this)
  }
  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }
  render () {
    return (
      <View style={{height: this.props.height}}>
        {
          this.props.imgList.length ? (
            <SwiperComponent
              style={styles.wrapper}
              loop={false}
              height={this.props.height}
              paginationStyle={styles.pagination}
              activeDotColor={this.props.screenProps.theme.color}
              {...this.props.swiperProps}
            >
              {
                this.props.imgList.map((item, i) => (
                  <Item
                    loadHandle={this.loadHandle}
                    loaded={!!this.state.loadQueue[i]}
                    uri={item}
                    i={i}
                    key={i}
                  />
                ))
              }
            </SwiperComponent>
          ) : null
        }
      </View>
    )
  }
}
