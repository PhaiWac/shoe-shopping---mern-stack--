import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authUserApi = createApi({
  reducerPath: 'authUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    authUser: builder.query({
      query: () => `/user`,
    }),
  }),
})

export const getUserApi = createApi({
  reducerPath: 'getUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl : '/api/', 
  }) ,
  endpoints: (builder) => (
    {
      getUser : builder.query(
        {
          query: () => '/users'
        }
      )
    }
  )
})


export const { useAuthUserQuery } = authUserApi
export const { useGetUserQuery } = getUserApi