import { createSlice } from "@reduxjs/toolkit";
//import { User } from "../models/user.model";
import  { RootState } from "./state"

interface StateModel{
    loading : boolean,
    records : any
    transactions:any[]
}

const initialState:StateModel = {
    loading : true,
    records : [],
    transactions:[]
}

const state=createSlice(
    {
        name:'elevy',
        initialState,
        reducers:{
            setRecords:(state,action)=>{
                return {
                    ...state,
                    records:action.payload,
                    loading:false
                }
              },
            setTransactions:(state,action)=>{
                return {
                    ...state,
                    transactions:action.payload,
                    loading:false
                }
            }
        }
    }
)
export const {setRecords, setTransactions} = state.actions
export const elevySelector = (state: RootState) => state.elevy;
export default state.reducer;   