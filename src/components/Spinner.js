/**
 * Spinner
 */

import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { loadingImage } from '../util'

export class Spinner extends Component {
  constructor (props) {
    super(props)
    this._timer = null
    this.state = { isRender: false }
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    delay: PropTypes.number
  }

  static defaultProps = {
    width: 60,
    height: 60,
    delay: 0
  }

  componentDidMount () {
    this._timer = window.setTimeout(() => {
      this.setState({ isRender: true })
    }, this.props.delay)
  }

  componentWillUnmount () {
    clearTimeout(this._timer)
  }

  render () {
    const content = (
      <View style={styles.spinner}>
        <Image style={{ width: this.props.width, height: this.props.height }} source={loadingImage} />
      </View>
    )
    return this.state.isRender ? content : null
  }
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
