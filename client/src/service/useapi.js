import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    authUser: builder.query({
      query: () => `/user`,
    }),
    getUser: builder.query({
      query: () => '/users'
    }),
    getOrder: builder.query({
      query: () => '/orders'
    }),
    getHistory: builder.query({
      query: () => '/history'
    })
  })
})

export const { useAuthUserQuery , useGetUserQuery , useGetOrderQuery , useGetHistoryQuery } = userApi ;

