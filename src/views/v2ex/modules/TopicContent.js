import React, { Component } from 'react'
import {
  StyleSheet, View, Text, Image, TouchableHighlight, DeviceEventEmitter
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Markdown from 'react-native-simple-markdown'
import { dateFrom, markdownStyles, px2dp } from '../../../util'

/**
 * 主题内容
 */

export default class Content extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return false
  }

  render () {
    let data = this.props.data
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text selectable={true} style={styles.title}>{data.title}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              {/* 用户头像 */}
              <Image
                style={styles.image}
                source={{uri: `http:${data.member.avatar_normal}`}}
              />
              {/* 用户名 */}
              <Text selectable={true} style={styles.smallFont}>{data.member.username}</Text>
              {/* 发布时间 */}
              <Text style={[styles.smallFont, { marginLeft: 10 }]}>{dateFrom(new Date(data.created * 1000))}</Text>
              {/* 回复数 */}
              <Icon name="md-text" size={px2dp(20)} color="#ccc" style={{ marginLeft: 10, marginTop: 4 }} />
              <Text style={styles.smallFont}> {data.replies}</Text>
            </View>
            <View style={styles.row}>
              <TouchableHighlight style={styles.node}>
                {/* 发布节点 */}
                <Text style={[styles.smallFont, { color: 'white' }]}>{data.node.title}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <Markdown
            styles={markdownStyles}
            rules={{
              image: {
                react: (node, output, state) => (
                  <TouchableHighlight
                    key={state.key}
                    onPress={() => { DeviceEventEmitter.emit('SHOW_IMAGE_VIEWER', { images: [{ url: node.target }], show: true, index: 0 }) }}
                    underlayColor="transparent"
                    activeOpacity={1}
                    style={markdownStyles.image}
                  >
                    <Image
                      source={{ uri: node.target }}
                      style={markdownStyles.image}
                    />
                  </TouchableHighlight>
                )
              }
            }}
          >
            {data.content}
          </Markdown>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 10
  },
  header: {
    padding: 10,
    paddingBottom: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5
  },
  content: {
    padding: 10
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 26
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 22,
    width: 22,
    marginRight: 5,
    borderRadius: 10
  },
  smallFont: {
    fontSize: 12
  },
  gray: {
    color: '#757575'
  },
  node: {
    padding: 3,
    backgroundColor: '#ccc',
    borderRadius: 2
  }
})
