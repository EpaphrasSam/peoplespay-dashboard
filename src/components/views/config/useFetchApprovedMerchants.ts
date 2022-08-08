import React from 'react'
import {setApprovedMerchants} from '../../../state/merchant.state';
import {useDispatch} from 'react-redux';
import MerchantsService from '../../../services/merchant.service'


function useFetchApprovedMerchants(){
    const dispatch = useDispatch()
    React.useEffect(()=>{  
        const loadMerchants = async()=>{
            try{
               const res =  await MerchantsService.getApprovedMerchants(); 
               if(!res.success){
                 return alert(res.message);
                }
              return dispatch(setApprovedMerchants(res.data))
            }catch(err:any){
               alert(err?.message)
            }
          }
        loadMerchants();
     },[]
  )    
}
export default useFetchApprovedMerchants;


