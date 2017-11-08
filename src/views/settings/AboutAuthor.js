/*
 * 关于
 */

import React, { Component } from 'react'
import {
  Dimensions, Image, StyleSheet, Text, View
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import { baseNavigationOptions } from '../../util'
import { Group, Cell, BackButton } from '../../components'

class About extends Component {
  static navigationOptions ({ navigation, screenProps }) {
    return baseNavigationOptions({ navigation, screenProps }, {
      header: null
    })
  }

  render () {
    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        headerBackgroundColor={this.props.screenProps.theme.color}
        backgroundColor={this.props.screenProps.theme.color}
        stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}

        renderBackground={() => (
          <View key="background">
            <Image source={{
              uri: 'http://7jptea.com1.z0.glb.clouddn.com/ceddJB493dB4A.jpg',
              width: window.width,
              height: PARALLAX_HEADER_HEIGHT
            }}/>
            <View style={{
              position: 'absolute',
              top: 0,
              width: window.width,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }}/>
          </View>
        )}

        renderForeground={() => (
          <View key="parallax-header" style={ styles.parallaxHeader }>
            <Image style={ styles.avatar } source={{
              uri: 'http://7jptea.com1.z0.glb.clouddn.com/logo.jpg',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE
            }}/>
            <Text style={ styles.sectionSpeakerText }>99</Text>
            <Text style={ styles.sectionTitleText }>Web Developer</Text>
          </View>
        )}

        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>作者</Text>
          </View>
        )}

        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <BackButton text=" " navigation={this.props.navigation} />
          </View>
        )}
      >
        <Group borderWidthAuto={true}>
          <Cell title="Blog" onPress={() => { this.props.navigation.navigate('WebView', { uri: `https://webfed.cn`, title: 'Blog' }) }} />
          <Cell title="Github" onPress={() => { this.props.navigation.navigate('WebView', { uri: `https://github.com/ffx0s`, title: 'Github' }) }} />
        </Group>
      </ParallaxScrollView>
    )
  }
}

const window = Dimensions.get('window')

const AVATAR_SIZE = 100
const PARALLAX_HEADER_HEIGHT = 300
const STICKY_HEADER_HEIGHT = 70

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 14
  },
  fixedSection: {
    position: 'absolute',
    bottom: 5,
    left: 0
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  }
})

export default About
