import { createSlice} from "@reduxjs/toolkit";
import { User } from "../models/auth.model";
import {RootState} from './state'

interface StateModel {
    loading:boolean,
    user:User|any,
    isAuthenticated:boolean,
    admins : Array<any>
    selectedAdmin:any
    roles:Array<any>
}

const isNull = localStorage.getItem('token') === null
const isEmptyString = localStorage.getItem('token') === ''
const isUndefined = localStorage.getItem('token') === undefined;

const initialState:StateModel={
    loading:true,
    user:null,
    admins : [],
    selectedAdmin:null,
    isAuthenticated :  (isNull || isEmptyString || isUndefined) ? false : true ,
    roles:[]
}


const state=createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            setAuth:(state,action)=>{  
              state.user=action.payload;
            },
            setAdmins: (state,action)=> {
                return{
                    ...state,
                    admins:action.payload,
                    loading:false
                }
                
            },
            setSelectedAdmin: (state,action)=> {
                return{
                    ...state,
                    selectedAdmin:action.payload,
                    loading:false
                }
                
            },
            setRoles: (state,action)=> {
                return{
                    ...state,
                    roles:action.payload,
                    loading:false
                }
            }
        }}         
)


export const {setAuth, setAdmins, setSelectedAdmin,setRoles}=state.actions;
export const authSelector = (state : RootState) => state.auth;
export default state.reducer;