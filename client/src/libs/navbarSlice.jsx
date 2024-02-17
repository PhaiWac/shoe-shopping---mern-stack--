import { createSlice, configureStore } from '@reduxjs/toolkit'

const navbar = createSlice({
  name: 'navbar',
  initialState: {
    using : '/' ,
    userdata: null, 
  },
  reducers: {
    setUsing : (state , actions)  => {
        state.using = actions.payload ;
    },
    setUserData : (state , actions) => {
        state.userdata = actions.payload;
    }
  }
})

export const { setUsing , setUserData } = navbar.actions

export default navbar.reducer