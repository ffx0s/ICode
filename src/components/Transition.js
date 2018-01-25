/**
 * 透明度动画组件
 */

import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'

export class Transition extends Component {
  constructor (props) {
    super(props)
    this.state = { isRender: true }
    this.isRemove = false
    this._fadeAnim = new Animated.Value(1)
    this._fadeAnim.addListener(({ value }) => {
      if (value === 0 && this.isRemove) {
        this.setState({ isRender: false })
      }
    })
  }
  static propTypes = {
    duration: PropTypes.number
  }
  static defaultProps = {
    duration: 400
  }
  setOpacity (toValue) {
    Animated.timing(this._fadeAnim, { toValue, duration: this.props.duration }).start()
  }
  show () {
    this.setOpacity(1)
  }
  hide () {
    this.setOpacity(0)
  }
  remove () {
    this.isRemove = true
    this.setOpacity(0)
  }
  renderChildren () {
    return React.Children.map(this.props.children, (Element, i) => {
      if (!React.isValidElement(Element)) return
      return <View key={'child-' + i} >{Element}</View>
    })
  }
  render () {
    return (
      this.state.isRender ? (
        <Animated.View
          style={[{
            opacity: this._fadeAnim,
            zIndex: this._fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-1, 1],
              extrapolate: 'clamp'
            })
          }, this.props.style]}
        >
          {this.renderChildren()}
        </Animated.View>
      ) : null
    )
  }
}
