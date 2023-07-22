import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../components/Login/AuthSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
