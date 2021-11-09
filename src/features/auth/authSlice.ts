import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {adminLogin} from '../services/admin.service';

export interface CurrentUser{
    user: any,
    token: string,
}
export interface AuthState {
    isAuthenticated : boolean,
    isLoading : boolean,
    token : any,
    user : any
}

export const initialState: AuthState = {
    isAuthenticated : false,
    isLoading : false,
    token : localStorage.getItem('token'),
    user : null
}

export const adminSignin = createAsyncThunk(
    'admin/login',
 async(data:{email:string, password:string})=>{
    const res = await adminLogin(data);
    return res.data;
})

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        [adminSignin.fulfilled.toString()] : (state, action)=>{
            const {token} = action.payload
             state.user =   action.payload.data.name
             state.isLoading  = false
             state.isAuthenticated = true
             state.token = token
        }
    }
})

const {reducer} = authSlice;
export default reducer;
