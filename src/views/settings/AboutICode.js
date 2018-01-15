/**
 * 关于 ICode
 */

import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Group, Cell, BackButton } from '../../components'
import ViewClass from '../ViewClass'

export default class AboutICode extends ViewClass {
  static navigationOptions ({ navigation, screenProps }) {
    return {
      ...ViewClass.navigationOptions({ navigation, screenProps }),
      title: '关于',
      headerLeft: <BackButton text="设置" navigation={navigation} />
    }
  }

  render () {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logo}>ICode</Text>
          </View>
          <Group>
            <Cell title="作者" onPress={() => { this.props.navigation.navigate('AboutAuthor') }} />
          </Group>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginVertical: 25,
    alignItems: 'center'
  },
  logo: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})
