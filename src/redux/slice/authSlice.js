import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// api call for logging in
export const loginUser = createAsyncThunk(
  "login/login-user",
  async ({ email, password }) => {
    const response = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", response.data.encodedToken);
    return response.data.encodedToken;
  }
);
// api call for creating user
export const createUser = createAsyncThunk(
  "signup/create-user",
  async ({ email, password, firstName, lastName }) => {
    const response = await axios.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });
    localStorage.setItem("token", response.data.encodedToken);
    return response.data.encodedToken;
  }
);

const token = localStorage.getItem("token");
const encodedToken = token ? token : null;
const isUserLoggedIn = token ? true : false;
const initialState = {
  isUserLoggedIn,
  encodedToken,
  status: "idle",
  error: null,
};
const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    setAuthToDefault: () => {
      return {
        isUserLoggedIn: false,
        encodedToken: "",
        status: "idle",
        error: null,
      };
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "finished";
      state.isUserLoggedIn = true;
      state.encodedToken = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [createUser.pending]: (state) => {
      state.status = "loading";
    },
    [createUser.fulfilled]: (state, action) => {
      state.status = "finished";
      state.isUserLoggedIn = true;
      state.encodedToken = action.payload;
    },
    [createUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
export const { setIsLoggedIn, setAuthToDefault } = authSlice.actions;
export const selectAuthInfo = (store) => store.auth;
export default authSlice.reducer;
