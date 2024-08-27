import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "status",
  initialState: {
    uid: null,
    admin: null,
    accessToken: null,
    login: false,
  },
  reducers: {
    setUID: (state, action) => {
      state.uid = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLogin: (state) => {
      state.login = true;
    },
    setLogout: (state) => {
      state.admin = null;
      state.accessToken = null;
      state.uid = null;
      state.login = false;
    },
  },
});

export const { setUID, setAdmin, setAccessToken, setLogin, setLogout } =
  userSlice.actions;

export const selectAdmin = (state) => state.user.admin;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectUid = (state) => state.user.uid;
export const selectIsLoggedIn = (state) => state.user.login;

export default userSlice.reducer;
