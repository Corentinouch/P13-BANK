import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'editMode',
  initialState: false,
  reducers: {
    toggleEditMode: (state) => !state,
    setEditMode: (state, action) => action.payload,
  },
});

export const { toggleEditMode, setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
