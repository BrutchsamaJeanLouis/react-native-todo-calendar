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

const Index = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const viewing = useSelector(root => root.holidays.viewing)
  useEffect(() => {
    fetchHolidays()
  }, [])

  const fetchHolidays = async () => {
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
