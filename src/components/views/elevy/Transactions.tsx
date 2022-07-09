import {useEffect, useState, ChangeEvent} from 'react'
import{motion} from 'framer-motion'
import ElevyTransactionsTable from '../../tables/ElevyTransactionsTable'
import {useDispatch, useSelector} from 'react-redux';
import {elevySelector,setRecords,setTransactions} from '../../../state/elevy.state' 
import getElevyTransactions from '../../../services/elevy.services';
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
    
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    
    useEffect(()=>{
        response();
    },[searchQuery])

    const response = async()=> {
        try{ 
            setIsLoading(true)
            const res = await getElevyTransactions()
            //console.log(res);
            if(!res.success){
                alert(res.message)
            }
            dispatch(setRecords(res.data))
            setIsLoading(false)

            //Update states
        }catch(err:any){}
    }
 
const {records} = useSelector(elevySelector)

const goTo = (data:any) => {
   dispatch(setTransactions(data));
   window.location.href="/#/elevytransactions"

}

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

 
const filterResults = records?.filter((r:any)=>{
  const hasSearchResults:boolean = r?.accountName?.toLowerCase().includes(searchQuery)
  if((hasSearchResults))return r;
})

const results:any[] = filterResults.length === 0 ? records : filterResults

//Get Current Rows
const indexofLastRow:number = currentIndex*rowsPerPage;
const indexofFirstRow:number = indexofLastRow - rowsPerPage; 
const currentRows = results.slice(indexofFirstRow,indexofLastRow)

 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

 const headers = [
    { label: "Date", key: "date" },
    { label: "Id", key: "_id" },
    { label: "Amount", key: "amount" },
    { label:"Count", key:"count" }
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
              <h2 className="text-2xl leading-tight font-segoe">Elevy Records</h2>
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

       {/**csv btn */}
       <div className="space-x-2">
            <CSVLink 
                headers = {headers}
                data = {records}
                filename={'elevyrecords.csv'}
                className='py-3 px-2 bg-green-500 text-white rounded shadow hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-500 font-sans'>
                    Download CSV
            </CSVLink>
        </div>
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
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
            <div className="inline-block min-w-full shadow-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Id
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Number of Transactions
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Total Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Taxable Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Accumulated Elevy
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-md'>
                       {
                           isLoading ?
                           <Spinner/>
                           :
                           <ElevyTransactionsTable data={currentRows} goTo={goTo}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col  items-center justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < records.length ? (currentIndex * rowsPerPage): records.length}</span> of <span>{records.length}</span>{' '}settlements
                    </div> 
                    <div className="inline-flex mt-2 md:mt-0">
                        {
                            currentIndex === 1 ? 
                            (
                             <button className="text-sm bg-gray-100 text-gray-800 py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                             >
                            Prev
                        </button>
                            )
                            :
                            (<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"
                                    onClick = {paginateBack}
                                >
                                    Prev
                            </button>)
                        } 
                         {
                            currentIndex * rowsPerPage === records.length ? 
                            (
                                <button className="cursor-not-allowed text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
                                onClick = {paginateFront}
                                >
                                    Next
                                </button>
                            )
                            :
                            (
                            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
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
