import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Card, Avatar, IconButton,Divider } from 'react-native-paper'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import dayjs from 'dayjs'
import { setViewing, setHolidayViewing, setViewingIndex, setHolidays} from '../redux/reducers/holidays'
import modeConst from '../constants/mode-const';
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const HolidayCard = ({ holiday, index }) => {
  const dispatch = useDispatch()
  const mode = useSelector(root => root.holidays.mode)
  const holidayState = useSelector(root => root.holidays.data)
  // with suffix const day = dayjs(holiday.date).format('Do')
  const day = dayjs(holiday.date).format('DD')
  const month = dayjs(holiday.date).format('MMM')

  const viewHoliday = () => {
    dispatch(setHolidayViewing(holiday))
    dispatch(setViewingIndex(index))
    dispatch(setViewing(true))
  }

  const deleteCard = async (gestureState) => {
    // if not on saved list ignore swipe delete
    if (mode === modeConst.FETCH) return
    const newHolidays = [...holidayState]
    newHolidays.splice(index, 1)
    dispatch(setHolidays(newHolidays))

    await AsyncStorage.setItem('ukBankHolidayData', JSON.stringify(newHolidays))
    console.log('swiped Left')
  }

  return (
    <GestureRecognizer onSwipeLeft={deleteCard} onSwipeRight={deleteCard}>
      <Card onPress={() => viewHoliday()} elevation={0}>
        <Card.Title
          style={{ backgroundColor: 'white' }}
          titleStyle={{ color: '#ed4731' }}
          subtitleStyle={{ fontSize: 12, fontStyle: 'italic' }}
          title={holiday.title}
          leftStyle={{ width: 60, justifyContent: 'flex-start' }}
          subtitle={holiday.countries.toString()}
          left={(props) => (
            <View>
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{day} {month}</Text>
            </View>
          )}
          right={(props) => {
            if (mode === modeConst.SAVED) {
              return <IconButton icon='minus-circle-outline' onPress={() => deleteCard()} />
            }
          }}
        />
        <Divider />
      </Card>
    </GestureRecognizer>
  )
}
// TODO Refactor and classify styles here
const styles = StyleSheet.create({})

export default HolidayCard
