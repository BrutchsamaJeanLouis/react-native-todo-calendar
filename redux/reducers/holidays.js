import { createSlice } from "@reduxjs/toolkit"

const holidaySlice = createSlice({
  name: "holidays",
  initialState: {
    data: {}
  },
  reducers: {
    setHolidays: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setHolidays } = holidaySlice.actions
export default holidaySlice.reducer