import React from 'react';
import { useDispatch} from 'react-redux';
import {setMerchants } from '../../../state/merchant.state';
import MerchantsService from '../../../services/merchant.service'

function useFetchMerchants(){
    const dispatch = useDispatch()
    React.useEffect(()=>{ 
        const response = async()=>{
            try{
                const res = await MerchantsService.getMerchants();
                if(!res.success){
                    throw alert( res.message )
                }
                const merchants = res.data.filter((t:any) => t.type ==="PPAY")
                return dispatch(setMerchants(merchants))
            }catch(err:any){
              alert(err.message)
            }
        }
        response();
        },
     [])   
}
export default useFetchMerchants;