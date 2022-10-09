import { StyleSheet, Text, View } from 'react-native'
import { Card, Avatar, IconButton,Divider } from 'react-native-paper'
// import Swipeable from 'react-native-swipeable'
import { useDispatch } from 'react-redux'
import React from 'react'
import dayjs from 'dayjs'
import { setViewing, setHolidayViewing, setViewingIndex} from '../redux/reducers/holidays'
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const HolidayCard = ({ holiday, index }) => {
  const dispatch = useDispatch()
  // with suffix const day = dayjs(holiday.date).format('Do')
  const day = dayjs(holiday.date).format('DD')
  const month = dayjs(holiday.date).format('MMM')

  const viewHoliday = () => {
    dispatch(setHolidayViewing(holiday))
    dispatch(setViewingIndex(index))
    dispatch(setViewing(true))
  }

  return (
    // <Swipeable onLeftActionRelease={() => console.log('swiped')}>
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
        />
        <Divider />
      </Card>
    // </Swipeable>
  )
}

const styles = StyleSheet.create({})

export default HolidayCard
