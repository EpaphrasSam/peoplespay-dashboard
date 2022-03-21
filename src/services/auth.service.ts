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

const addAdmin = (admin:any) => fetch(
    `${BASE_URL}/admin/add/`,
    {
        method : 'POST',
        headers : {
            'Content-type' : 'Application/json',
            'Authroization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(admin)
    }
)

const getAdminAccess = () => fetch(
    `${BASE_URL}/admin/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
    },
    }
).then(res=> res.json())

const update = (data:any) => fetch(
    `${BASE_URL}/admin/add/`,
    {
        method : 'PUT',
        headers : {
            'Content-type' : 'Application/json',
            'Authroization' : AuthToken.AuthToken()
    },
    body : JSON.stringify(data)
    }
)



export default {
    login,
    addAdmin,
    getAdminAccess,
    update
}
