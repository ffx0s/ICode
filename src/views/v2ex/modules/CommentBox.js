/**
 * 评论框
 */

import React, { Component } from 'react'
import { View, Modal, TextInput, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'

export default class CommentBox extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      content: '',
      disable: true
    }
  }

  static PropTypes = {
    onChangeContent: PropTypes.func,
    onSend: PropTypes.func
  }

  static defaultProps = {
    onSend: () => {}
  }

  updateText (content) {
    this.setState({ content, disable: !content.trim() })
  }

  reset () {
    this.setState({ content: '', show: false, disable: true })
  }

  render () {
    return (
      <Modal visible={this.state.show} transparent={true} animationType="fade">
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ show: false }) }} style={styles.wrap}>
            <TouchableOpacity activeOpacity={1} style={styles.inner}>
              <TextInput
                placeholder="请尽量让自己的回复能够对别人有帮助"
                defaultValue=""
                value={this.state.content}
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
                  onPress={() => { !this.state.disable && this.props.onSend(this.state.content) }}
                >
                  <View style={[styles.button, this.state.disable ? {} : { borderColor: this.props.screenProps.theme.color }]}>
                    <Text style={[styles.buttonText, this.state.disable ? {} : { color: this.props.screenProps.theme.color }]}>发送</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}

const styles = {
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%'
  },
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
