import { createSlice } from '@reduxjs/toolkit'
import { compareHolidays } from '../../utils/prepare-holidays'

const holidaySlice = createSlice({
  name: 'holidays',
  initialState: {
    data: [],
    editing: false,
    viewing: false,
    viewingIndex: null,
    holidayViewing: {}
  },
  reducers: {
    setHolidays: (state, action) => {
      state.data = action.payload
    },
    setEditing: (state, action) => {
      state.editing = action.payload
    },
    setViewing: (state, action) => {
      state.viewing = action.payload
    },
    setHolidayViewing: (state, action) => {
      state.holidayViewing = action.payload
    },
    setViewingIndex: (state, action) => {
      state.viewingIndex = action.payload
    },
    saveHoliday: (state, action) => {
      state.data[state.viewingIndex] = action.payload
      // need to resort incase the date was modified
      state.data.sort(compareHolidays)
    }
  }
})

export const {
  setHolidays,
  setEditing,
  setViewing,
  setHolidayViewing,
  setViewingIndex,
  saveHoliday
} = holidaySlice.actions

export default holidaySlice.reducer
