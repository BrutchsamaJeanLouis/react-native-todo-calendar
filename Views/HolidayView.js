import { DatePickerAndroid, FlatList, StyleSheet, Text, View } from 'react-native'
import { TextInput, IconButton, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { saveHoliday } from '../redux/reducers/holidays'
import modeConst from '../constants/mode-const'

const countriesEnum = ['England', ' Wales', ' Scotland', ' Northern ireland']

const HolidayView = () => {
  const dispatch = useDispatch()
  const holidayViewing = useSelector(root => root.holidays.holidayViewing)
  const holidayState = useSelector(root => root.holidays.data)
  const viewingIndex = useSelector(root => root.holidays.viewingIndex)
  const mode = useSelector(root => root.holidays.mode)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(holidayViewing.title)
  const [date, setDate] = useState(holidayViewing.date)
  const [notes, setNotes] = useState(holidayViewing.notes)
  const [countries, setCountries] = useState(holidayViewing.countries)
  const [showDateModal, setShowDateModal] = useState(false)

  const changeDate = (date) => {
    setShowDateModal(false)
    const dateFormat = dayjs(date.toISOString()).format('YYYY-MM-DD')
    setDate(dateFormat)
    console.log('change date', date.toISOString())
  }

  const changeCountry = (country, bool) => {
    if (!editing) return
    // adding
    if (bool === true) {
      const newCountries = [...countries, country]
      setCountries(newCountries)
    } else {
      // removing
      const found = countries.indexOf(country)
      console.log('found', found)
      console.log(countries, country)
      const newCountries = countries.slice(0, found).concat(countries.slice(found + 1))
      setCountries(newCountries)
    }
  }

  const completeChanges = async () => {
    dispatch(saveHoliday({
      ...holidayViewing,
      title,
      date,
      notes,
      countries
    }))

    // build a new holidaysState to save (redux state not updating in time)
    

    let newData = []
    // fetch prev saved Data
    await AsyncStorage.getItem('ukBankHolidayData')
      .then(data => {
        if (data) {
          // editing personal notes so modify index instead of creating new entry
          if (mode === modeConst.SAVED) {
            const savedData = [...holidayState]
            savedData[viewingIndex] = { ...holidayViewing, title, date, notes, countries }
            newData = savedData
          } else {
            const savedData = JSON.parse(data)
            // combine prev saved with editing data
            newData = [...savedData, { ...holidayViewing, title, date, notes, countries }]
          }
        } else {
          // no notes just add first  one
          newData.push({ ...holidayViewing, title, date, notes, countries })
        }
      })
      .catch(err => console.log(err))
    // update storage
    await AsyncStorage.setItem('ukBankHolidayData', JSON.stringify(newData))
    setEditing(false)
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
        <TextInput
          style={{ fontWeight: 'bold', fontSize: 20, backgroundColor: 'white', width: '70%' }}
          value={title}
          mode='flat'
          underlineColor='white'
          activeUnderlineColor={editing ?'#eeeeee' :'white'}
          onChangeText={text => setTitle(text)}
          editable={editing}
        />
        {!editing ? <IconButton
          style={{ alignSelf: 'flex-end', marginLeft: 50 }}
          icon='pencil'
          onPress={() => {setEditing(true)}}
        /> : <Button mode='contained' style={{ alignSelf: 'flex-end', backgroundColor: '#e88258',textColor: 'black', marginLeft: 20}} 
        onPress={() => completeChanges()}>Done</Button>}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', maxHeight: 50 }}>
        <Button
          style={{ marginLeft: 10 }}
          icon='calendar-month'
          mode='text'
          onPress={() => setShowDateModal(true)}
          textColor='#e88258'
          disabled={!editing}
        >
          {date}
        </Button>
      </View>
      {showDateModal && <DateTimePicker
        style={{ flex: 1, marginRight: 253, maxHeight: 50 }}
        mode='date'
        value={new Date(date)}
        onChange={(event, date) => { changeDate(date) }}
        dateFormat='day month year'
      />}
      <Text style={{ marginLeft: 15, fontSize: 17, marginTop: 20, fontWeight: 'bold' }}>Notes</Text>
      <TextInput
        style={{ backgroundColor: 'white', height: 60 }}
        value={notes}
        placeholder='Enter your notes here'
        mode='flat'
        underlineColor='white'
        activeUnderlineColor={editing ?'#ebe8e8' :'white'}
        onChangeText={text => setNotes(text)}
        editable={editing}
      />
      <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
        <Text style={{ margin: 15, fontSize: 17, fontWeight: 'bold' }}>Location</Text>
      </View>
      {countriesEnum.map((countryName, i) => (
        <View key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 15, maxHeight: 50 }}>
          <CheckBox
            color='#e88258'
            disabled={false}
            value={countries.includes(countryName)}
            onValueChange={(newValue) => changeCountry(countryName, newValue)}
          />
          <Text style={{ margin: 15 }}>{countryName}</Text>
        </View>
      ))}
    </View>
  )
}

export default HolidayView

// TODO Refactor and classify styles here
const styles = StyleSheet.create({})
