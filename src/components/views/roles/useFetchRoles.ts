import {useEffect} from 'react'
import authService from '../../../services/auth.service';
import {setRoles} from '../../../state/auth.state'
import {useDispatch} from 'react-redux';

function useFetchRoles(){
    const dispatch=useDispatch()
    useEffect(()=>{
        const response = async()=> {
            try{ 
                const res = await authService.getRoles()
                if(!res.success){
                   return alert(res.message)
                }
               return dispatch(setRoles(res.data))
            }catch(err:any){}
        }   
        response();
    },[]) 
}
export default useFetchRoles;
