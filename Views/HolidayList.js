import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useId, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styleConstants } from '../constants/style-const'
import AppBar from '../components/AppBar'
import axios from 'axios'
import { setHolidays } from '../redux/reducers/holidays'
import dummyJson from '../holidays.json'
import { prepareSixMonthHolidays } from '../utils/prepare-holidays'
import LoadingSpinner from '../components/LoadingSpinner'
import HolidayCard from '../components/HolidayCard'

// TODO Filter holidays for 5 and get the using dayJS
export default function HolidayList () {
  const holidayId = useId()
  const dispatch = useDispatch()
  const holidays = useSelector((root) => root.holidays.data)

  return (
    <View style={styles.container}>
      {!holidays &&
        <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 }}>
          Sorry no holidays to display
        </Text>}
      <FlatList
        style={styles.list}
        data={holidays}
        renderItem={(hol) => <HolidayCard holiday={hol.item} index={hol.index} />}
        key={holidayId}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  list: {
    flex: 1,
    height: '100%',
    minWidth: '100%',
    overflow: 'scroll'
  }
})
