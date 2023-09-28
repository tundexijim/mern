import axios from "axios";
import { Dispatch } from "redux";
import { notesListFail, notesListRequest, notesListSuccess } from "../reducers/noteSlice";
import { RootState } from "../store";

export const listNotes = () => async (dispatch: Dispatch, getState: ()=> RootState) => {
    try {
      dispatch(notesListRequest());
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/notes`, config);
  
      dispatch(notesListSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(notesListFail(message));
    }
  };