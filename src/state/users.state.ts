import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    users : {}[]
}

const initialState:StateModel = {
    loading : true,
    users : []
}

const state=createSlice(
    {
        name:'users',
        initialState,
        reducers:{
            setUsers:(state,action)=>{
              return  {
                  ...state,
                    users: action.payload,
                    loading: false
                }
            }, 
        }
    }
)
export const {setUsers} = state.actions
export const usersSelector = (state: RootState) => state.users;
export default state.reducer;   