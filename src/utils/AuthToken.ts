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

const autoLogoutTimer = (timer:any) => {
  setTimeout(()=>{
    window.localStorage.clear();
    window.location.href = '/'
  },timer)
}


const Utils = {
    AuthToken,
    setAuthToken
};

export default Utils;