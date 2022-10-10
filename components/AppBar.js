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
    <Appbar.Header style={style.appBarHeader}>
      {!viewing && <Appbar.Action icon='view-list' color='white' onPress={() => switchModes()} />}
      {viewing && <Appbar.BackAction color='white' onPress={() => goBack()} />}
      <Appbar.Content color='white' titleStyle={style.titleStyles} title={headerTitle} />
      <Appbar.Action />
    </Appbar.Header>
  )
}

const style = StyleSheet.create({
  appBarHeader: {
    backgroundColor: '#ed4731'
  },
  titleStyles: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold'
  }
})

export default AppBar
