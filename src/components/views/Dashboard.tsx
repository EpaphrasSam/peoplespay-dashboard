import {useEffect, useState} from 'react';
import moment from 'moment';
import TransactionService from '../../services/transactions.service'
import MerchantService from '../../services/merchant.service';
import ReportService from '../../services/reports.service'
import { ReportModel } from '../../models/report.model';

import HeaderCard from '../cards/HeaderCard';
import StatCard from '../cards/StatCard'
import { Link } from 'react-router-dom';

import CardBarChart from '../cards/CardBarChart';
import CardLineChart from '../cards/CardLineChart'
import PaidHighLights from '../views/highlights/PaidTransactions'
import FailedHighLights from '../views/highlights/FailedTransactions'
const Moment = require('moment');

type StateData = {} | any

function Dashboard() {

   let success_TrData:string[] = [];
   let failure_TrData:string[] = [];
   let sales_TrData :number[] = [];
   let cumulativeSales_TrData:number[] = [0];
   let slicedCumulativeData:number[] = [];
   let dates:string[]= [];

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
    
        const [merchantResponse,res,resReport,resTransactions]=await Promise.all(
          [
            MerchantService.summary(),
            TransactionService.summary(),
            ReportService.summaryReport(startDate,endDate),
            ReportService.dateFilter(startDate,endDate)
          ]
        )

       //HighLight table 
       const transactions = resTransactions.data.map((d:any) => new ReportModel(d))
       const paidTransactions = transactions?.filter((t:any)=> t.debit_status === 'paid' && t.status === 'PAID')
       const _paidSliced  = paidTransactions.slice(0,5);
       
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
         totalAmountPaid : resReport?.data?.paid[0]?.totalAmount,
         paidCharges : resReport?.data?.paid[0]?.charges,
         totalAmountFailed : resReport?.data?.failed[0]?.totalAmount,
         totalAmountSuccess : 0,
         merchantsNumb : merchantResponse.data && merchantResponse?.data[0]?.count,
         paidSliced : _paidSliced,
         failedSliced : _failedSliced,
         mtn : mtncount,
         voda : vodacount,
         card : cardcount,
         wallet :walletcount,
         airteltigo : airtelcount

       });

       loadGraph(resTransactions);

      }catch(err:any){}
   }


   const loadGraph=async(res:any)=>{
    try{
      const res = await ReportService.dateFilter('2019-01-01',endDate);
      const trs = res.data; 
      const tr = trs?.sort((a:any,b:any)=> new Moment(a.createdAt).format('YYYYMMDD') - new Moment(b.createdAt).format('YYYYMMDD'))
      
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
        console.log(err);
      } 
   }
  
  
    return (
        <>
       {/** */}
       <div className="relative md:pt-16 pb-12 pt-12">
        {/** */}
        <div className="md:pl-1 md:px-2 mx-auto w-full">
              <div className='grid gap-7 sm:grid-cols-2 lg:grid-cols-4 w-full'>
                   <Link to='/user-transactions'>
                     <HeaderCard title='TOTAL TRANSACTIONS' 
                                  value={data?.totalTransactions??0} 
                                  color = "red"
                                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                         <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                        </svg>}/>
                   </Link>
                 
                   
                    <HeaderCard title='TOTAL PAID CHARGES' 
                                color ="blue"
                                value={`GH¢ ${Number.parseFloat(data?.paidCharges??0).toFixed(2)}`} 
                                icon={
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                }/>
                  
              
                  <Link to='/allpaid-transactions'>
                    <HeaderCard title='TOTAL AMOUNT PAID' 
                                color = "yellow"
                                value={`GH¢ ${Number.parseFloat(data?.totalAmountPaid??0).toFixed(2)}`} 
                                icon={
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                }/>
                  </Link>
                  <Link to='/allpaid-transactions'>
                    <HeaderCard title='TOTAL MERCHANTS' 
                                color = "green"
                                value={data?.merchantsNumb} 
                                icon={
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                }/>
                  </Link>
              </div>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 w-full mb-2 mt-3">
                <StatCard 
                  succ_amount={`GH¢ ${Number.parseFloat(data?.totalAmountPaid??0).toFixed(2)}`}
                  fail_amount = {`GH¢ ${Number.parseFloat(data?.totalAmountFailed??0).toFixed(2)}`}
                  succ_count={data?.successfulCount??0}
                  fail_count={data?.failedCount??0}
                  m = {data.mtn}
                  v = {data.voda}
                  a = {data.airteltigo}
                  w = {data.wallet}
                  c ={data.card}
                /> 
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