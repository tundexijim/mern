import { createSlice } from "@reduxjs/toolkit";

//Get Notes

const NoteListInitialState = {
    loading: false,
    notes: [],
    error: null,
};

const NotesListSlice = createSlice({
    name: 'ListNotes',
    initialState: NoteListInitialState,
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

export const NotesListReducer = NotesListSlice.reducer
export const {notesListRequest, notesListSuccess, notesListFail} = NotesListSlice.actions

//Create Note

const NoteCreateInitialState = {
    loading: false,
    success: false,
    error: null,
};

 const NoteCreateSlice = createSlice({
    name: "Createnote",
    initialState: NoteCreateInitialState,
    reducers:{
        noteCreateRequest: (state) =>{
            state.loading = true;
        },
        noteCreateSuccess: (state) =>{
            state.loading = false;
            state.success = true;
        },
        noteCreateFail: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const NoteCreateReducer = NoteCreateSlice.reducer
export const {noteCreateRequest, noteCreateSuccess, noteCreateFail} = NoteCreateSlice.actions

//Update Note

const NoteUpdateInitialState = {
    loading: false,
    success: false,
    error: null,
};

 const NoteUpdateSlice = createSlice({
    name: "Updatenote",
    initialState: NoteUpdateInitialState,
    reducers:{
        noteUpdateRequest: (state) =>{
            state.loading = true;
        },
        noteUpdateSuccess: (state) =>{
            state.loading = false;
            state.success = true;
        },
        noteUpdateFail: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const NoteUpdateReducer = NoteUpdateSlice.reducer
export const {noteUpdateRequest, noteUpdateSuccess, noteUpdateFail} = NoteUpdateSlice.actions

// Delete Note

const NoteDeleteInitialState = {
    loading: false,
    success: false,
    error: null,
};

 const NoteDeleteSlice = createSlice({
    name: "Deletenote",
    initialState: NoteDeleteInitialState,
    reducers:{
        noteDeleteRequest: (state) =>{
            state.loading = true;
        },
        noteDeleteSuccess: (state) =>{
            state.loading = false;
            state.success = true;
        },
        noteDeleteFail: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const NoteDeleteReducer = NoteDeleteSlice.reducer
export const {noteDeleteRequest, noteDeleteSuccess, noteDeleteFail} = NoteDeleteSlice.actions
