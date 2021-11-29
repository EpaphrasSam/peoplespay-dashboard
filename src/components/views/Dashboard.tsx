import React,{useEffect, useState} from 'react';
import TransactionService from '../../services/transactions.service'
import MerchantService from '../../services/merchant.service';


import HeaderCards from '../cards/HeaderCards'
import BodyCard from '../cards/BodyCard';
import state from '../../state/state';

type StateData = {} | any

function Dashboard() {

  const [data, setData] = useState<StateData>({
    transactionsNumb : 0,
    totalTransaction : 0,
    failedCount : 0,
    failedAmount : 0,
    paidCount : 0,
    paidAmount : 0,
    merchantsNumb : 0,
    paidCharges : 0,
  })

  useEffect(()=>{
    async function response(){
     try{
      const merchantResponse = await MerchantService.summary();
      const res = await TransactionService.summary()
      
      
      if(!res.success ){
         throw Error(res.message)
      } 

      
      console.log(merchantResponse.data.count)

      setData({
        transactionsNumb : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].amount,
        totalTransaction : res.data && res.data.all && res.data.all.length>0 && res.data.all[0].totalAmount,
        failedCount : res.data && res.data.failed && res.data.failed.length>0 && res.data.failed[0].count,
        failedAmount : res.data && res.data.failed && res.data.failed.length>0 && res.data.failed[0].amount,
        paidCount : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].count,
        paidAmount : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].amount,
        merchantsNumb : merchantResponse.data && merchantResponse.data[0].count,
        paidCharges : 0 ,
      });
     }catch(err:any){
       alert(err.message)
     }
    }
    response(); 
  },[])
    
    return (
        <>
       <HeaderCards/>
      <div className="flex flex-wrap mb-10">
        <div className="w-full lg:w-4/12 xl:w-4/12 xl:mb-0 px-4">
          <BodyCard title='NUMBER OF TRANSACTIONS' value={data.transactionsNumb} icon='fas fa-list-ol'/>
        </div>
        <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL TRANSACTION AMT(GH¢)' value={`GH¢ ${data.totalTransaction}`} icon='fas fa-coins'/>
          </div>
         <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL NUMBER OF FAILED TRANSACTIONS' value={data.failedCount} icon='fas fa-list-ol'/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL FAILED TRANSACTION AMOUNT' value={`GH¢ ${data.failedAmount}`} icon='fas fa-coins'/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL NUMBER OF PAID TRANSACTIONS' value={data.paidCount} icon='fas fa-list-ol'/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL PAID TRANSACTION AMOUNT' value={`GH¢ ${data.paidAmount}`} icon='fas fa-coins'/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL NUMBER OF MERCHANTS' value={data.merchantsNumb} icon='fas fa-list-ol'/>
          </div>
          <div className="w-full lg:w-4/12 xl:w-4/12 px-4">
          <BodyCard title='TOTAL PAID CHARGES' value='231' icon='fas fa-coins' />
          </div>
      </div>
      
  </>
      )
}

export default Dashboard;