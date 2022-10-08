import { createSlice } from '@reduxjs/toolkit'

const holidaySlice = createSlice({
  name: 'holidays',
  initialState: {
    data: [],
    editing: false,
    viewing: false
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
    }
  }
})

export const { setHolidays, setEditing, setViewing } = holidaySlice.actions
export default holidaySlice.reducer
