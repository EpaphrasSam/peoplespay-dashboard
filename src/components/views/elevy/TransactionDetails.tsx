import {useEffect, useState, ChangeEvent} from 'react'
import{motion} from 'framer-motion'
import ElevyTransactionsDetailsTable from '../../tables/ElevyTransactionsDetailsTable'
import {useSelector} from 'react-redux';
import {elevySelector} from '../../../state/elevy.state' 
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import {CSVLink} from "react-csv"
import "react-datepicker/dist/react-datepicker.css";


function ElevyTransactions(){
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
    
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    
    useEffect(()=>{
    },[searchQuery])

const {transactions} = useSelector(elevySelector)

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

 
const filterResults = transactions?.filter((r:any)=>{
  const hasSearchResults:boolean = r?.accountName?.toLowerCase().includes(searchQuery)
  if((hasSearchResults))return r;
})

const results:any[] = filterResults.length === 0 ? transactions : filterResults

//Get Current Rows
const indexofLastRow:number = currentIndex*rowsPerPage;
const indexofFirstRow:number = indexofLastRow - rowsPerPage; 
const currentRows = results.slice(indexofFirstRow,indexofLastRow)

 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

 const headers = [
    { label: "TRANSACTION ID", key: "_id" },
    { label: "NARRATION", key: "description" },
    { label: "CUSTOMER REFERENCE", key: "reference" },
    { label: "TRANSACTION DATE", key: "createdAt" },
    { label: "TRANSACTION TYPE", key: "transaction_type" },
    { label: "CUSTOMER NAME", key: "payment_account_name" },
    { label: "CUSTOMER PHONE NUMBER", key: "customerPhone" },
    { label: "PAYMENT ACCOUNT NUMBER", key: "payment_account_number" },
    { label: "PAYMENT ACCOUNT ISSUER", key: "paymount_amount_issuer" },
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

    return(
        <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
         <motion.div 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={group1Motion}>
           <div className='mb-10'>
              <h2 className="text-2xl font-semibold leading-tight text-red-800">Elevy Transactions</h2>
           </div>

        {/**download button */}
        <div className="float-right space-x-2 mr-12">
            <CSVLink 
                headers = {headers}
                data = {transactions}
                filename={'elevyrecords.csv'}
                className='py-3 px-2 bg-green-500 text-white font-semibold rounded uppercase shadow hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-500 font-sans'>
                    Download CSV
            </CSVLink>
        </div>
        
       
        {/**date picker */}
        <div className="flex items-center">
          <div className="relative">
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
            />
         </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
            <div className="relative">
                <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                />
            </div>
       </div>

       {/**filter btn */}
       <button 
            className='rounded-md bg-red-800 text-gray-200 py-3 px-7 ml-2 font-sans font-semibold tracking-widest leading-tight outline-none hover:shadow hover:bg-red-900 focus:bg-red-900 ease-linear transition-all duration-150'>Filter</button>
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
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder=''/>
        </div>
        </motion.div>
        
        <motion.div 
          initial="initial"
          animate="animate"
          exit="exit"
          variants={group2Motion}>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
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
                        </tr>
                    </thead>
                    <tbody>
                       {
                           isLoading ?
                           <Spinner/>
                           :
                           <ElevyTransactionsDetailsTable data={currentRows}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < transactions.length ? (currentIndex * rowsPerPage): transactions.length}</span> of <span>{transactions.length}</span>{' '}settlements
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
export default ElevyTransactions;
