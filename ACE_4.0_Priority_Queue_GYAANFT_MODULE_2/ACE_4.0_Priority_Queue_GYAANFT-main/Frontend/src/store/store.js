import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from './navigationSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer
  }
})