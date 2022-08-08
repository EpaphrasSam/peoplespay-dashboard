import { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import TransactionService from "../../services/transactions.service";
import MerchantService from "../../services/merchant.service";
import ReportService from "../../services/reports.service";
import { ReportModel } from "../../models/report.model";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker'

import HeaderCard from "../cards/HeaderCard";
import StatCard from "../cards/StatCard";

import CardBarChart from "../cards/CardBarChart";
import CardLineChart from "../cards/CardLineChart";
import PaidHighLights from "../views/highlights/PaidTransactions";
import FailedHighLights from "../views/highlights/FailedTransactions";

import SkeletonHeaderCard from '../skeletons/Skeleton';

type StateData = {} | any;

function Dashboard() {
  const group1Motion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, y: 10, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } }
  };
  const group2Motion = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 10, transition: { duration: 2 } },
    exit: { opacity: 0, x: 0, transition: { duration: 2 } }
  };
   
  const [startDate, setStartDate] = useState<any>(new Date())
  const [endDate, setEndDate] = useState<any>(new Date())
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState<StateData>({
    totalTransactions: 0,
    successfulCount: 0,
    failedCount: 0,
    pendingCount:0,
    totalElevy: 0,
    paidCharges: 0,
    totalAmountFailed: 0,
    totalAmountSuccess: 0,
    merchantsNumb: 0,
    mtn: 0,
    voda: 0,
    airteltigo: 0,
    wallet: 0,
    card: 0,
    paidSliced: [],
    failedSliced: [],
  });

  useEffect(() => {
    response();
  }, [startDate,endDate]);

  async function response() {
    try {
      setLoading(true)
      const [merchantResponse, res, resReport, resTransactions] =
        await Promise.all([
          MerchantService.summary(),
          TransactionService.summary(),
          ReportService.summaryReport(startDate, endDate),
          ReportService.dateFilter(startDate, endDate),
        ]);

      //HighLight table
      const transactions = resTransactions.data.map(
        (d: any) => new ReportModel(d)
      );
      const paidTransactions = transactions?.filter(
        (t: any) => t.debit_status === "paid" && t.status === "PAID"
      );
      const _paidSliced = paidTransactions.slice(0, 5);

      const failedTransactions = transactions?.filter(
        (t: any) => t.debit_status === "failed"
      );
      const _failedSliced = failedTransactions.slice(0, 5);

      //payment source channels
      let mtncount = 0;
      let vodacount = 0;
      let cardcount = 0;
      let airtelcount = 0;
      let walletcount = 0;

      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].paymentIssuer === "MTN") {
          mtncount += 1;
        } else if (transactions[i].paymentIssuer === "VODAFONE") {
          vodacount += 1;
        } else if (transactions[i].paymentIssuer === "AIRTELTIGO") {
          airtelcount += 1;
        } else if (transactions[i].payment_account_type === "card") {
          cardcount += 1;
        } else if (transactions[i].payment_account_type === "wallet") {
          walletcount += 1;
        }
      }

      setData({
        totalTransactions: transactions.length,
        successfulCount: paidTransactions.length,
        failedCount: failedTransactions.length,
        pendingCount : transactions.length - (paidTransactions.length + failedTransactions.length),
        totalElevy: resReport?.data?.elevy[0]?.elevyAmount,
        paidCharges: resReport?.data?.paid[0]?.charges,
        totalAmountFailed: resReport?.data?.failed[0]?.totalAmount,
        totalAmountSuccess: resReport?.data?.paid[0]?.totalAmount,
        merchantsNumb:
        merchantResponse.data && merchantResponse?.data[0]?.count,
        paidSliced: _paidSliced,
        failedSliced: _failedSliced,
        mtn: mtncount,
        voda: vodacount,
        card: cardcount,
        wallet: walletcount,
        airteltigo: airtelcount,
      });

      setLoading(false)
    } catch (err: any) {setLoading(false)}
  }

  return (
      <div className="relative md:pt-16 pb-12 pt-12 font-inter">
        <div className="md:pl-1 md:px-2 mx-auto w-full">
            <div className="z-10 bg-white flex items-center float-right">
               <span className="pr-2 text-pink">Showing</span>
                <DatePicker 
                      selected = {startDate}
                      value={startDate}
                      onChange = {(date)=>setStartDate(date)}
                      className="bg-white border border-blue-500 text-blue-500 sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                      dateFormat="dd/MM/yyyy"
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}              
                    />
               <span className="mx-4 text-blue-500">to</span>
               <DatePicker 
                    selected = {endDate}
                    value = {endDate}
                    onChange = {(date)=>{setEndDate(date);console.log('ch')}}
                    className="bg-white border border-blue-500 text-blue-500 sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    endDate={endDate}
                    minDate={startDate}
                  
               />
           </div>
          <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group1Motion}>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 w-full">
            {!loading ?
            <>
            <Link to="/user-transactions">
              <HeaderCard
                title="TOTAL TRANSACTIONS"
                value={data?.totalTransactions ?? 0}
                color="red"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                }
              />
            </Link>

            <HeaderCard
              title="TOTAL PAID CHARGES"
              color="red"
              value={`GH¢ ${Number.parseFloat(data?.paidCharges ?? 0).toFixed(
                2
              )}`}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            <Link to="/allpaid-transactions">
              <HeaderCard
                title="TOTAL ELEVY"
                color="red"
                value={`GH¢ ${Number.parseFloat(
                  data?.totalElevy ?? 0
                ).toFixed(2)}`}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
            </Link>
            <Link to="/allpaid-transactions">
              <HeaderCard
                title="TOTAL MERCHANTS"
                color="red"
                value={data?.merchantsNumb}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                }
              />
            </Link>
            </>
            :
            [1, 2, 3, 4].map(loading => (
              <div className="col-3" key={loading}>
                  <SkeletonHeaderCard height={120}/>
              </div>
          ))
             
            }
            
          </div>
         </motion.div>
      
         <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group2Motion}>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 w-full mb-2 mt-3">
            {!loading?
            <StatCard
              succ_amount={`GH¢ ${Number.parseFloat(
                data?.totalAmountSuccess ?? 0
              ).toFixed(2)}`}
              fail_amount={`GH¢ ${Number.parseFloat(
                data?.totalAmountFailed ?? 0
              ).toFixed(2)}`}
              succ_count={data?.successfulCount ?? 0}
              fail_count={data?.failedCount ?? 0}
              pending_count={data?.pendingCount ?? 0}
              m={data.mtn}
              v={data.voda}
              a={data.airteltigo}
              w={data.wallet}
              c={data.card}
            />:
               [1, 2, 3, 4].map(loading => (
                  <div className="col-3" key={loading}>
                      <SkeletonHeaderCard height={200}/>
                  </div>
              ))
            }
          </div>
        </motion.div>
  
          {/**charts*/}
         <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group1Motion}>
          <div className="flex flex-wrap pt-2">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 md:pr-4">
              <CardBarChart/>
            </div>
            <div className="w-full xl:w-4/12 ">
              <CardLineChart/>
            </div>
          </div>
          </motion.div>

          {/**highlights */}
          <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group2Motion}>
          <div className="flex flex-wrap mt-4 font-segoe">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 md:pr-1">
              <PaidHighLights transactions={data.paidSliced} />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <FailedHighLights transactions={data.failedSliced} />
            </div>
          </div>
         </motion.div>
        </div>
      </div>
  
  );
}

export default Dashboard;
