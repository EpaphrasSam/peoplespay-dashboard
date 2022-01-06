import jwt_decode from 'jwt-decode';



const AuthToken = () =>{

const token = localStorage.getItem('token')
const decoded:any = jwt_decode(String(token))
const {exp} = decoded;
const isExpired:boolean = exp * 1000 < Date.now();
const isUndefined = localStorage.getItem('token') === undefined;

if(!token){
    return '';
}else if(isExpired){    
     window.localStorage.clear()
     window.location.href='/#/login'
}else if(isUndefined){
     window.location.href='/#/login'
}
    return token.toString();
}

const setAuthToken = (token:any)=>{
    if(token){
        return localStorage.setItem('token', `Bearer${token}`)
    }
    return ;
} 



const Utils = {
    AuthToken,
    setAuthToken,
};

export default Utils;