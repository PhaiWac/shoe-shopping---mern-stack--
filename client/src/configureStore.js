import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './service/navbar'
import { datatableApi } from './service/datatable'

import navbarSlice from './libs/navbarSlice'


const store = configureStore({
  reducer: {
    navbar: navbarSlice ,
    [datatableApi.reducerPath]: datatableApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,datatableApi.middleware),
})


setupListeners(store.dispatch)

export default store