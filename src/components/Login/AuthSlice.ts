import {createSlice } from '@reduxjs/toolkit';



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: '',
    },
    reducers: {
        login: (state: any) => {
            state.value = document.cookie.split("=")[1];
        },
        logout: (state: any) => {
            state.value = ""
        },
    }
});

export const selectStatus = (state: any) => state.auth.value;

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;