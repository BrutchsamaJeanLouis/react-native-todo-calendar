import { StyleSheet, Text, View } from 'react-native'
import { Card, Avatar, IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import React from 'react'
import dayjs from 'dayjs'
import { setViewing } from '../redux/reducers/holidays'
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

const HolidayCard = ({ holiday }) => {
  const dispatch = useDispatch()
  // const day = dayjs(holiday.date).get('date')
  const day = dayjs(holiday.date).format('Do')
  const month = dayjs(holiday.date).format('MMM')

  console.log(holiday)
  return (
    <Card onPress={() => dispatch(setViewing(true))}>
      <Card.Title
        titleStyle={{ fontWeight: 'bold' }}
        subtitleStyle={{ fontSize: 12 }}
        title={holiday.title}
        subtitle={holiday.countries.toString()}
        left={(props) => (
          <View>
            <Text style={{ fontSize: 16 }}>{day}</Text>
            <Text>{month}</Text>
          </View>
        )}
      />
    </Card>
  )
}

const styles = StyleSheet.create({})

export default HolidayCard
