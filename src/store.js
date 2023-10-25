import { configureStore } from '@reduxjs/toolkit'
import roadsReducer from './slices/roadsSlice'

export const store = configureStore({
  reducer: {
    roads: roadsReducer,
  },
})