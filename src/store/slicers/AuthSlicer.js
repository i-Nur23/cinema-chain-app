import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token : '',
  nickname : '',
  role : '',
  branchOfficeId : null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    authorize : (state, action) => {
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
      state.role = action.payload.role;
      state.branchOfficeId = action.payload.branchOfficeId;
    },
    unauthorize : (state, action) => {
      state.token = '';
      state.nickname = '';
      state.role = '';
      state.branchOfficeId = null;
    }
  }
})

export const { authorize, unauthorize } = authSlice.actions;

export default authSlice.reducer;