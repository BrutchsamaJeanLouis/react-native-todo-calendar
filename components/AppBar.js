import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { setHolidayViewing, setViewing, setViewingIndex } from '../redux/reducers/holidays'

export const AppBar = () => {
  const dispatch = useDispatch()
  const viewing = useSelector(root => root.holidays.viewing)

  const goBack = () => {
    dispatch(setViewing(false))
    dispatch(setViewingIndex(null))
    dispatch(setHolidayViewing({}))
  }

  return (
    <Appbar.Header style={{ backgroundColor: '#ed4731' }}>
      {viewing && <Appbar.BackAction color='white' onPress={() => goBack()} />}
      <Appbar.Content color='white' titleStyle={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold' }} title='UK Bank Holidays' />
    </Appbar.Header>
  )
}

const style = StyleSheet.create({
  appBar: {
  }
})

export default AppBar
