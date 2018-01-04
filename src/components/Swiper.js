/**
 * swiper封装
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { deviceW, loadingImage } from '../util'
import SwiperComponent from 'react-native-swiper'
import LinearGradient from 'react-native-linear-gradient'

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
    bottom: 8
  },
  dotStyle: {
    width: 6,
    height: 6
  },
  activeDotStyle: {
    width: 6,
    height: 6
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    paddingBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 55,
    zIndex: 1
  },
  slideText: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent'
  }
}

const Item = props => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={styles.slide}
    >
      {
        props.text && (
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.4)', 'rgba(0,0,0,.6)', 'rgba(0,0,0,.8)']} style={styles.linearGradient}>
            <Text style={styles.slideText}>{props.text}</Text>
          </LinearGradient>
        )
      }
      <Image onLoad={props.loadHandle.bind(null, props.i)} resizeMode='cover' style={[styles.image, {height: props.height}]} source={{uri: props.uri}} />
      {
        !props.loaded && (
          <View style={styles.loadingView}>
            <Image style={styles.loadingImage} source={loadingImage} />
          </View>
        )
      }
    </TouchableOpacity>
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
    this.setState({ loadQueue })
  }
  render () {
    return (
      <View style={{height: this.props.height}}>
        {
          this.props.imgList.length ? (
            <SwiperComponent
              style={styles.wrapper}
              height={this.props.height}
              paginationStyle={styles.pagination}
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}
              activeDotColor='white'
              {...this.props.swiperProps}
            >
              {
                this.props.imgList.map((item, i) => (
                  <Item
                    loadHandle={this.loadHandle}
                    loaded={!!this.state.loadQueue[i]}
                    uri={item.uri}
                    i={i}
                    key={i}
                    text={item.text}
                    onPress={() => { this.props.onPress(item, i) }}
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
