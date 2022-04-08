import { createSlice } from "@reduxjs/toolkit";
//import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    issuers : {}[]
    settlementHistory : any
    pendingSettlements : any
}

const initialState:StateModel = {
    loading : true,
    issuers : [],
    settlementHistory : [],
    pendingSettlements : []
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
                state.settlementHistory = action.payload
              },
            setPendingSettlements: (state,action)=>{
                state.pendingSettlements = action.payload
            }
        }
    }
)
export const {setIssuers, setSettlementHistory, setPendingSettlements} = state.actions
export const accountsSelector = (state: RootState) => state.accounts;
export default state.reducer;   