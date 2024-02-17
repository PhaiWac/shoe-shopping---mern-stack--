import { createSlice, configureStore } from '@reduxjs/toolkit'

const datatable = createSlice({
  name: 'datatable',
  initialState: {
    data : null 
  },
  reducers: {
    setDataTable : (state , actions)  => {
        state.data = actions.payload ;
    },

  }
})

export const { setDataTable  } = datatable.actions

export default datatable.reducer