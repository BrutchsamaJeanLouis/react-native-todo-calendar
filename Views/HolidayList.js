import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { styleConstants } from '../constants/style-const';
import AppBar from '../components/AppBar';

export default function HolidayList() {
  const holidays = useSelector((root) => root.holidays)
  console.log(holidays)

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.titleContainer}>
        <AppBar />
        {/* <Text style={styles.title}>UK Holiday Days</Text> */}
        <FlatList
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer:{
    backgroundColor: styleConstants.BACKGROUNDCOLOR,
    height: 50
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
  }
});
