import { createSlice } from "@reduxjs/toolkit";
import {RootState} from './state';

interface StateModel {
    loading : boolean,
    merchants : any[],
    approvedMerchants:any[],
    merchantName:string,
    categories : any[],
    selected : any
    docx : any[]
    banks:any[],
    apps:any[],
}

const initialState:StateModel={
    loading :true,
    merchants:[],
    approvedMerchants:[],
    categories:[],
    selected :[],
    docx :[],
    banks:[],
    apps:[],
    merchantName:'',
}


const state = createSlice(
    {
        name:'merchants',
        initialState,
        reducers:{
            setMerchants:(state,action)=>{
             return {
                    ...state,
                    merchants : action.payload,
                    loading: false
                }
            }, 
            setApprovedMerchants:(state,action)=>{
                return {
                       ...state,
                       approvedMerchants : action.payload,
                       loading: false
                   }
               }, 
            setCategories : (state,action)=> {
                return {
                    ...state,
                    categories : action.payload,
                    loading: false
                }
            },
            setSelected : (state,action)=>{
                return {
                    ...state,
                     selected : action.payload,
                    loading: false
                } 
            },
            setDocuments : (state,action)=>{
                return{
                    ...state,
                    docx : action.payload,
                    loading:false
                }
            },
            setBanks:(state,action)=>{
                return{
                    ...state,
                    banks : action.payload,
                    loading:false
                }
            },
            setApps:(state,action)=>{
                return{
                    ...state,
                    apps : action.payload,
                    loading:false
                }
            },
            setMerchantName:(state,action)=>{
                state.merchantName=action.payload
            },
        }
    }
)

export const merchantsSelector=(state:RootState)=>state.merchants;
export const {setMerchantName,setMerchants ,setApprovedMerchants, setCategories, setSelected, setDocuments,setBanks,setApps}=state.actions;
export default state.reducer;