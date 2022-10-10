import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useId } from 'react'
import { useSelector } from 'react-redux'
import HolidayCard from '../components/HolidayCard'

export default function HolidayList () {
  const holidayId = useId()
  const holidays = useSelector((root) => root.holidays.data)

  const renderSorryMessage = !holidays || holidays.length === 0

  return (
    <View style={styles.container}>
      {renderSorryMessage &&
        <Text style={styles.textStyles}>
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
  },
  textStyles: {
    fontSize: 15, textAlign: 'center', marginTop: 30
  }
})
