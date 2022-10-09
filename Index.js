import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import HolidayList from './views/HolidayList'
import AppBar from './components/AppBar'
import axios from 'axios'
import { prepareSixMonthHolidays } from './utils/prepare-holidays'
import dummyJson from './holidays.json'
import { setHolidays } from './redux/reducers/holidays'
import LoadingSpinner from './components/LoadingSpinner'
import HolidayView from './views/HolidayView'
import modeConst from './constants/mode-const'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const viewing = useSelector(root => root.holidays.viewing)
  const mode = useSelector(root => root.holidays.mode)
  useEffect(() => {
    fetchHolidays()
  }, [])

  // on Mode Toggle fetch data again
  useEffect(() => {
    fetchHolidays()
  }, [mode])

  const fetchHolidays = async () => {
    if (mode === modeConst.FETCH) {
      const response = await axios.get('https://www.gov.uk/bank-holidays.json')
        .catch((err) => {
          console.log(err)
          /** Handle Error Here with message */
        })

      if (response?.data) {
        // TODO don't want to reach API request limit will use local JSON For now
        // const result = prepareSixMonthHolidays(response.data)
        const result = prepareSixMonthHolidays(dummyJson)
        dispatch(setHolidays(result))
      }
    } else {
      await AsyncStorage.getItem('ukBankHolidayData')
        .then(data => {
          const savedData = JSON.parse(data)
          console.log('Loading Saved Data', savedData)
          dispatch(setHolidays(savedData))
        })
        .catch(err => console.log(err))
    }
    setLoading(false)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <AppBar />
      <SafeAreaView style={{ flex: 1 }}>
        {!viewing ? <HolidayList /> : <HolidayView />}
      </SafeAreaView>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
})
