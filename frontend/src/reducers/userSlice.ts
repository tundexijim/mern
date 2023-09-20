import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")??"null")
  : null;

  // const InitialState= {
  //   userLogin: { userInfo: userInfoFromStorage },
  // }; 

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

  export const userLoginSlice: any = createSlice({
    name: 'login',
    initialState,
    reducers:{
        loginRequest: (state) =>{state.loading = true},
        loginSuccess: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload;
        },
        loginError: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        logOut: (state)=>{
          state.loading = false;
          state.error = null;
          state.userInfo = null;
        },    
    }
  });

  export const {loginRequest, loginSuccess, loginError, logOut} = userLoginSlice.actions;
  export default userLoginSlice.reducer;