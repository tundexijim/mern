import axios from "axios";
import { Dispatch } from "redux";
import { noteCreateFail, noteCreateRequest, noteCreateSuccess, noteDeleteFail, noteDeleteRequest, noteDeleteSuccess, noteUpdateFail, noteUpdateRequest, noteUpdateSuccess, notesListFail, notesListRequest, notesListSuccess } from "../reducers/noteSlice";
import { RootState } from "../store";

//Get Notes

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

  //Create Note
  export const createNoteAction = (title: string, content: string, category: string) => async (
    dispatch: Dispatch, getState: ()=> RootState ) => {
    try {
      dispatch(noteCreateRequest());
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );
  
      dispatch(noteCreateSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(noteCreateFail(message));
    }
  };

  //Update Note

  export const updateNoteAction = (id: string|undefined, title: string, content: string, category: string) => async (
    dispatch: Dispatch,
    getState: ()=> RootState
  ) => {
    try {
      dispatch(noteUpdateRequest());
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );
  
      dispatch(noteUpdateSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(noteUpdateFail(message));
    }
  };

  export const deleteNoteAction = (id: string|undefined) => async (dispatch: Dispatch, getState: ()=>RootState) => {
    try {
      dispatch(noteDeleteRequest());
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/notes/${id}`, config);
  
      dispatch(noteDeleteSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(noteDeleteFail(message));
    }
  };
  