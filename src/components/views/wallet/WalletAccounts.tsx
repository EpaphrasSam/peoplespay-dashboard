import React,{useEffect, useState, ChangeEvent} from 'react'
import WalletAccounts from '../../tables/WalletsTable';
import {reportSelector, setWalletAccounts} from '../../../state/report.state'
import {useDispatch, useSelector} from 'react-redux';
import ReportService from '../../../services/reports.service'
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';

function Wallets(){
   
    const dispatch = useDispatch()
   
    const {loading} = useSelector(reportSelector);

    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(loading)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [category,setCategory] = useState('merchant')

    useEffect(()=>{ 
        const loadWallets = async()=>{
             try{
                const res =  await ReportService.getWallets();
                
                if(!res.success){
                    throw alert(res.message);
                }
             const wallets = res.data.map((w:any)=>w);
             console.log(wallets);
             dispatch(setWalletAccounts(wallets))
             setIsLoading(loading);
             }catch(err:any){
                alert(err.message)
             }
        }
        loadWallets();
     },
     [loading])

     const {wallets} = useSelector(reportSelector)
     
     const filterResults = wallets.filter((cus)=>{
        switch(category){
            case "merchant":
              const hasSearchResults:boolean = cus?.merchantId?.merchant_tradeName.toLowerCase().includes(searchQuery)
              if(hasSearchResults) return cus;
              break;
            case "customer":
                const hasSearchResults2:boolean = cus?.customerId?.fullname.toLowerCase().includes(searchQuery)
                if(hasSearchResults2) return cus;  
                break;
            default:
                return cus;
            }
        }
     )

     const results:any[] = filterResults.length === 0 ? wallets : filterResults
     
     //Get Current rows
    const indexOfLastRow:number = currentIndex * rowsPerPage;
    const indexOfFirstRow:number = indexOfLastRow - rowsPerPage;
    const currentRows = results.slice(indexOfFirstRow,indexOfLastRow)
    
    //buttonactions
   const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
   const paginateBack = () => setCurrentIndex(currentIndex - 1)

   const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

    return(
        <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
        <div>
            <h2 className="text-2xl font-semibold leading-tight text-red-800">Wallets</h2>
        </div>

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
                        onChange = {(e:ChangeEvent<HTMLSelectElement>)=>setCategory(e.target.value)}
                        value = {category}
                        className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option value="merchant">merchants</option>
                        <option value="customer">customers</option>
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder={`Search ${category} name ...`}/>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Wallet ID
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Customer ID
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total Balance
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actual Balance
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date Updated
                            </th>   
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Active
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       {
                           isLoading
                            ? 
                           <Spinner/>
                           :
                           <WalletAccounts wallets={currentRows}/>
                       }       
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{currentIndex * rowsPerPage}</span> of <span>{wallets.length}</span>{' '}Entries
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
    )
}
export default Wallets;


