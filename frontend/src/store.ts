import { configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit'
import userSlice from './reducers/userSlice';



const store = configureStore({
    reducer:{
      userLogin: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;