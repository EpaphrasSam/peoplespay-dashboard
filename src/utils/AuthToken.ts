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

export default {
    AuthToken,
    setAuthToken
};