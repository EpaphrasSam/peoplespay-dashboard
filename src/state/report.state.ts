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
    paidTransactions : any[];
    failedTransactions:any[];
    walletTransactions:any[];
    customerName:string
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
    paidTransactions :[],
    failedTransactions:[],
    walletTransactions:[],
    customerName:""
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
            setPaidTransactions: (state,action)=>{
                return{
                    ...state,
                    paidTransactions : action.payload,
                    loading: false
                }
            },
            setFailedTransactions: (state,action)=>{
                return{
                    ...state,
                    failedTransactions : action.payload,
                    loading: false
                }
            },
            setWalletTransactions: (state,action)=>{
                return{
                    ...state,
                    walletTransactions : action.payload,
                    loading:false
                }
            },
            setCustomerName: (state,action)=>{
                return{
                    ...state,
                    customerName : action.payload,
                    loading:false
                }
            }
        }
    }
)

export const {setUserTransactions,
             setWalletAccounts, 
             setReferals,
             setAgents,
             setPaidTransactions,
             setFailedTransactions,
             setWalletTransactions,
             setCustomerName
            } = state.actions;
export const reportSelector = (state : RootState) => state.report;
export default state.reducer;