import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  rememberMe: false,
};

const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setLoginForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearLoginForm: () => initialState,
  },
});

export const { setLoginForm, clearLoginForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
