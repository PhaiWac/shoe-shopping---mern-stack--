import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authUserApi , getUserApi } from './service/useapi'
import { datatableApi } from './service/datatable'

import navbarSlice from './libs/navbarSlice'
import userSlice from './libs/userSlice'


const store = configureStore({
  reducer: {
    navbar: navbarSlice ,
    user: userSlice,
    [datatableApi.reducerPath]: datatableApi.reducer,
    [authUserApi.reducerPath]: authUserApi.reducer,
    [getUserApi.reducerPath]: getUserApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getUserApi.middleware,authUserApi.middleware,datatableApi.middleware),
})


setupListeners(store.dispatch)

export default store