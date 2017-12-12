/**
 * 知乎新闻详情页
 */

import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Animated } from 'react-native'
import HTMLView from 'react-native-htmlview'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import { baseNavigationOptions, deviceW, htmlViewStyles, px2dp, placeholderImage } from '../../util'
import { WebViewComponent } from '../../components'
import zhihu from '../../api/zhihu'

function renderNode (node, index, siblings, parent, defaultRenderer) {
  if (node.name === 'img') {
    const a = node.attribs
    return (<Image resizeMode="contain" key={index} style={{width: deviceW, height: 200}} source={{uri: a.src}} />)
  }
}

function getContent (html) {
  if (!html) return ''
  let startTag = '<div class="content">'
  let endTag = '</div></div></div><script'
  let content = html.replace(/\n|\r/g, '')
  return content.slice(content.indexOf(startTag) + startTag.length, content.indexOf(endTag))
}

const Footer = props => {
  return (
    <View style={styles.footer}>
      <Icon name="ios-arrow-round-back-outline" style={styles.footerItem} size={px2dp(30)} onPress={() => { props.navigation.goBack() }} />
      <Icon name="ios-arrow-round-up-outline" style={styles.footerItem} size={px2dp(30)} />
      <Icon name="ios-share-outline" style={styles.footerItem} size={px2dp(25)} />
      <Icon name="ios-text-outline" style={styles.footerItem} size={px2dp(25)} />
    </View>
  )
}

export default class DailyDetail extends Component {
  static navigationOptions ({ navigation, screenProps }) {
    return baseNavigationOptions({ navigation, screenProps }, {
      header: null
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
    this._fadeAnim = new Animated.Value(0)
  }

  check () {
    const data = this.state.data
    if (data.external_url) return data.external_url
    return data.body.split('class=\"question\"').length > 2 ? data.share_url : ''
  }

  async componentDidMount () {
    let id = this.props.id || this.props.navigation.state.params.id
    const data = await zhihu.getNews(id)
    this.setState({
      data: data || {}
    })
    Animated.timing(this._fadeAnim, { toValue: 1, duration: 200 }).start()
  }

  render () {
    if (!this.state.data.body) return null
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
        {
          this.state.data.body ? (
            <View style={styles.bodyContent}>
              <HTMLView
                renderNode={renderNode}
                value={getContent(this.state.data.body)}
                addLineBreaks={false}
                stylesheet={htmlViewStyles}
                onLinkPress={uri => this.props.navigation.navigate('WebView', { uri })}
              />
            </View>
          ) : null
        }
      </ParallaxScrollView>
    )
    return (
      <Animated.View style={[
        styles.container,
        {opacity: this._fadeAnim}
      ]}>
        {content}
        <Footer navigation={this.props.navigation} />
      </Animated.View>
    )
  }
}

const HEADER_HEIGHT = 20
const PARALLAX_HEADER_HEIGHT = 260

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  footerItem: {
    flex: 1,
    color: '#bbb',
    textAlign: 'center'
  }
})
