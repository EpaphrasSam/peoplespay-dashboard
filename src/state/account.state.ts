import { createSlice } from "@reduxjs/toolkit";
//import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    issuers : {}[]
}

const initialState:StateModel = {
    loading : true,
    issuers : []
}

const state=createSlice(
    {
        name:'issuers',
        initialState,
        reducers:{
            setIssuers:(state,action)=>{
              return  {
                  ...state,
                    issuers: action.payload,
                    loading: false
                }
            }, 
        }
    }
)
export const {setIssuers} = state.actions
export const issuersSelector = (state: RootState) => state.issuers;
export default state.reducer;   