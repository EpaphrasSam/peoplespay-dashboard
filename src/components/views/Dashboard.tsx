import {useEffect, useState} from 'react';
import moment from 'moment';
import TransactionService from '../../services/transactions.service'
import MerchantService from '../../services/merchant.service';
import ReportService from '../../services/reports.service'
import { ReportModel } from '../../models/report.model';


import BodyCard from '../cards/BodyCard';
import BodyCardTwo from '../cards/BodyCardTwo';
import { Link } from 'react-router-dom';

import CardBarChart from '../cards/CardBarChart';
import CardLineChart from '../cards/CardLineChart'
import PaidHighLights from '../views/highlights/PaidTransactions'
import FailedHighLights from '../views/highlights/FailedTransactions'



type StateData = {} | any

function Dashboard() {

      //const startDate =  new Date((new Date()).valueOf() - 1000*60*60*24).toISOString();
      const startDate = new Date().toISOString();
      const endDate = new Date().toISOString();
      

  const [data, setData] = useState<StateData>({
    totalTransactions : 0,
    successfulCount : 0,
    failedCount : 0,
    totalAmountPaid : 0,
    paidCharges : 0,
    totalAmountFailed : 0,
    totalAmountSuccess:0,
    merchantsNumb : 0,
    mtn : 0,
    voda : 0,
    airteltigo : 0,
    wallet : 0,
    card : 0,
    paidSliced : [],
    failedSliced : [] 
  })

  useEffect(()=>{
    response();
  
    },[])

    async function response(){
      try{
      
       const merchantResponse = await MerchantService.summary();
       const res = await TransactionService.summary() 
       const resReport = await ReportService.summaryReport(startDate,endDate);
       const resTransactions = await ReportService.dateFilter(startDate, endDate)
       
      
      
       if(!res.success )throw alert(res.message)
          
       if(!resReport.success) throw alert(resReport.message)

       if(!resTransactions.success) throw alert(resTransactions.message)

       //HighLight table 
       const transactions = resTransactions.data.map((d:any) => new ReportModel(d))
       
       

       //Paid
       const paidTransactions = transactions?.filter((t:any)=> t.debit_status === 'paid' && t.status === 'PAID')
       const _paidSliced  = paidTransactions.slice(0,5);
       


       //Failed
       const failedTransactions = transactions?.filter((t:any)=> t.debit_status === 'failed' || t.status === 'FAILED')
       const _failedSliced = failedTransactions.slice(0,5);
       
       //payment source channels
       let mtncount = 0;
       let vodacount = 0;
       let cardcount = 0;
       let airtelcount = 0;
       let walletcount = 0;

       for(let i = 0; i < transactions.length; i++){
         if(transactions[i].paymentIssuer === 'MTN'){
           mtncount+=1;
         }else if(transactions[i].paymentIssuer === 'VODAFONE'){
           vodacount+=1
         }else if(transactions[i].paymentIssuer === 'AIRTELTIGO'){
           airtelcount+=1
         }else if(transactions[i].payment_account_type === 'card'){
          cardcount+=1
         }else if(transactions[i].payment_account_type === 'wallet'){
          walletcount+=1
         }
       }


       setData({
         totalTransactions : transactions.length,
         successfulCount : paidTransactions.length,
         failedCount : failedTransactions.length,
         totalAmountPaid : resReport?.data?.paid[0].totalAmount,
         paidCharges : resReport?.data?.paid[0].charges,
         totalAmountFailed : resReport?.data?.failed[0].totalAmount,
         totalAmountSuccess : 0,
         merchantsNumb : merchantResponse.data && merchantResponse.data[0].count,
         paidSliced : _paidSliced,
         failedSliced : _failedSliced,
         mtn : mtncount,
         voda : vodacount,
         card : cardcount,
         wallet :walletcount,
         airteltigo : airtelcount

       });

      }catch(err:any){
        alert(err.message)
      }
   }
   

   //Chats
   const Moment = require('moment');

   let success_TrData:string[] = [];
   let failure_TrData:string[] = [];
   let sales_TrData :number[] = [];
   let cumulativeSales_TrData:number[] = [0];
   let slicedCumulativeData:number[] = [];
   let dates:string[]= [];

   
   (async()=>{

    try{
  
    const res = await ReportService.dateFilter('2016-01-01',endDate);
    const trs = res.data; 
    const tr = trs.sort((a:any,b:any)=> new Moment(a.createdAt).format('YYYYMMDD') - new Moment(b.createdAt).format('YYYYMMDD'))
    
    dates.push(moment(tr[0].createdAt).format('YYYY/MMM'));
    

    //@Loops tr
    //@takes date month
    for(let i = 0; i < tr.length; i++){
      
      let tr_year = moment(tr[i].createdAt).format('YYYY/MMM')

      if(!(dates.includes(tr_year))){
        dates.push(tr_year)
      }else{
        continue;
      } 
    }

    //@Loops tr
    //@Groups transactions
    for(let i=0; i< dates.length; i++){
        let sucessCount = 0;
        let failureCount = 0;
        let totalSales:number = 0;

      for(let x = 0; x<tr.length;x++){

        const isSuccessful = tr[x].status === 'paid' && tr[x].debit_status === 'paid';
        const isFailure = tr[x].status === 'failed' || tr[x].debit_status === 'failed'
        
        //Calculate sales
        if(moment(tr[x].createdAt).format('YYYY/MMM') === dates[i]){
           totalSales+= parseInt(tr[x].charges);
        }

        //Check tr date in dates and increase count
        if(isSuccessful && (moment(tr[x].createdAt).format('YYYY/MMM') === dates[i])){
           sucessCount+=1;
        }

        if(isFailure && (moment(tr[x].createdAt).format('YYYY/MMM') === dates[i])){
          failureCount+=1;
        }

     }
        success_TrData.push(sucessCount.toString())
        failure_TrData.push(failureCount.toString())
        sales_TrData.push(Math.round(totalSales))
    }     
       
        
    for(let i = 0; i < sales_TrData.length; i++){
        cumulativeSales_TrData.push(Number(sales_TrData[i]) + Number(cumulativeSales_TrData[i]))
      }

    for(let i= 0; i < cumulativeSales_TrData.length;++i){
        
        slicedCumulativeData.push(cumulativeSales_TrData[i+1]);
    }
    }catch(err:any){
        alert(err.message)
    }   
   })()
  

   console.log("paid" + data.totalAmountPaid)
  //  console.log(success_TrData);
  //  console.log(failure_TrData);
  //  console.log(sales_TrData)
  //  console.log(cumulativeSales_TrData)
  //  console.log(slicedCumulativeData)
   //console.log(dates);
  
    return (
        <>
       {/** */}
       <div className="relative md:pt-16 pb-12 pt-12">
        {/** */}
        <div className="px-4 md:px-10 mx-auto w-full">
              <div className='flex flex-wrap bg-gray-900 py-12 pb-4'>
                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                   <Link to='/user-transactions'>
                     <BodyCard title='TOTAL TRANSACTIONS TODAY' value={data.totalTransactions} icon='fas fa-list-ol' statusIcon="fas fa-arrow-up text-blue-500 mr-1 fa-xs" status='current'/>
                   </Link>
                 </div>
                 <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <Link to='/allpaid-transactions'>
                    <BodyCard title='SUCCESSFUL TRANSACTIONS' value={data.successfulCount} icon='fas fa-check' statusIcon="fas fa-circle text-orange-500 mr-1 fa-xs" status='today'/>
                    </Link>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <Link to='/allpaid-transactions'>
                    <BodyCard title='TOTAL AMOUNT PAID' value={`GH¢ ${Number.parseFloat(data.totalAmountPaid).toFixed(2)}`} icon='fas fa-check' statusIcon="fas fa-circle text-orange-500 mr-1 fa-xs" status='today'/>
                  </Link>
                </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <BodyCardTwo title='SOURCE CHANNELS'  
                                icon='fas fa-compress-arrows-alt' 
                                statusIcon="fas fa-circle text-purple-500 mr-1 fa-xs" 
                                status='today'
                                m = {data.mtn}
                                v = {data.voda}
                                a = {data.airteltigo}
                                w = {data.wallet}
                                c ={data.card}
                                />
                  </div> 
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <BodyCard title='TOTAL PAID CHARGES' value={`GH¢ ${Number.parseFloat(data.paidCharges).toFixed(2)}`} icon='fas fa-coins' statusIcon="fas fa-circle text-green-500 mr-1 fa-xs" status='today'/>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <Link to='/allfailed-transactions'>
                      <BodyCard title='FAILED TRANSACTIONS' value={data.failedCount} icon='fas fa-times' statusIcon="fas fa-circle text-indigo-500 mr-1 fa-xs" status='today'/>
                    </Link>
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                   <Link to='/allfailed-transactions'>
                     <BodyCard title='TOTAL AMOUNT FAILED' value={`GH¢ ${Number.parseFloat(data.totalAmountFailed).toFixed(2)}`} icon='fas fa-times' statusIcon="fas fa-circle text-teal-500 mr-1 fa-xs" status='today'/>
                    </Link>
                </div> 
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                      <Link to='/merchants'>
                        <BodyCard title='TOTAL NUMBER OF MERCHANTS' value={data.merchantsNumb} icon='fas fa-list-ol' statusIcon="fas fa-arrow-up text-blue-500 mr-1 fa-xs" status='current'/>
                      </Link>
                </div>
              </div>

              {/**charts*/}
              <div className='flex flex-wrap pt-2'>
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 md:pr-4">
                  <CardLineChart dates={dates} salesData={sales_TrData} cumulativeData={slicedCumulativeData}/>
                </div>
                <div className="w-full xl:w-4/12 ">
                  <CardBarChart sucessData={success_TrData} failureData={failure_TrData} dates={dates}/>
                </div>
              </div>  

              {/**highlights */}
              <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 md:pr-1">
                   <PaidHighLights transactions={data.paidSliced}/>
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <FailedHighLights transactions={data.failedSliced}/>
                </div>
              </div>
        </div> 
   </div>     
  </>
  )
}

export default Dashboard;