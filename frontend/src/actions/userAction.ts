import axios from "axios";
import { logOut, loginError, loginRequest, loginSuccess, signupFail, signupRequest, signupSuccess } from "../reducers/userSlice";
import { user } from "../types/type";
import { Dispatch } from "redux";

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(loginRequest());
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data }: {data: user[]} = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
  
      dispatch(loginSuccess(data));
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch(loginError(error.response && error.response.data.message
        ? error.response.data.message
        : error.message)
        );
    }
  };

  export const logout = () => async (dispatch: Dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(logOut());
  };

  export const Signup = (name: string, email: string, password: string, pic: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(signupRequest());
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data }: {data: user[]}= await axios.post(
        "/api/users",
        { name, pic, email, password },
        config
      );
  
      dispatch(signupSuccess(data));
  
      dispatch(loginSuccess(data));
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch(signupFail( error.response && error.response.data.message
        ? error.response.data.message
        : error.message));
    }
  };