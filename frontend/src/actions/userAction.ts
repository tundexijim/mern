import axios from "axios";
import { logOut, loginError, loginRequest, loginSuccess } from "../reducers/userSlice";
import { user } from "../types/type";

export const login = (email: string, password: string) => async (dispatch: any) => {
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

  export const logout = () => async (dispatch: any) => {
    localStorage.removeItem("userInfo");
    dispatch(logOut());
  };