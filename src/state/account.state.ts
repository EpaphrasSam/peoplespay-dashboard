import { createSlice } from "@reduxjs/toolkit";
//import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    issuers : {}[]
    settlementHistory : any
}

const initialState:StateModel = {
    loading : true,
    issuers : [],
    settlementHistory : []
}

const state=createSlice(
    {
        name:'accounts',
        initialState,
        reducers:{
            setIssuers:(state,action)=>{
              return  {
                  ...state,
                    issuers: action.payload,
                    loading: false
                }
            }, 
            setSettlementHistory:(state,action)=>{
                return  {
                    ...state,
                    settlementHistory : action.payload
                  }
              }
        }
    }
)
export const {setIssuers, setSettlementHistory} = state.actions
export const accountsSelector = (state: RootState) => state.accounts;
export default state.reducer;   