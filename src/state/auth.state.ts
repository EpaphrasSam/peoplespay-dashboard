import { createSlice} from "@reduxjs/toolkit";
import { User } from "../models/auth.model";
import {RootState} from './state'

interface StateModel {
    user:User|any,
    isAuthenticated : boolean,
    admins : Array<any>
}

const isNull = localStorage.getItem('token') === null
const isEmptyString = localStorage.getItem('token') === ''
const isUndefined = localStorage.getItem('token') === undefined;

const initialState:StateModel={
    user:null,
    admins : [],
    isAuthenticated :  (isNull || isEmptyString || isUndefined) ? false : true 
}


const state=createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            setAuth:(state,action)=>{
               // const {user}=action.payload;
              return  {
                  ...state,
                    user:action.payload
                }
            },
            setAdmins: (state,action)=> {
                state.admins=action.payload;
            }
        }}         
)


export const {setAuth, setAdmins}=state.actions;
export const authSelector = (state : RootState) => state.auth;
export default state.reducer;