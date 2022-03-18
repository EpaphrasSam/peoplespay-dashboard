import { createSlice } from "@reduxjs/toolkit";
import {RootState} from './state';


interface StateModel {
    loading : boolean,
    merchants : {}[],
    categories : any[],
    selected : any
    docx : any[]
}

const initialState:StateModel={
    loading :true,
    merchants:[],
    categories:[],
    selected :[],
    docx :[]
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
                    docx : action.payload
                }
            }
        }
    }
)

export const merchantsSelector=(state:RootState)=>state.merchants;
export const {setMerchants , setCategories, setSelected, setDocuments}=state.actions;
export default state.reducer;