import {useEffect} from 'react'
import authService from '../../../services/auth.service';
import {setRoles} from '../../../state/auth.state'
import {useDispatch} from 'react-redux';

function useFetchActiveRoles(){
    const dispatch=useDispatch()
    useEffect(()=>{
        const response = async()=> {
            try{ 
                const res = await authService.getRoles()
                if(!res.success){
                   return alert(res.message)
                }
                let activeRoles=res.data.filter((r:any)=>r.active)
               return dispatch(setRoles(activeRoles))
            }catch(err:any){}
        }   
        response();
    },[]) 
}
export default useFetchActiveRoles;
