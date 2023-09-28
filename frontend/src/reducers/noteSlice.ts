import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    notes: [],
    error: null,
};

export const NotesListSlice = createSlice({
    name: 'ListNotes',
    initialState,
    reducers:{
        notesListRequest: (state)=> {
            state.loading = true;
        },
        notesListSuccess: (state, action) => {
            state.loading = false;
            state.notes = action.payload;
        },
        notesListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const NotesList = NotesListSlice.reducer
export const {notesListRequest, notesListSuccess, notesListFail} = NotesListSlice.actions