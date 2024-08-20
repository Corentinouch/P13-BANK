import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
};

const editedUserInfoSlice = createSlice({
  name: 'editedUserInfo',
  initialState,
  reducers: {
    setEditedUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearEditedUserInfo: () => initialState,
  },
});

export const { setEditedUserInfo, clearEditedUserInfo } = editedUserInfoSlice.actions;
export default editedUserInfoSlice.reducer;
