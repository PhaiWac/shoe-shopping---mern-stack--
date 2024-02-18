import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './service/useapi'
import { datatableApi } from './service/datatable'

import navbarSlice from './libs/navbarSlice'
import userSlice from './libs/userSlice'


const store = configureStore({
  reducer: {
    navbar: navbarSlice ,
    user: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [datatableApi.reducerPath]: datatableApi.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      datatableApi.middleware,
      ),
})


setupListeners(store.dispatch)

export default store