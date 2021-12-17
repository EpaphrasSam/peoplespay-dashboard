import {useEffect, useState} from 'react';
import TransactionService from '../../services/transactions.service'
import MerchantService from '../../services/merchant.service';
import ReportService from '../../services/reports.service'


import BodyCard from '../cards/BodyCard';


type StateData = {} | any

function Dashboard() {

  const [data, setData] = useState<StateData>({
    totalAmountPaid : 0,
    totalAmountFailed : 0,
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
    response()
    },[])

    async function response(){
      try{
      
      const startDate =  new Date((new Date()).valueOf() - 1000*60*60*24).toISOString();
      const endDate = new Date().toISOString();
      

       const merchantResponse = await MerchantService.summary();
       const res = await TransactionService.summary() 
       const resReport = await ReportService.summaryReport(startDate,endDate);
      
       if(!res.success )throw Error(res.message)
          
       if(!resReport) throw Error(resReport.message)
       

       setData({
         totalAmountPaid : resReport?.data?.paid[0].totalAmount,
         totalAmountFailed : resReport?.data?.failed[0].totalAmount,
         transactionsNumb : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].amount,
         totalTransaction : res.data && res.data.all && res.data.all.length>0 && res.data.all[0].totalAmount,
         failedCount : res.data && res.data.failed && res.data.failed.length>0 && res.data.failed[0].count,
         failedAmount : res.data && res.data.failed && res.data.failed.length>0 && res.data.failed[0].amount,
         paidCount : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].count,
         paidAmount : res.data && res.data.paid && res.data.paid.length>0 && res.data.paid[0].amount,
         merchantsNumb : merchantResponse.data && merchantResponse.data[0].count,
         paidCharges : resReport?.data?.paid[0].charges,
       });
      }catch(err:any){
        alert(err.message)
      }
   }

    return (
        <>
       {/** */}
       <div className="relative bg-lightBlue-600 md:pt-32 pb-10 pt-2">
       {/** */}
       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
         <div className="w-full lg:w-4/12 xl:w-3/12 xl:mb-0 px-4 py-4">
          <BodyCard title='TOTAL AMOUNT PAID' value={`GH¢ ${Number.parseFloat(data.totalAmountPaid).toFixed(2)}`} icon='fas fa-hand-holding-usd fa-2x'/>
        </div> 
        <div className="w-full lg:w-4/12 xl:w-3/12 xl:mb-0 px-4 py-4">
        <BodyCard title='TOTAL PAID CHARGES' value={Number.parseFloat(data.paidCharges).toFixed(2)} icon='fas fa-coins fa-2x'/>
        </div>
        <div className="w-full lg:w-4/12 xl:w-3/12 xl:mb-0 px-4 py-4">
          <BodyCard title='NUMBER OF TRANSACTIONS' value={data.transactionsNumb} icon='fas fa-list-ol fa-2x'/>
        </div>
        <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL TRANSACTION AMT(GH¢)' value={`GH¢ ${data.totalTransaction}`} icon='fas fa-coins fa-2x'/>
          </div>
         <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL NUMBER OF FAILED TRANSACTIONS' value={data.failedCount} icon='fas fa-list-ol fa-2x'/>
          </div>
          <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL FAILED TRANSACTION AMOUNT' value={`GH¢ ${data.failedAmount}`} icon='fas fa-coins fa-2x'/>
          </div>
          <div className="w-full lg:w-3/12 xl:w-3/12 px-4 py-4">
          <BodyCard title='TOTAL NUMBER OF PAID TRANSACTIONS' value={data.paidCount} icon='fas fa-list-ol fa-2x'/>
          </div>
          <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL PAID TRANSACTION AMOUNT' value={`GH¢ ${data.paidAmount}`} icon='fas fa-coins fa-2x'/>
          </div>
          <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL NUMBER OF MERCHANTS' value={data.merchantsNumb} icon='fas fa-list-ol fa-2x'/>
          </div>
          <div className="w-full lg:w-3/12 xl:w-3/12 px-4  py-4">
          <BodyCard title='TOTAL AMOUNT FAILED' value={`GH¢ ${Number.parseFloat(data.totalAmountFailed).toFixed(2)}`} icon='fas fa-times fa-2x' />
          </div>
      </div> 
   </div>     
  </>
  )
}

export default Dashboard;