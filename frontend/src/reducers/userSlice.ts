import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") ?? "null")
  : null;

// const InitialState= {
//   userLogin: { userInfo: userInfoFromStorage },
// };

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
  success: false,
};

export const userLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginError, logOut } =
  userLoginSlice.actions;
export default userLoginSlice.reducer;

const RegisterSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    signupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupRequest, signupSuccess, signupFail } =
  RegisterSlice.actions;
export const RegisterReducer = RegisterSlice.reducer;

// User Update

const userUpdateSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    userUpdateRequest: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    userUpdateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail } =
  userUpdateSlice.actions;
export const updateReducer = userUpdateSlice.reducer;
