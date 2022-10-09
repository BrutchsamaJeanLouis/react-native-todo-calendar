import { DatePickerAndroid, FlatList, StyleSheet, Text, View } from 'react-native'
import { TextInput, IconButton, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import CheckBox from 'expo-checkbox';

const countriesEnum = ['England', ' Wales', ' Scotland', ' Northern ireland']

const HolidayView = () => {
  const holidayViewing = useSelector(root => root.holidays.holidayViewing)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(holidayViewing.title)
  const [date, setDate] = useState(holidayViewing.date)
  const [notes, setNotes] = useState(holidayViewing.notes)
  const [countries, setCountries] = useState(holidayViewing.countries)
  const [showDateModal, setShowDateModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState()

  const changeDate = (date) => {
    setShowDateModal(false)
    setDate(date.toISOString())
    console.log('change date', date.toISOString())
  }

  const changeCountry = (country, bool) => {
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

  const completeChanges = () => {
    setEditing(false)
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TextInput
          style={{ fontWeight: 'bold', fontSize: 20, backgroundColor: 'white', width: '90%' }}
          value={title}
          mode='flat'
          underlineColor='white'
          activeUnderlineColor='white'
          onChangeText={text => setTitle(text)}
          editable={editing}
        />
        {!editing ? <IconButton
          style={{ alignSelf: 'flex-end' }}
          icon='pencil'
          onPress={() => {setEditing(true)}}
        /> : <Button mode='contained' onPress={() => completeChanges()}>Done</Button>}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton
          icon='calendar-month'
          size={20}
          onPress={() => setShowDateModal(true)}
          disabled={!editing}
        />
        <Text>{date}</Text>
      </View>
      {showDateModal && <DateTimePicker
        style={{ flex: 1 }}
        mode='date'
        value={new Date(date)}
        onChange={(event, date) => { changeDate(date) }}
        dateFormat='day month year'
      />}
      <TextInput
        style={{ backgroundColor: 'white', height: 60 }}
        value={notes}
        placeholder='Enter Your notes here'
        mode='flat'
        underlineColor='white'
        activeUnderlineColor='white'
        onChangeText={text => setNotes(text)}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ margin: 15, fontSize: 14, fontWeight: 'bold' }}>Location</Text>
      </View>
      {countriesEnum.map((countryName, i) => (
        <View key={i} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
          <CheckBox
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

const styles = StyleSheet.create({})
