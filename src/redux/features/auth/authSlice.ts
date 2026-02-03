import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    userProfile: any | null;
}

const initialState: AuthState = {
    isLoggedIn: false,
    userProfile: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            state.userProfile = action.payload;
            state.isLoggedIn = true;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        logout: (state) => {
            state.userProfile = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setProfile, setIsLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
