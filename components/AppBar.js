import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { setHolidayViewing, setViewing, setViewingIndex, toggleAppMode } from '../redux/reducers/holidays'
import modeConst from '../constants/mode-const'

export const AppBar = () => {
  const dispatch = useDispatch()
  const viewing = useSelector(root => root.holidays.viewing)
  const mode = useSelector(root => root.holidays.mode)
  const headerTitle = mode === modeConst.FETCH ? 'UK Bank Holidays' : 'Your Saved Holidays'

  const goBack = () => {
    dispatch(setViewing(false))
    dispatch(setViewingIndex(null))
    dispatch(setHolidayViewing({}))
  }

  const switchModes = () => {
    dispatch(toggleAppMode())
  }

  return (
    <Appbar.Header style={{ backgroundColor: '#ed4731' }}>
      {!viewing && <Appbar.Action icon='view-list' onPress={() => switchModes()} /> }
      {viewing && <Appbar.BackAction color='white' onPress={() => goBack()} />}
      <Appbar.Content color='white' titleStyle={{ textAlign: 'center', fontSize: 19, fontWeight: 'bold' }} title={headerTitle} />
      <Appbar.Action />
    </Appbar.Header>
  )
}

// TODO Refactor and classify styles here
const style = StyleSheet.create({
  appBar: {
  }
})

export default AppBar
