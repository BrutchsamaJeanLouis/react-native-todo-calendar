import { StyleSheet, Text, View } from 'react-native'
import { Card, Avatar, IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import React from 'react'
import dayjs from 'dayjs'
import { setViewing, setHolidayViewing} from '../redux/reducers/holidays'
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const HolidayCard = ({ holiday }) => {
  const dispatch = useDispatch()
  // const day = dayjs(holiday.date).get('date')
  const day = dayjs(holiday.date).format('Do')
  const month = dayjs(holiday.date).format('MMM')

  const viewHoliday = () => {
    dispatch(setHolidayViewing(holiday))
    dispatch(setViewing(true))
  }

  return (
    <Card onPress={() => viewHoliday()}>
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
            {/* <Text>{month}</Text> */}
          </View>
        )}
      />
    </Card>
  )
}

const styles = StyleSheet.create({})

export default HolidayCard
