import { createSlice } from '@reduxjs/toolkit'
import modeConst from '../../constants/mode-const'
import { compareHolidays } from '../../utils/prepare-holidays'

const holidaySlice = createSlice({
  name: 'holidays',
  initialState: {
    data: [],
    editing: false,
    viewing: false,
    viewingIndex: null,
    holidayViewing: {},
    mode: modeConst.FETCH
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
    },
    toggleAppMode: (state) => {
      if (state.mode === modeConst.FETCH) {
        state.mode = modeConst.SAVED
      } else {
        state.mode = modeConst.FETCH
      }
    }
  }
})

export const {
  setHolidays,
  setEditing,
  setViewing,
  setHolidayViewing,
  setViewingIndex,
  saveHoliday,
  toggleAppMode
} = holidaySlice.actions

export default holidaySlice.reducer
