/**
 * 知乎新闻详情页
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'
import { baseNavigationOptions, deviceW } from '../../util'

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

export default class DailyDetail extends Component {
  static PropTypes = {
    body: PropTypes.string.isRequired
  }
  static navigationOptions = baseNavigationOptions

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.props.body ? (
              <HTMLView
                renderNode={renderNode}
                value={getContent(this.props.body)}
                addLineBreaks={false}
                stylesheet={htmlStyles}
                onLinkPress={uri => this.props.navigation.navigate('WebView', { uri })}
              />
            ) : null
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
})

const CONTENT_FONT_SIZE = 16
const TITLE_FONT_SIZE = 18
const CONTENT_LINEHEIGHT = 26
const MARGIN = 10

const htmlStyles = StyleSheet.create({
  p: {
    marginVertical: MARGIN,
    fontSize: CONTENT_FONT_SIZE,
    lineHeight: CONTENT_LINEHEIGHT
  },
  ul: {
    marginVertical: MARGIN
  },
  li: {
    lineHeight: CONTENT_LINEHEIGHT,
    fontSize: CONTENT_FONT_SIZE
  },
  blockquote: {
    marginVertical: MARGIN,
    lineHeight: CONTENT_LINEHEIGHT,
    fontSize: CONTENT_FONT_SIZE
  },
  ol: {
    marginVertical: MARGIN
  },
  strong: {
    fontWeight: 'bold',
    fontSize: TITLE_FONT_SIZE
  },
  h1: {
    fontSize: TITLE_FONT_SIZE
  }
})
