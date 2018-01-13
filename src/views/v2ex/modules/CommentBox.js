/**
 * 评论框
 */

import React, { Component } from 'react'
import { View, Modal, TextInput, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disable: true
    }
  }

  static PropTypes = {
    show: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
    onChangeContent: PropTypes.func.isRequired,
    onSend: PropTypes.func
  }

  static defaultProps = {
    onSend: () => {}
  }

  updateText (content) {
    this.props.onChangeContent(content)
    this.setState({ disable: !content.trim() })
  }

  render () {
    return (
      <Modal visible={this.props.show} transparent={true} animationType="fade">
        <TouchableOpacity activeOpacity={1} onPress={() => { this.props.toggle(false) }} style={styles.wrap}>
          <TouchableOpacity activeOpacity={1} style={styles.inner}>
            <TextInput
              placeholder="请尽量让自己的回复能够对别人有帮助"
              defaultValue=""
              value={this.props.content}
              onChangeText={this.updateText.bind(this)}
              style={styles.input}
              placeholderTextColor="#ccc"
              maxLength={10000}
              multiline={true}
              autoFocus={true}
            />
            <View style={styles.bottom}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => { !this.state.disable && this.props.onSend(this.props.content) }}
              >
                <View style={[styles.button, this.state.disable ? {} : { borderColor: this.props.screenProps.theme.color }]}>
                  <Text style={[styles.buttonText, this.state.disable ? {} : { color: this.props.screenProps.theme.color }]}>发送</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = {
  wrap: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  inner: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    height: 150,
    backgroundColor: '#fff'
  },
  input: {
    padding: 10,
    height: 90,
    backgroundColor: '#efefef'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 5,
    paddingVertical: 8,
    width: 50,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#ccc'
  }
}
