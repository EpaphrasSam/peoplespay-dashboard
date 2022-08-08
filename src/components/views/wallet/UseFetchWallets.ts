import React from 'react'
import {setWalletAccounts} from '../../../state/report.state'
import {useDispatch} from 'react-redux';
import ReportService from '../../../services/reports.service'

 const useFetchWallets=()=>{
    const dispatch = useDispatch() 

   React.useEffect(()=>{
    const fetchWallets = async()=>{
        try{
            const res =  await ReportService.getWallets();
            if(!res?.success){
                alert(res?.message);
               }
            const wallets = res.data
            return dispatch(setWalletAccounts(wallets))
             }catch(err:any){
            return alert(err?.message)
          }
        }
     fetchWallets()
   },[]) 
}
export default useFetchWallets;


