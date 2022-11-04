import React,{useEffect,useState, ChangeEvent} from 'react'
import transactionsService from '../../../services/transactions.service';
import MerchantTransactionsTable from '../../tables/MerchantTransactionsTable'
import MerchantTransationDetailsTable from '../../tables/MerchantTransationDetailsTable';
import SearchForm from '../../forms/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions,setSelected, transactionsSelector } from '../../../state/transactions.state';
import Spinner from '../layout/Spinner';


export default function MerchantTransaction() {

        const dispatch = useDispatch()

        const {loading} = useSelector(transactionsSelector);

        const [searchQuery, setSearchQuery] = useState('')

        const [isLoading, setIsLoading] = useState(false)
        const [currentIndex, setCurrentIndex] = useState(1)
        const [rowsPerPage] = useState(10)

        useEffect(()=>{ 
        
              async function run(){
                  try{
                    const response =  await transactionsService.transactions()
                   
                    if(!response.success){
                        alert(response.message)
                    }

                    let transactions= response.data.map((t:any) => t)
                    dispatch(setTransactions(transactions))

                    setIsLoading(loading)
                  }catch(err:any){
                    alert(err.message)
                  }
              }
              run();
             
         },
         [loading,dispatch])

         const {transactions} = useSelector(transactionsSelector);
         //console.log(transactions)
         
         const filterResults = transactions.filter((tr)=>{
             if(tr.merchantId?.name.toLowerCase().includes(searchQuery)){
                return tr;
             }
         })

    
         const results:any[] = filterResults.length === 0 ? transactions : filterResults
         
        //Get Current rows
        const indexOfLastRow:number = currentIndex * rowsPerPage;
        const indexOfFirstRow:number = indexOfLastRow - rowsPerPage;
        const currentRows = results.slice(indexOfFirstRow,indexOfLastRow) 
        
       
        //button actions
        const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
        const paginateBack = () => setCurrentIndex(currentIndex - 1)

        const handleSelectedId:Function = async (id:string) => {
            try{
                console.log(id);
                const response =  await transactionsService.getMerchantTransaction(id)
                
                if(!response.success){
                    throw Error(response.message)
                }
                
                console.log(response.data)
                return  dispatch(setSelected(response.data))
               
            }catch(err:any){
                alert(err.message)
            }
            
        }
        
        //const {selected} = useSelector(transactionsSelector)
       // console.log(`selected ${selected}`)

    return (
     <div className="relative md:pt-28 pb-10  w-full mb-12">
         <div>
            <h2 className="text-2xl font-semibold leading-tight text-red-800">Merchant Transactions</h2>
        </div>
            <div className='flex flex-wrap'>
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                
                <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
                    {/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                <select
                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
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
                        className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option>All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder='Search by merchant name ...'/>
        </div>
        <div
                className=
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className=
                                "font-semibold text-lg text-blueGray-700 font-sans"

                            >
                                All Merchant Transactions
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    data created
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                    Time
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                >
                                    sender account
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Merchant name
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Tracking Number
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                           isLoading
                            ? 
                           <Spinner/>
                           :
                           <MerchantTransactionsTable transactions={currentRows} handleSelectedId={handleSelectedId}/>  
                       }       
                                                   
                        </tbody>
                    </table>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{currentIndex * rowsPerPage}</span> of <span>{transactions.length}</span>{' '}Entries
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
                        <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
                        onClick = {paginateFront}
                        >
                            Next
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
                </div>
            <div className="w-full xl:w-4/12 px-4">
                 <MerchantTransationDetailsTable/>
             </div>
         </div>
     </div>
    )  
}