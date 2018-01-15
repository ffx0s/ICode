import React, { Component } from 'react'
import { View, Modal, DeviceEventEmitter, StatusBar } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import event from './event'
import Routers from './src/routers'
import { ErrorBoundary } from './src/components'

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
      barStyle: 'light-content',
      screenProps: {},
      imageViewer: { images: [], show: false, index: 0 }
    }
  }

  componentDidMount () {
    event(this).emit('LOCKTO', 'Portrait')
  }

  render () {
    return (
      <ErrorBoundary>
        <View style={{flex: 1}}>
          <StatusBar
            barStyle={this.state.barStyle}
            animated={true}
          />
          <Routers ref="router" screenProps={this.state.screenProps} />
          <Modal visible={this.state.imageViewer.show} transparent={true} animationType="fade">
            <ImageViewer imageUrls={this.state.imageViewer.images} index={this.state.imageViewer.index} onCancel={() => { DeviceEventEmitter.emit('SHOW_IMAGE_VIEWER', { show: false }) }} />
          </Modal>
        </View>
      </ErrorBoundary>
    )
  }
}
