import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./state";

interface StateModel {
    loading : boolean,
    transactions : any[]
    selected : any,
    summary : any,
}


const initialState : StateModel = {
    loading : true,
    transactions : [],
    selected : [],
    summary : null
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
          }
    }
})

export const {setTransactions, setSelected} = state.actions;

export const transactionsSelector = (state: RootState)=> state.transactions;
export default state.reducer;