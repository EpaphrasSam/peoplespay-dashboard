import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./state";

interface StateModel {
    loading : boolean,
    transactions : any[]
    selected : any,
    summary : any,
    otpResponse:string
}


const initialState : StateModel = {
    loading : true,
    transactions : [],
    selected : [],
    summary : null,
    otpResponse:''
}

const state = createSlice({
    name : 'transactions',
    initialState,
    reducers : {
          setTransactions : (state,action)=>{
              return {
                  ...state,
                  transactions : action.payload,
                  loading : false
              }
          },
          setSelected : (state,action)=>{
            return {
                ...state,
                selected : action.payload,
                loading : false
            }
          },
          hitOTP: (state,action)=>{
            return {
                ...state,
                otpResponse:action.payload,
                loading : false
            }
          },
    }
})


export const {setTransactions, setSelected, hitOTP} = state.actions;

export const transactionsSelector = (state: RootState)=> state.transactions;
export default state.reducer;