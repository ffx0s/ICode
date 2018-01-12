/**
 * 用户中心页
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert, Image, Switch, ScrollView } from 'react-native'
import Toast from 'react-native-root-toast'
import { Group, Cell, BackButton } from '../../components'
import { baseNavigationOptions, localStorage } from '../../util'
import { user } from '../../api/v2ex'

export default class Account extends Component {
  constructor (props) {
    super(props)
    this.state = { enabled: true }
    localStorage.get('AUTO_CHECKIN').then(value => {
      this.setState({ enabled: !value || value === 'true' })
    })
  }

  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...baseNavigationOptions({ navigation, screenProps }),
      title: '账户',
      headerLeft: <BackButton text="返回" navigation={navigation} />
    }
  }

  onValueChange (value) {
    this.setState({ enabled: value })
    localStorage.set('AUTO_CHECKIN', value.toString())
  }

  async logout () {
    Toast.show('等待响应...', { position: 0, delay: 500 })
    const result = await user.logout()
    if (!result.error) {
      this.props.navigation.navigate('Login')
    } else {
      Alert.alert('', result.error)
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Group>
          <Cell
            title="用户名"
            isLink={false}
            rightComponent={
              <Text style={styles.gray}>{user.get('name')}</Text>
            }
          />
          <Cell
            title="头像"
            isLink={false}
            rightComponent={
              <Image style={{ width: 25, height: 25, borderRadius: 4 }} source={{ uri: user.get('avatar') }} />
            }
          />
          <Cell
            title="铜币"
            isLink={false}
            rightComponent={
              user.get('money')[0].map((value, index) => {
                return (
                  <View key={index} style={styles.row}>
                    <Text> {value} </Text>
                    <Image style={{ width: 15, height: 15 }} source={{ uri: user.get('money')[1][index] }} />
                  </View>
                )
              })
            }
          />
          <Cell
            title="邮箱"
            isLink={false}
            rightComponent={
              <Text style={styles.gray}>{user.get('email')}</Text>
            }
          />
          <Cell
            title="手机"
            isLink={false}
            rightComponent={
              <Text style={styles.gray}>{user.get('mobile')}</Text>
            }
          />
          <Cell
            title='排行'
            isLink={false}
            rightComponent={
              <Text style={styles.gray}>{user.get('ranking')}</Text>
            }
          />
          <Cell
            title='ONCE'
            isLink={false}
            rightComponent={
              <Text style={styles.gray}>{user.get('once')}</Text>
            }
          />
        </Group>
        <Group>
          <Cell
            title='自动签到'
            isLink={false}
            rightComponent={(
              <View style={styles.row}>
                <Text style={styles.gray}>{user.get('hasCheckin') ? '已签到' : '未签到'}  </Text>
                <Switch onValueChange={this.onValueChange.bind(this)} value={this.state.enabled} />
              </View>
            )}
          />
        </Group>
        <Group>
          <Cell
            title="退出登录"
            style={{ justifyContent: 'center' }}
            onPress={() =>
              Alert.alert(
                '确认退出登录？',
                '',
                [
                  {text: '取消', style: 'cancel'},
                  {text: '确定', onPress: () => this.logout()}
                ],
                { cancelable: false }
              )}
          />
        </Group>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gray: {
    color: '#bbb'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
