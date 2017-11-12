import React, { Component } from 'react'
import { View, DeviceEventEmitter } from 'react-native'
import Routers from './src/routers'

if (!global.__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {}
  }
}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      screenProps: {}
    }
  }

  componentDidMount () {
    this.subscription = DeviceEventEmitter.addListener('chnageTheme', theme => {
      this.setState({
        screenProps: { theme }
      })
    })
  }

  componentWillUnmount () {
    this.subscription.remove()
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Routers screenProps={this.state.screenProps}/>
      </View>
    )
  }
}
