import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  city : 'Казань'
}

export const citySlice = createSlice({
  name: 'cityChoice',
  initialState,
  reducers:{
    setCity : (state, action) => {
      state.city = action.payload;
    }
  }
})

export const { setCity } = citySlice.actions;

export default citySlice.reducer;

