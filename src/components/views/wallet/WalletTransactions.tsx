import {useState, ChangeEvent} from 'react'
import { motion } from 'framer-motion';
import WalletTransactionsTable from '../../tables/WalletTransactionsTable'
import {useSelector} from 'react-redux';
import {reportSelector} from '../../../state/report.state' 
import {ReportModel} from '../../../models/report.model'
import ReportService from '../../../services/reports.service';
import SearchForm from '../../forms/SearchForm';
import {CSVLink} from "react-csv"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../users/Loader';



const swal = require('sweetalert2');

function WalletTransactions(){
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

    const {walletTransactions,customerName} = useSelector(reportSelector)


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

    //const [totalTransactionCount, setTotalTransactionCount] = useState<string>('0')
    const [searchQuery, setSearchQuery] = useState('')
    //const [searchBy , setSearchBy] = useState('All')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [transactionCategory, setTransactionCategory] = useState<string>('')
 

const filterResults = walletTransactions.filter((tr)=>{
    switch(transactionCategory){
    case "name":
      const hasSearchResults:boolean = tr?.customerName?.toLowerCase().includes(searchQuery.toLowerCase())
      if(hasSearchResults) return tr;
      break;
    case "phone":
        const hasSearchResults2:boolean = tr?.customerPhone?.toLowerCase().includes(searchQuery)
        if(hasSearchResults2) return tr;  
        break;
    case "transId":
         const hasSearchResults3:boolean = tr?._id?.toLowerCase().includes(searchQuery)
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


const results:any[] = filterResults.length === 0 ? walletTransactions : filterResults

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
        
        const walletTransactions = res.data.map((d:any)=> new ReportModel(d)) 
        //dispatch(setUserTransactions(walletTransactions))
       setLoading(false)

    }catch(err:any){
        setLoading(false)
        alert(err.message)
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
           <div className='mb-10'>
              <h2 className="text-2xl leading-tight font-segoe">{customerName} Transactions History</h2>
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
                        <option value="transId">transactionId</option>
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
            <div className="inline-block min-w-full shadow-lg overflow-hidden font-segoe">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                 Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Transaction Time
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Recipient Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Charge
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                E-levy
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Debit Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Credit Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Pay_Acc_Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        //    isLoading ?
                        //    <Spinner/>
                        //    :
                           <WalletTransactionsTable transactions={currentRows} />
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10 < 0 ? 0 : currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < results.length ? (currentIndex * rowsPerPage): walletTransactions.length}</span> of <span>{results.length}</span>{' '}Transactions
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
                            currentIndex * rowsPerPage === walletTransactions.length ? 
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
export default WalletTransactions;
