import { configureStore } from '@reduxjs/toolkit'
import holidays from './reducers/holidays'

export const store = configureStore({
  reducer: {
    holidays: holidays
  }
})
