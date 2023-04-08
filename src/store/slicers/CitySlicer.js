import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name : 'Казань'
}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers:{
    setCity : (state, action) => {
      state.name = action.payload;
    }
  }
})

export const { setCity } = citySlice.actions;

export default citySlice.reducer;

