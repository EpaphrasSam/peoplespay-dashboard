import { createSlice } from "@reduxjs/toolkit";
import {RootState} from './state'

interface StateModel {
    loading : boolean,
    summaryReport: any;
    transactions: any[];
    issuers: any[];
    agents: any[];
    referals: any[];
    selected: any;
    wallets: any[];
}

const initialState:StateModel={
    loading : true,
    summaryReport: null,
    transactions: [],
    issuers: [],
    agents: [],
    referals: [],
    selected: null,
    wallets: [],
}


const state=createSlice(
    {
        name:'report',
        initialState,
        reducers:{
            setUserTransactions: (state,action)=>{
              return  {
                  ...state,
                    transactions: action.payload,
                    loading : false
                }
            },
            setWalletAccounts: (state,action)=>{
                return {
                    ...state,
                    wallets : action.payload,
                    loading : false
                }
            },
            setReferals : (state,action)=>{
                return {
                    ...state,
                    referals : action.payload,
                    loading : false
                }
            },
            setAgents : (state,action)=>{
                return {
                    ...state,
                    agents : action.payload,
                    loading : false
                } 
            },
        }
    }
)

export const {setUserTransactions,
             setWalletAccounts, 
             setReferals,
             setAgents
            } = state.actions;
export const reportSelector = (state : RootState) => state.report;
export default state.reducer;