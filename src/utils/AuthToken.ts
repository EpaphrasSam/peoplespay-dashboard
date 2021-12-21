import { setTimeout } from "timers";

const AuthToken = () =>{
const token = localStorage.getItem('token')
if(!token){
    return ''
}
    return token.toString();
}

const setAuthToken = (token:any)=>{
    if(token){
        return localStorage.setItem('token', `Bearer${token}`)
    }
    return ;
} 

const autoTokenTimer = setInterval(() => {window.localStorage.clear(); window.location.href = '/login'}, 1640083044);


const Utils = {
    AuthToken,
    setAuthToken,
    autoTokenTimer
};

export default Utils;