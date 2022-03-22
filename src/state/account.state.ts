import { createSlice } from "@reduxjs/toolkit";
//import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    issuers : {}[]
    allsettlements : any
}

const initialState:StateModel = {
    loading : true,
    issuers : [],
    allsettlements : []
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
            setAllSettlements:(state,action)=>{
                return  {
                    ...state,
                    allsettlements : action.payload
                  }
              }
        }
    }
)
export const {setIssuers, setAllSettlements} = state.actions
export const accountsSelector = (state: RootState) => state.accounts;
export default state.reducer;   