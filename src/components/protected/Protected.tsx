import React from 'react'
import {useNavigate} from 'react-router-dom';
import {setAuth } from "../../state/auth.state";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../state/auth.state";
interface ProtectedProps{
    children:any
}
function ProtectedRoute({children}:ProtectedProps){
    let navigate = useNavigate();
    const {user} = useSelector(authSelector);
    const dispatch=useDispatch();
    React.useEffect(()=>{
        loadProfile()
    },[]) 
    React.useEffect(()=>{
      if(user&&user===null){
        return navigate('/login')
       }
     
      if(user&&user?.isPasswordChanged===true){
          return navigate('/change-password')
       }
    },[])
    const loadProfile=()=>{
        const session=sessionStorage.getItem('PP-USER');
        if(typeof session==='string'){
            dispatch(
                setAuth(
                    JSON.parse(session)
                )
            )
        }
    }
  
    return children;
}
export default ProtectedRoute;