import React, { Component } from 'react'
import { View, Modal, DeviceEventEmitter } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import Orientation from 'react-native-orientation'
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
      screenProps: {},
      imageViewer: { images: [], show: false, index: 0 }
    }
  }

  componentDidMount () {
    event(this)
    Orientation.lockToPortrait()
  }

  render () {
    return (
      <ErrorBoundary>
        <View style={{flex: 1}}>
          <Routers ref="router" screenProps={this.state.screenProps}/>
          <Modal visible={this.state.imageViewer.show} transparent={true} animationType="fade">
            <ImageViewer imageUrls={this.state.imageViewer.images} index={this.state.imageViewer.index} onCancel={() => { DeviceEventEmitter.emit('SHOW_IMAGE_VIEWER', { show: false }) }} />
          </Modal>
        </View>
      </ErrorBoundary>
    )
  }
}
