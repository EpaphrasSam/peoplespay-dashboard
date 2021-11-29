import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/auth.model";
import {RootState} from './state'

interface StateModel {
    user:User|any,
    isAuthenticated : boolean,
}

const initialState:StateModel={
    user:null,
    isAuthenticated : localStorage.getItem('token')!== null ? true : false
}


const state=createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            setAuth:(state,action:PayloadAction<{user:User}>)=>{
                const {user}=action.payload;
              return  {
                  ...state,
                    user:user
                }
            }, 
        }
    }
)

export const {setAuth}=state.actions;
export const authSelector = (state : RootState) => state.auth;
export default state.reducer;