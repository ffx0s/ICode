/**
 * 登录页
 */

import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Toast from 'react-native-root-toast'
import { login } from '../../api/v2ex'

export default class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: {
        user: '',
        password: '',
        code: ''
      },
      loginData: {}
    }
    this._submiting = false
  }
  static navigationOptions = { header: null }
  async componentDidMount () {
    const loginData = await login.getData()
    this.setState({ loginData })
    console.log('表单数据：', this.state.loginData)
  }
  async login () {
    if (this._submiting) return false
    this._submiting = true
    const toast = Toast.show('登录中...', { position: 0, delay: 200 })
    const result = await login.submit(this.state.login)

    console.log('登录状态：', result)

    if (!result.error && !result.problem) {
      this.props.navigation.navigate('V2ex')
    } else {
      Alert.alert('', result.error || result.problem)
    }

    Toast.hide(toast)
    this._submiting = false
  }
  updateText (name, value) {
    this.setState(state => ({ login: { ...state.login, [name]: value } }))
  }
  render () {
    return (
      <View style={styles.wrap}>
        <Image
          style={styles.backgroundImage}
          blurRadius={8}
          source={{ uri: 'https://o818xvhxo.qnssl.com/ceddJB493dB4A.jpg' }}
        />
        <View style={styles.top}>
          <Text style={styles.logo}>V2EX</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <TouchableHighlight style={styles.icon}><Icon name="md-person" size={18} color="#eee" /></TouchableHighlight>
            <TextInput
              placeholder="用户名/邮箱"
              defaultValue=""
              value={this.state.login.user}
              onChangeText={text => this.updateText('user', text)}
              style={styles.input}
              placeholderTextColor="#eee"
            />
          </View>
          <View style={styles.inputWrap}>
            <TouchableHighlight style={styles.icon}><Icon name="md-key" size={18} color="#eee" /></TouchableHighlight>
            <TextInput
              placeholder="密码"
              defaultValue=""
              value={this.state.login.password}
              onChangeText={text => this.updateText('password', text)}
              secureTextEntry={true}
              style={styles.input}
              placeholderTextColor="#eee"
            />
          </View>
          <View style={[styles.inputWrap, styles.between]}>
            <TouchableHighlight style={styles.icon}><Icon name="md-image" size={18} color="#eee" /></TouchableHighlight>
            <TextInput
              placeholder="验证码"
              defaultValue=""
              value={this.state.login.code}
              onChangeText={text => this.updateText('code', text)}
              style={styles.input}
              placeholderTextColor="#eee"
            />
            <View>
              {
                this.state.loginData.codeImage && (
                  <Image
                    resizeMode='contain'
                    style={styles.codeImage}
                    source={{uri: this.state.loginData.codeImage}}
                  />
                )
              }
            </View>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.loginButton, {backgroundColor: this.props.screenProps.theme.color}]}
              onPress={() => { this.login() }}>
              <Text style={styles.loginText}>登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  wrap: {
    flex: 1
  },
  top: {
    marginTop: '20%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    fontSize: 28
  },
  form: {
    padding: 20
  },
  between: {
    justifyContent: 'space-between'
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  inputWrap: {
    marginTop: 5,
    paddingTop: 10,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: 'white'
  },
  loginButton: {
    marginTop: 30,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center'
  },
  loginText: {
    fontSize: 16,
    color: 'white'
  },
  codeImage: {
    width: 128,
    height: 32,
    backgroundColor: '#eee'
  },
  icon: {
    paddingRight: 10
  }
}
