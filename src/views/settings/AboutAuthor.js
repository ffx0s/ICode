/*
 * 关于作者
 */

import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import ViewClass from '../ViewClass'
import { deviceW } from '../../util'
import { Group, Cell, BackButton } from '../../components'

export default class About extends ViewClass {
  static navigationOptions = {
    header: null,
    headerLeft: null
  }

  render () {
    return (
      <ParallaxScrollView
        contentBackgroundColor="white"
        headerBackgroundColor={this.props.screenProps.theme.color}
        backgroundColor={this.props.screenProps.theme.color}
        stickyHeaderHeight={ HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        renderBackground={() =>
          <View key="background">
            <Image source={{
              uri: 'https://static.webfed.cn/ceddJB493dB4A.jpg',
              width: deviceW,
              height: PARALLAX_HEADER_HEIGHT
            }}/>
            <View style={{
              position: 'absolute',
              top: 0,
              width: deviceW,
              backgroundColor: 'rgba(0,0,0,.4)',
              height: PARALLAX_HEADER_HEIGHT
            }}/>
          </View>
        }

        renderForeground={() =>
          <View key="parallax-header" style={ styles.parallaxHeader }>
            <Image style={ styles.avatar } source={{
              uri: 'https://static.webfed.cn/logo.jpg',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE
            }}/>
            <Text style={ styles.sectionSpeakerText }>99</Text>
            <Text style={ styles.sectionTitleText }>Web Developer</Text>
          </View>
        }

        renderStickyHeader={() =>
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>作者</Text>
          </View>
        }

        renderFixedHeader={() =>
          <View key="fixed-header" style={styles.fixedSection}>
            <BackButton text=" " navigation={this.props.navigation} />
          </View>
        }
      >
        <Group borderWidthAuto={true}>
          <Cell title="Blog" onPress={() => { this.props.navigation.navigate('WebView', { uri: `https://webfed.cn`, title: 'Blog' }) }} />
          <Cell title="Github" onPress={() => { this.props.navigation.navigate('WebView', { uri: `https://github.com/ffx0s`, title: 'Github' }) }} />
        </Group>
      </ParallaxScrollView>
    )
  }
}

const HEADER_HEIGHT = 65
const AVATAR_SIZE = 100
const PARALLAX_HEADER_HEIGHT = 300

const styles = StyleSheet.create({
  stickySection: {
    height: HEADER_HEIGHT,
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
