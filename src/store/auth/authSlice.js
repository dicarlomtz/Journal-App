import { createSlice } from "@reduxjs/toolkit";

export const authenticationStatuses = {
    checking: 'checking',
    authenticated: 'authenticated',
    notAuthenticated: 'not-authenticated'
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: authenticationStatuses.notAuthenticated, // not-authenticated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = authenticationStatuses.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload}) => {
            state.status = authenticationStatuses.notAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkCredentials: (state) => {
            state.status = authenticationStatuses.checking;
        }
    }
})

export const {login, logout, checkCredentials} = authSlice.actions