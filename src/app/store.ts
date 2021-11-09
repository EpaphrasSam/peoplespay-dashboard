import { configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {authReducer} from '../features/auth/authSlice'

//import { ThunkAction } from 'redux-thunk';
//import logger from 'redux-logger';

//import rootReducer, { RootState} from './rootReducer';

const reducer = {
    auth : authReducer
} 

const store = configureStore({
    reducer: reducer,
    devTools : true
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

//export const useAppDispatch = () => useDispatch();
//export type AppThunk = ThunkAction<void,RootState,unknown,Action>

export default store;