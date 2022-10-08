import * as React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'

export const AppBar = () => {
  const { colors } = useTheme()
  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title='UK Holiday days' />
    </Appbar.Header>
  )
}

const style = StyleSheet.create({
  appBar: {
  }
})

export default AppBar
