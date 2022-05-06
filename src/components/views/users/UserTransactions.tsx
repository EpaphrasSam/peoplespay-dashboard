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
import "react-datepicker/dist/react-datepicker.css";
import Loader from './Loader';


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


    const {transactions} = useSelector(reportSelector)
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
    { label: "AMOUNT", key: "actualAmount" },
    { label: "CHARGES", key: "charges" },
    { label: "E-LEVY CHARGES", key: "elevyCharges" },
    { label: "TOTAL AMOUNT", key: "amount" },
    { label: "RECIPIENT NAME", key: "recipientName" },
    { label: "RECIPIENT NUMBER", key: "recipientNumber"},
    { label: "RECIPIENT ISSUER", key: "recipientIssuer" },
    { label: "CREDIT STATUS", key: "status" },
    {label:"DEBIT STATUS", key: "debit_status" }
 ]


    const [startDate, setStartDate] = useState<any>(new Date())
    const [endDate, setEndDate] = useState<any>(new Date())

    const [loading, setLoading]=useState(false)
    const [amount, setAmount] = useState<string>('0');
    const [paidCharges, setPaidCharges] = useState<string>('0');
    const [failedAmount, setFailedAmount] = useState<string>('0');
    const [totalTransactionCount, setTotalTransactionCount] = useState<string>('0')
    const [searchQuery, setSearchQuery] = useState('')
    //const [searchBy , setSearchBy] = useState('All')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [transactionCategory, setTransactionCategory] = useState<string>('')


    const reverseIDArray  = useRef(new Array());
    

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
      const hasSearchResults:boolean = tr?.customerName?.toLowerCase().includes(searchQuery)
      if(hasSearchResults) return tr;
      break;
    case "phone":
        const hasSearchResults2:boolean = tr?.customerPhone?.toLowerCase().includes(searchQuery)
        if(hasSearchResults2) return tr;  
        break;
    case "refcode":
            const hasSearchResults3:boolean = tr?.reference?.toLowerCase().includes(searchQuery)
            if(hasSearchResults3) return tr;  
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

 //Get Current rows
 const indexOfLastRow:number = currentIndex * rowsPerPage;
 const indexOfFirstRow:number = indexOfLastRow - rowsPerPage;
 const currentRows = results?.slice(indexOfFirstRow,indexOfLastRow)
 
 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

  const clickDateFilter = async() => {
    try{
        setLoading(true)
        const res = await ReportService.dateFilter(startDate,endDate)
        const resReport = await ReportService.summaryReport(startDate,endDate)
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

  const reverseSelectedTransactions = async(data:any) => {
      try{
        const res = await transactionService.reverseTransaction(data)
        if(!res.success){
            alert(res.message)
            }else{
                swal.fire(
                {
                    html : "<div>Transactions have been successfully reversed</div>"
                }
                )
            }
      }
      catch(err:any){
          swal.fire(
              {
                  html : "<div>Sorry, the OTP you entered may be wrong. Try again</div>"
              }
          )
      }
  }

 const initiateReversal = async() => {

   try{
    if(reverseIDArray.current.length < 1){
        return swal.fire(
            {
                html : "<div><p>No transaction has been selected</p></div>"
            }
        )
    }

    const res = await transactionService.otpReversal();

    if(!res.success){
      return swal.fire(
             {
                 html : "<div><p>" + res.message + "</p></div>"
             }
        )
    }
 
    
    swal.fire(
        {   
            title: "Enter the OTP received",
            input: 'text',
            showDenyButton: true,
            denyButtonText : "Cancel Reversal",
            confirmButtonText : "Confirm Reversal"
        }
        ).then(function(input:any){
               if(input){
                const data = {
                             transactions : reverseIDArray.current,
                             otp : input.value
                             }
                console.log(input.value)
                reverseSelectedTransactions(data)
               }
                
                })
   }catch(err){
    swal(
        {
            html :"<div><p>Sorry, select transactions and initiate reversal again</p></div>"
        }
    )
   }
 }

 const addIdToReverseIDs = (id:any)=> {
     const i = reverseIDArray.current.indexOf(id)
     if(i > -1){
       return  reverseIDArray.current.splice(i,1);
     } 
     reverseIDArray.current.push(id);
    }

    return(
        <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
         <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group1Motion}>
           <div className='mb-10'>
              <h2 className="text-2xl font-semibold leading-tight text-red-800">User Transactions</h2>
           </div>

            {/**deviders */}
            <div className='grid grid-cols-4 divide-x divide-green-500 mb-10'>
                <div>
                    <span className='bg-green-300 rounded-xl px-2'>transactions</span>
                    <h2 className="text-3xl font-semibold leading-tight text-red-800 py-4">{totalTransactionCount}</h2>
                </div>
                <div>
                    <span className='bg-yellow-500 rounded-xl px-2'>amount</span>
                    <h2 className="text-3xl font-semibold leading-tight text-red-800 py-4">{`GH¢ ${Number.parseFloat(amount).toFixed(2)}`}</h2>
                </div>
                <div>
                    <span className='bg-red-400 rounded-xl px-2'>failed</span>
                    <h2 className="text-3xl font-semibold leading-tight text-red-800 py-4">{`GH¢ ${Number.parseFloat(failedAmount).toFixed(2)}`}</h2>
                </div>
                <div>
                    <span className='bg-blue-300 rounded-xl px-2'>charges</span>
                    <h2 className="text-3xl font-semibold leading-tight text-red-800 pyd-4">{`GH¢ ${Number.parseFloat(paidCharges).toFixed(2)}`}</h2>
                </div>
            </div>
            </motion.div>

        {/**download button */}
        <div className="float-right space-x-2 mr-12">
            <CSVLink 
                headers = {headers}
                data = {results}
                filename={'report.csv'}
                className='py-3 px-2 bg-green-500 text-white font-semibold rounded uppercase shadow hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-500 font-sans'>
                    {loading ? 'preparing...' : 'Download CSV'}
            </CSVLink>
            <button 
                    className="outline outline-2  outline-offset-2  py-2 px-1 bg-blue-500 text-white font-semibold rounded uppercase shadow hover:shadow hover:bg-blue-500 focus:outline-none ease-linear transition-all duration-150"
                    onClick={()=>initiateReversal()}
                    >
                Reverse Transactions
            </button>
        </div>
        
       
        {/**date picker */}
        <div className="flex items-center">
          <div className="relative">
            <DatePicker selected = {startDate}
                        onChange = {(date)=>setStartDate(date)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
            />
         </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
        <DatePicker selected = {endDate}
                    value = {endDate}
                        //locale = 'en-CA'
                        onChange = {(date)=>setEndDate(date)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
         />
       </div>

       {/**filter btn */}
       <button 
            onClick={()=>clickDateFilter()}
            className={`rounded-md ${loading?'bg-white':'bg-red-800'} text-gray-200 py-3 px-7 ml-2 font-sans font-semibold tracking-widest leading-tight outline-none hover:shadow ease-linear transition-all duration-150`}>{loading? <Loader/> : 'Filter'}</button>
     </div>
     {/**end date */}

{/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                    <select
                        onChange = {pageRowsHandler}
                        value={rowsPerPage}
                        className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                        <option>80</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
                <div className="relative">
                    <select
                        onChange = {transactionCategoryHandler}
                        value = {transactionCategory}
                        className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option value="none" selected >search column</option>
                        <option value="phone">customer phone</option>
                        <option value="name">customer name</option>
                        <option value="refcode">reference code</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder={`Search ${transactionCategory}`}/>
        </div>
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group2Motion}>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Customer Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Transaction date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                transaction time
                            </th>
                             <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Customer name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Recipient name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                charge
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                E-levy
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                debit status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                credit status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                pay_acc_type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        //    isLoading ?
                        //    <Spinner/>
                        //    :
                           <Transaction transactions={currentRows} addId={addIdToReverseIDs}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10 < 0 ? 0 : currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < results.length ? (currentIndex * rowsPerPage): transactions.length}</span> of <span>{results.length}</span>{' '}Transactions
                    </span> 
                    <div className="inline-flex mt-2 xs:mt-0">
                        {
                            currentIndex === 1 ? 
                            (
                             <button className="text-sm bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                             >
                            Prev
                        </button>
                            )
                            :
                            (<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                                    onClick = {paginateBack}
                                >
                                    Prev
                            </button>)
                        } 
                         {
                            currentIndex * rowsPerPage === transactions.length ? 
                            (
                                <button className="cursor-not-allowed text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                                onClick = {paginateFront}
                                >
                                    Next
                                </button>
                            )
                            :
                            (
                            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                            onClick = {paginateFront}
                            >
                                Next
                            </button>
                            )
                        }       
                        
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
     </div>
    )
}
export default UserTransactions;
