/**
 * 知乎新闻详情页
 */

import React from 'react'
import {
  Image, StyleSheet, Text, View, Animated, TouchableHighlight,
  DeviceEventEmitter
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import { deviceW, htmlViewStyles, placeholderImage, sleep } from '../../util'
import { WebViewComponent, Spinner, BottomNav } from '../../components'
import ViewClass from '../ViewClass'
import zhihu from '../../api/zhihu'

let images = []

function renderNode (node, index, siblings, parent, defaultRenderer) {
  if (node.name === 'img') {
    const a = node.attribs
    const style = {width: deviceW, height: 200}
    const imageIndex = images.length
    images.push({ url: a.src })
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1} key={index}
        style={style}
        onPress={() => { DeviceEventEmitter.emit('SHOW_IMAGE_VIEWER', { images, show: true, index: imageIndex }) }}
      >
        <Image resizeMode="contain" style={style} source={{uri: a.src}} />
      </TouchableHighlight>
    )
  }
}

function getContent (html) {
  if (!html) return ''
  let startTag = '<div class="content">'
  let endTag = '</div></div></div><script'
  let content = html.replace(/\n|\r/g, '')
  return content.slice(content.indexOf(startTag) + startTag.length, content.indexOf(endTag))
}

export default class DailyDetail extends ViewClass {
  static navigationOptions = {
    headerLeft: null,
    header: null
  }

  constructor (props) {
    super(props)
    this.state = { data: {} }
    this._fadeAnim = new Animated.Value(0)
  }

  check () {
    const data = this.state.data
    if (data.external_url) return data.external_url
    return data.body.split('class=\"question\"').length > 2 ? data.share_url : ''
  }

  async componentDidMount () {
    let id = this.props.id || this.props.navigation.state.params.id
    const data = await zhihu.getNews(id) || {}
    this.setState({ data })
    await sleep(100)
    Animated.timing(this._fadeAnim, { toValue: 1, duration: 300 }).start()
  }

  componentWillUnmount () {
    images = []
  }

  render () {
    if (!this.state.data.body) return <Spinner delay={500} />
    const url = this.check()
    const content = url ? <WebViewComponent uri={url} /> : (
      <ParallaxScrollView
        contentBackgroundColor="white"
        headerBackgroundColor={this.props.screenProps.theme.color}
        backgroundColor="rgba(0,0,0,.3)"
        stickyHeaderHeight={ HEADER_HEIGHT }
        parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
        backgroundSpeed={10}
        renderBackground={() =>
          <View key="background">
            <Image
              source={{
                uri: this.state.data.image,
                width: deviceW,
                height: PARALLAX_HEADER_HEIGHT
              }}
              defaultSource={placeholderImage}
            />
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
            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,.3)', 'rgba(0,0,0,.4)', 'rgba(0,0,0,.6)', 'rgba(0,0,0,.8)']} style={styles.linearGradient}>
              <Text style={styles.title}>{this.state.data.title}</Text>
            </LinearGradient>
          </View>
        }

        renderStickyHeader={() =>
          <View key="sticky-header" style={styles.stickySection}></View>
        }
      >
        <View style={styles.bodyContent}>
          <HTMLView
            renderNode={renderNode}
            value={getContent(this.state.data.body)}
            addLineBreaks={false}
            stylesheet={htmlViewStyles}
            onLinkPress={uri => this.props.navigation.navigate('WebView', { uri })}
          />
        </View>
      </ParallaxScrollView>
    )
    return (
      <Animated.View style={[
        styles.container,
        {opacity: this._fadeAnim}
      ]}>
        {content}
        <BottomNav items={[
          { name: 'ios-arrow-round-back-outline', size: 28, onPress: () => { this.props.navigation.goBack() } },
          { name: 'ios-arrow-round-up-outline', size: 28 },
          { name: 'ios-share-outline', size: 22 },
          { name: 'ios-text-outline', size: 22 }
        ]} />
      </Animated.View>
    )
  }
}

const HEADER_HEIGHT = 20
const PARALLAX_HEADER_HEIGHT = 260

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  stickySection: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  parallaxHeader: {
    flex: 1
  },
  bodyContent: {
    flex: 1,
    padding: 10
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
  title: {
    width: '100%',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
