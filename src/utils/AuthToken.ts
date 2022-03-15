import jwt_decode from 'jwt-decode';



const AuthToken = () =>{

    try{
        const token:any = localStorage.getItem('token')
        const decoded:any = jwt_decode(String(token))
        const {exp} = decoded;
        const isExpired:boolean = exp * 1000 < Date.now();
        const isUndefined = localStorage.getItem('token') === undefined;
        
        if(!token || isUndefined){
            window.location.href='/#/login';
            return '';
        }else if(isExpired){
            window.location.href='/#/login'    
           return window.localStorage.clear() 
        }else if(isUndefined){
             window.location.href='/#/login'
        }
            return token?.toString();
        }catch(err){
       return window.location.href='/#/login'
    }
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