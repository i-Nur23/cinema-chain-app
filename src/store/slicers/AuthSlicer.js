import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token : '',
  nickname : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setToken : (state, action) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
    },
    deleteToken : (state, action) => {
      state.token = '';
      state.nickname = '';
    }
  }
})

export const { setToken, deleteToken } = authSlice.actions;

export default authSlice.reducer;