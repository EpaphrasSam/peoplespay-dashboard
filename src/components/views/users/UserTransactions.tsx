import {useEffect, useState, ChangeEvent, useRef} from 'react'
import { motion } from 'framer-motion';
import Transaction from '../../tables/UserTransactionsTable'
import {useDispatch, useSelector} from 'react-redux';
import {reportSelector, setUserTransactions} from '../../../state/report.state' 
import {ReportModel} from '../../../models/report.model'
import ReportService from '../../../services/reports.service';
import transactionService from '../../../services/transactions.service';
import SearchForm from '../../forms/SearchForm';
import {CSVLink} from "react-csv"
import DatePicker from 'react-datepicker'
import Loader from './Loader';
import {OutlinedButton} from '../../buttons/BasicButton';
import {TiArrowForwardOutline} from 'react-icons/ti'
import {HiDownload} from 'react-icons/hi'
import{BiFilterAlt}from 'react-icons/bi'
import RowNumberSelector from '../../buttons/RowNumberSelector';
import PageHeader from '../../header/PageHeader';
import Spinner from '../layout/Spinner';
//import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import TransactionDetailsModal from '../../modal/TransactionDetailsModal'
import { formatCurrency, formatNumber } from '../../../utils/Date';
import Pagination from '../../pagination/Pagination';

const swal = require('sweetalert2');

function UserTransactions(){
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


    const {transactions,loading} = useSelector(reportSelector)
    const dispatch = useDispatch();

const headers = [
    { label: "TRANSACTION ID", key: "_id" },
    { label: "NARRATION", key: "description" },
    { label: "CUSTOMER REFERENCE", key: "reference" },
    { label: "TRANSACTION DATE", key: "createdAt" },
    { label: "TRANSACTION TIME", key: "time" },
    { label: "TRANSACTION TYPE", key: "transaction_type" },
    { label: "CUSTOMER NAME", key: "customerName" },
    { label: "CUSTOMER PHONE NUMBER", key: "customerPhone" },
    { label: "PAYMENT ACCOUNT NUMBER", key: "paymentNumber" },
    { label: "PAYMENT ACCOUNT ISSUER", key: "paymentIssuer" },
    { label: "PAYMENT ACCOUNT TYPE", key: "payment_account_type" },
    { label: "AMOUNT", key: "_actualAmount" },
    { label: "CHARGES", key: "_charges" },
    { label: "E-LEVY CHARGES", key: "_elevyCharges" },
    { label: "TOTAL AMOUNT", key: "_amount" },
    { label: "RECIPIENT NAME", key: "recipientName" },
    { label: "RECIPIENT NUMBER", key: "recipientNumber"},
    { label: "RECIPIENT ISSUER", key: "recipientIssuer" },
    { label: "CREDIT STATUS", key: "status" },
    {label:"DEBIT STATUS", key: "debit_status" }
 ]
    const [transaction,setTransaction]=useState<any>(null)
    const [showModal,setShowModal]= useState(false);
    const [startDate, setStartDate] = useState<any>(new Date())
    const [endDate, setEndDate] = useState<any>(new Date())

    const [isloading, setLoading]=useState(false)
    const [amount, setAmount] = useState<string>('0');
    const [paidCharges, setPaidCharges] = useState<string>('0');
    const [failedAmount, setFailedAmount] = useState<string>('0');
    const [totalTransactionCount, setTotalTransactionCount] = useState<string>('0')
    const [searchQuery, setSearchQuery] = useState('')
    //const [searchBy , setSearchBy] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [transactionCategory, setTransactionCategory] = useState<string>('')

    const reverseIDArray  = useRef(new Array());
    const [checked, setChecked]=useState(false)

    useEffect(()=>{
        const response = async()=> {
            try{
                const [res,resReport] = await Promise.all(
                    [
                        ReportService.dateFilter(startDate, endDate),
                        ReportService.summaryReport(startDate,endDate)
                    ]
                )  
                if(!res.success){
                    throw Error(res.message)
                }
                
                const transactions = res.data.map((d:any)=> new ReportModel(d)) 
                
                dispatch(setUserTransactions(transactions))
                //Update states
                setAmount(resReport?.data?.paid[0].totalAmount)
                setPaidCharges(resReport?.data?.paid[0].charges)
                setFailedAmount(resReport?.data?.failed[0].totalAmount)
                setTotalTransactionCount(res.data.length);
            }catch(err:any){}
        }
        response();
    },[]) 

const filterResults = transactions.filter((tr)=>{
    switch(transactionCategory){
    case "name":
      const hasSearchResults:boolean = tr?.customerName?.toLowerCase().startsWith(searchQuery.toLowerCase())
      if(hasSearchResults) return tr;
      break;
    case "phone":
        const hasSearchResults2:boolean = tr?.customerPhone?.toLowerCase().startsWith(searchQuery)
        if(hasSearchResults2) return tr;  
        break;
    case "transId":
         const hasSearchResults3:boolean = tr?._id?.toLowerCase().startsWith(searchQuery)
         if(hasSearchResults3) return tr;  
         break;
    case "refcode":
         const hasSearchResults4:boolean = tr?.reference?.toLowerCase().includes(searchQuery)
         if(hasSearchResults4) return tr;  
         break;
    default:
        return tr;
    }
})

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

const transactionCategoryHandler = (e:ChangeEvent<HTMLSelectElement>) => setTransactionCategory(e.target.value);


const results:any[] = filterResults.length === 0 ? transactions : filterResults

const firstPageIndex=(currentPage-1)*rowsPerPage;
const lastPageIndex = firstPageIndex+rowsPerPage;
const currentTableData= results?.slice(firstPageIndex,lastPageIndex)


  const clickDateFilter = async() => {
    try{
        setLoading(true)
        const res = await ReportService?.dateFilter(startDate,endDate)
        const resReport = await ReportService?.summaryReport(startDate,endDate)
        //const transactionResponse = await TransactionService.summary() 
        
        const transactions = res.data.map((d:any)=> new ReportModel(d)) 
        dispatch(setUserTransactions(transactions))

       //Update states
       setAmount(resReport?.data?.paid[0].totalAmount)
       setPaidCharges(resReport?.data?.paid[0].charges)
       setFailedAmount(resReport?.data?.failed[0].totalAmount)
       setTotalTransactionCount(transactions.length)
       setLoading(false)

    }catch(err:any){
        setLoading(false)
        alert(err.message)
    }
  }

//   const reverseSelectedTransactions = async(data:any) => {
//       try{
//         const res = await transactionService.reverseTransaction(data)
//         if(!res.success){
//             alert(res.message)
//             }else{
//                 swal.fire(
//                 {
//                     html : "<div>Transactions have been successfully reversed</div>"
//                 }
//                 )
//             }
//       }
//       catch(err:any){
//           swal.fire(
//               {
//                   html : "<div>Sorry, the OTP you entered may be wrong. Try again</div>"
//               }
//           )
//       }
//   }
  

//  const initiateReversal = async() => {
//    try{
//     if(reverseIDArray.current.length < 1){
//         return swal.fire(
//             {
//                 html : "<div><p>No transaction has been selected</p></div>"
//             }
//         )
//     }

//     const res = await transactionService.otpReversal();

//     if(!res.success){
//       return swal.fire(
//              {
//                  html : "<div><p>" + res.message + "</p></div>"
//              }
//         )
//     }
//     swal.fire(
//         {   
//             title: "Enter the OTP received",
//             input: 'text',
//             showDenyButton: true,
//             denyButtonText : "Cancel Reversal",
//             confirmButtonText : "Confirm Reversal"
//         }
//         ).then(function(input:any){
//                if(input){
//                 const data = {
//                              transactions : reverseIDArray.current,
//                              otp : input.value
//                              }
//                 //console.log(input.value)
//                 reverseSelectedTransactions(data)
//                }
               
//          })
//    }catch(err){
    
//     swal(
//         {
//             html :"<div><p>Sorry, select transactions and initiate reversal again</p></div>"
//         }
//     )
//    }
//  }
 

 const addIdToReverseIDs = (id:any)=> {
     if(reverseIDArray.current.includes(id)){
        reverseIDArray.current.splice(0,reverseIDArray.current.length);
       return setChecked(false)
     }
     if(reverseIDArray.current.length>0){
          alert('Sorry, you can select one transaction to reverse')
     }else{
        reverseIDArray.current.push(id);
        setChecked(true);
     }
    }

    return(
        <div className="relative md:pt-7 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
         <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group1Motion}>
              
              <PageHeader title="Transactions"/>

            {/**deviders */}
            <div className='grid grid-cols-4 divide-x divide-green-500 mb-10'>
                <div>
                    <span className='bg-green-100 rounded-md px-2'>Transactions</span>
                    <h2 className="text-3xl leading-tight py-4">{formatNumber(totalTransactionCount)}</h2>
                </div>
                <div>
                    <span className='bg-yellow-100 rounded-md px-2'>Amount</span>
                    <h2 className="text-3xl leading-tight py-4">{formatCurrency(amount)??0.00}</h2>
                </div>
                <div>
                    <span className='bg-red-100 rounded-md px-2'>Failed</span>
                    <h2 className="text-3xl leading-tight py-4">{formatCurrency(failedAmount)??0.00}</h2>
                </div>
                <div>
                    <span className='bg-blue-100 rounded-md px-2'>Charges</span>
                    <h2 className="text-3xl leading-tight pyd-4">{formatCurrency(paidCharges)??0.00}</h2>
                </div>
            </div>
            </motion.div>

        {/**download button */}
        <div className="float-right space-x-2 -mr-4">
            <CSVLink 
                headers = {headers}
                data = {results}
                filename={'report.csv'}
                className='py-2 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2'>
                    <HiDownload/>
                    <span>{isloading ? 'Preparing...' : 'Download Report'}</span>
            </CSVLink>
        </div>
        
       
        {/**date picker */}
        <div className="flex items-center space-x-2">
          <div className="relative">
             <DatePicker 
                      selected = {startDate}
                      value={startDate}
                      onChange = {(date)=>setStartDate(date)}
                      className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                      dateFormat="dd/MM/yyyy"
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}              
                    />
           </div>
           <span className="mx-4 text-gray-500">to</span>
           <div className="relative">
             <DatePicker 
                    selected = {endDate}
                    value = {endDate}
                    onChange = {(date)=>{setEndDate(date)}}
                    className="rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500" 
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    endDate={endDate}
                    minDate={startDate}
                  
               />
       </div>

       {/**filter btn */}
       <OutlinedButton 
        value={isloading? <Loader/> : 'Filter'}
        action={()=>clickDateFilter()}
        color="gray"
        paddingWide
        icon={<BiFilterAlt/>}
       />
     </div>
     {/**end date */}

{/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
                <div className="relative">
                    <select
                        onChange = {transactionCategoryHandler}
                        value = {transactionCategory}
                        className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option value="none" selected >search column</option>
                        <option value="phone">customer phone</option>
                        <option value="name">customer name</option>
                        <option value="transId">transactionId</option>
                        <option value="refcode">reference code</option>
                    </select>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder={`Search ${transactionCategory}` }/>
        </div>
        <TransactionDetailsModal transaction={transaction} action={()=>{setShowModal(false)}} showModal={showModal}/>
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group2Motion}>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg overflow-hidden font-segoe">
                <table className="min-w-full leading-normal">
                    <thead className="text-sm text-gray-600">
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                 Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left  font-semibold tracking-wider">
                                Transaction Time
                            </th>
                             <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Customer Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Recipient Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Charge
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                E-levy
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Debit Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Credit Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Pay_Acc_Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left font-semibold tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                       {
                           loading ?
                            <Spinner/>
                           :
                           <Transaction transactions={currentTableData} addId={addIdToReverseIDs} reverseIds={reverseIDArray.current} checked={checked} setShowModal={setShowModal} setTransaction={setTransaction}/>
                       }
                    </tbody>
                </table>
                
                {/** Pagination */}
                <div className='my-7'>
                    <Pagination 
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={transactions?.length}
                            pageSize={rowsPerPage}
                            onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}/>
                </div>
            </div>
        </div>
        </motion.div>
     </div>
    )
}
export default UserTransactions;
