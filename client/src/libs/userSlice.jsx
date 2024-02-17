import { createSlice, configureStore } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    usersdata : null ,
  },
  reducers: {
    setUserData : (state , actions)  => {
        state.user = actions.payload ;
    },
  }
})

export const { setUserData} = user.actions

export default user.reducer