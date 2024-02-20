import { createSlice, configureStore } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';

const navbar = createSlice({
  name: 'navbar',
  initialState: {
    using: '/',
    userdata: null,
  },
  reducers: {
    setUsing: (state, actions) => {
      state.using = actions.payload;
    },
    setUserData: (state, actions) => {
      state.userdata = actions.payload;
    },
    setToast: (state, actions) => {
      const { type, message } = actions.payload;
      if (type == 'success') {
        toast.success(message)
      } else if (type == 'error') {
        toast.error(message)
      }
    }
  }
})

export const { setUsing, setUserData, setToast } = navbar.actions

export default navbar.reducer