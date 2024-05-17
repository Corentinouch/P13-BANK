import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // Importez votre reducer

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
