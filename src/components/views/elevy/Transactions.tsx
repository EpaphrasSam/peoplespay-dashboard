import {useState, ChangeEvent} from 'react'
import {useNavigate} from 'react-router-dom'
import{motion} from 'framer-motion'
import useFetchElevy from './useFetchElevy';
import ElevyTransactionsTable from '../../tables/ElevyTransactionsTable'
import {useDispatch, useSelector} from 'react-redux';
import {elevySelector,setTransactions,setRecords} from '../../../state/elevy.state' 
import Spinner from '../layout/Spinner';
import {CSVLink} from "react-csv"
import {HiDownload} from 'react-icons/hi'
import { OutlinedButton } from '../../buttons/BasicButton';
import Loader from '../users/Loader';
import { BiFilterAlt } from 'react-icons/bi';
import RowNumberSelector from '../../buttons/RowNumberSelector';
import elevyService from '../../../services/elevy.services';
import PageHeader from '../../header/PageHeader';

function ElevyTransactions(){
    useFetchElevy()
    const navigate=useNavigate()
    const {records,loading} = useSelector(elevySelector)
    const dispatch = useDispatch()
    const[startDate,setStartDate]=useState('')
    const[endDate,setEndDate]=useState('')


    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)

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
    
const goTo = (data:any) => {
   dispatch(setTransactions(data));
   navigate('/e-levy/transactions')
}


const periodFilter=async()=>{
   try{
    const data={
        startDate,
        endDate
    }
    const res = await elevyService.filterElevyPeriod(data)
    if(!res?.success)return res.message
    dispatch(setRecords(res?.data))
   }catch(err){}
}


const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

//Get Current Rows
const indexofLastRow:number = currentIndex*rowsPerPage;
const indexofFirstRow:number = indexofLastRow - rowsPerPage; 
const currentRows = records.slice(indexofFirstRow,indexofLastRow)

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
        <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
         <motion.div 
            initial="initial"
            animate="animate"
            exit="exit"
            variants={group1Motion}>
           <PageHeader title="Elevy Records"/>      
       
        {/**date picker */}
      <div className="flex items-center justify-between px-2">
          {/**date picker */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="date" 
                className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='Start date'
                onChange={(date:any)=>setStartDate(date.target.value)}
                value={startDate}/>
           </div>
           <span className="mx-4 text-gray-500">to</span>
           <div className="relative">
           <input type="date" 
                className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='End date'
                onChange={(date:any)=>setEndDate(date.target.value)}
                value={endDate}/>   
            </div>

              {/**filter btn */}
              <OutlinedButton 
                value={loading? <Loader/> : 'Filter'}
                action={()=>periodFilter()}
                color="gray"
                icon={<BiFilterAlt/>}
                />
            </div>
            {/**end date */}

        {/**csv btn */}
        <div>
            <CSVLink 
                headers = {headers}
                data = {records}
                filename={'elevyrecords.csv'}
                className='py-2 px-1 bg-green-500  text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150 hover:bg-green-700 tracking-wide font-inter inline-flex items-center space-x-2'>
                   <HiDownload/>
                    Download CSV
            </CSVLink>
        </div>
     </div>
     {/**end date */}

{/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
            <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
            </div>
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
                           loading ?
                           <Spinner/>
                           :
                           <ElevyTransactionsTable data={currentRows} goTo={goTo}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col  items-center justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < records.length ? (currentIndex * rowsPerPage): records.length}</span> of <span>{records.length}</span>{' '}records
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
