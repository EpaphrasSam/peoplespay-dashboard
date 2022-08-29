import {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {setRecords} from '../../../state/elevy.state' 
import elevyService from '../../../services/elevy.services';

function useFetchElevy(){
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const response = async()=> {
            try{ 
                const res = await elevyService.getElevyTransactions()
                if(!res.success){
                   return alert(res.message)
                }
                return dispatch(setRecords(res.data))
            }catch(err:any){}
        }
        response();
    },[])
};
export default useFetchElevy;
