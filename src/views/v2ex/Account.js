/**
 * 用户中心页
 */

import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert, Image } from 'react-native'
import { Group, Cell, BackButton } from '../../components'
import { baseNavigationOptions } from '../../util'
import { login, user } from '../../api/v2ex'

export default class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...baseNavigationOptions({ navigation, screenProps }),
      title: '账户',
      headerLeft: <BackButton text="返回" navigation={navigation} />
    }
  }

  async logout () {
    const result = await login.logout()
    if (!result.error) {
      this.props.navigation.navigate('Login')
    } else {
      Alert.alert('', result.error)
    }
  }

  render () {
    return (
      <View style={styles.container}>
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
              <Image style={{ width: 25, height: 25 }} source={{ uri: user.get('avatar') }} />
            }
          />
          <Cell
            title="铜币"
            isLink={false}
            rightComponent={
              user.get('money')[0].map((value, index) => {
                return (
                  <View key={index} style={styles.money}>
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
          {/* <Cell
            title='启动APP时自动签到'
            isLink={false}
            rightComponent={
              <Text style={styles.gray}></Text>
            }
          /> */}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  gray: {
    color: '#bbb'
  },
  money: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
