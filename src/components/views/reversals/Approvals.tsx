import {useEffect, useState, ChangeEvent} from 'react'
import PendingReversalsTable from '../../tables/PendingSettlementsTable'
import {useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import RowNumberSelector from '../../buttons/RowNumberSelector';
import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import { OutlinedButton } from '../../buttons/BasicButton';
import { BiFilterAlt } from 'react-icons/bi';
import PageHeader from '../../header/PageHeader';

function PendingReversals(){
    //const {} = useSelector(accountsSelector)
    const pendingReversals=[]
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [transactionCategory, setTransactionCategory] = useState<string>('')
    const [startDate,setStartDate]=useState('')
    const [endDate,setEndDate]=useState('')
   
   



const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

const transactionCategoryHandler   = (e:ChangeEvent<HTMLSelectElement>) => setTransactionCategory(e.target.value);
 
 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

    return(
        <div className="font-segoe relative md:pt-7 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}
           <PageHeader title="Pending Reversals"/>   
        {/**date picker */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input type="date" 
                className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm focus:ring-blue-500 focus:border-blue-500'
                placeholder='End date'
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
        value={'Filter'}
        action={()=>{}}
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
                <ValueFilterSelector setFilter={transactionCategoryHandler} value={transactionCategory} options={['name']}/>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder='Search merchant name ...'/>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Merchant Id
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Start Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                End Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Acc_Number
                            </th>
                             <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Acc_Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Acc_Issuer
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Acc_Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Amount
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-semibold tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-md">
                       {/* {
                           isLoading ?
                           <Spinner/>
                           :
                           <PendingReversalsTable data={pendingReversals} approve={()=>{}} loading={false}/>
                       } */}
                       No pending reversals
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col items-center md:justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < pendingReversals.length ? (currentIndex * rowsPerPage): pendingReversals.length}</span> of <span>{pendingReversals.length}</span>{' '}Settlements
                    </div> 
                    <div className="inline-flex mt-2 md:mt-0">
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
                            currentIndex * rowsPerPage === pendingReversals.length ? 
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
     </div>
    )
}
export default PendingReversals;
