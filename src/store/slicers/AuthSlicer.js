import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token : '',
  nickname : '',
  role : ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    authorize : (state, action) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
      state.role = action.payload.role;
    },
    unauthorize : (state, action) => {
      state.token = '';
      state.nickname = '';
      state.role = '';
    }
  }
})

export const { authorize, unauthorize } = authSlice.actions;

export default authSlice.reducer;