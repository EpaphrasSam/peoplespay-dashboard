import { LoginPayload } from "../models/auth.model";
import AuthToken from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";

const login=(user:LoginPayload)=>fetch(
    `${BASE_URL}/admin/login`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(user)
    }
).then(res=>res.json())

const addAdmin = (body:any) => fetch(
    `${BASE_URL}/admin/add`,
    {
        method : 'POST',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(body)
    }
).then(res=>res.json())

const getAllAdmins = () => fetch(
    `${BASE_URL}/admin/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    }
).then(res=> res.json())

const update = (data:any) => fetch(
    `${BASE_URL}/admin/update`,
    {
        method : 'PUT',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(data)
    }
).then(res=>res.json())

const resetPassword = (adminId:string) => fetch(
    `${BASE_URL}/admin/reset/${adminId}`,
    {
        method : 'PUT',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    }
).then(res=>res.json())

const changePassword=(data:any)=>fetch(
    `${BASE_URL}/admin/change/password`,
    {
        method : 'PUT',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(data)
    }
).then(res=>res.json())

const addRole=(data:any)=>fetch(
    `${BASE_URL}/roles/add`,
    {
        method : 'POST',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(data)
    }
).then(res=>res.json())

const getRoles=()=>fetch(
    `${BASE_URL}/roles/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    }
).then(res=>res.json())

const updateRole=(data:any)=>fetch(
    `${BASE_URL}/roles/update`,
    {
        method : 'PUT',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : AuthToken.AuthToken()
    },
    body: JSON.stringify(data)
    }
).then(res=>res.json())


const authService = {
    login,
    addAdmin,
    getAllAdmins,
    update,
    resetPassword,
    changePassword,
    addRole,
    getRoles,
    updateRole
}

export default authService;
