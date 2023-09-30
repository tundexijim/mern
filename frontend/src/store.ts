import { configureStore, applyMiddleware} from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice';
import { RegisterReducer } from './reducers/userSlice';
import { NoteCreateReducer, NoteDeleteReducer, NotesListReducer, NoteUpdateReducer } from './reducers/noteSlice';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")??"null")
  : null;

  // const InitialState= {
  //   userLogin: { userInfo: userInfoFromStorage },
  // }; 

const preloadedState: any = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};
const store = configureStore({
   
    reducer:{
      userLogin: userSlice,
      userSignup: RegisterReducer,
      NoteLists: NotesListReducer,
      NoteCreate: NoteCreateReducer,
      UpdateNote: NoteUpdateReducer,
      DeleteNote: NoteDeleteReducer,
     },
    preloadedState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;