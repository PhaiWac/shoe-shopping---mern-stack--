import { configureStore } from '@reduxjs/toolkit'
import navbarSlice from './libs/navbarSlice'

export default configureStore({
  reducer: {
    navbar: navbarSlice
  }
})