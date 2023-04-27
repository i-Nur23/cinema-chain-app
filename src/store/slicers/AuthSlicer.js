import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token : '',
  nickname : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    authorize : (state, action) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
    },
    unauthorize : (state, action) => {
      state.token = '';
      state.nickname = '';
    }
  }
})

export const { authorize, unauthorize } = authSlice.actions;

export default authSlice.reducer;