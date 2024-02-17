// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const datatableApi = createApi({
  reducerPath: 'datatableApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getDataProduct: builder.query({
      query: () => `/product`,
    }),
  }),
})


export const { useGetDataProductQuery } = datatableApi