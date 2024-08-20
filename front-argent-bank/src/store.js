import { configureStore } from '@reduxjs/toolkit';
import editModeReducer from './reducers/editModeSlice';
import userInfoReducer from './reducers/userInfoSlice';
import editedUserInfoReducer from './reducers/editedUserInfoSlice';
import loginFormReducer from './reducers/loginFormSlice';
const store = configureStore({
  reducer: {
    editMode: editModeReducer,
    userInfo: userInfoReducer,
    editedUserInfo: editedUserInfoReducer,
    loginForm: loginFormReducer,
  },
});

export default store;
