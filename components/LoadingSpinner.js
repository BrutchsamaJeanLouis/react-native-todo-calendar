import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'

function LoadingSpinner () {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
})

export default LoadingSpinner
