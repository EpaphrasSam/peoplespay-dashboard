import React,{useState, ChangeEvent} from 'react'
import useFetchWallets from './UseFetchWallets';
import WalletAccounts from '../../tables/WalletsTable';
import {reportSelector, setWalletTransactions,setCustomerName} from '../../../state/report.state'
import {useDispatch, useSelector} from 'react-redux';
import ReportService from '../../../services/reports.service'
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import RowNumberSelector from '../../buttons/RowNumberSelector';
import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import PageHeader from '../../header/PageHeader';

function Wallets(){
    useFetchWallets();
    const dispatch = useDispatch()
    
    const {loading,wallets} = useSelector(reportSelector);

    const [searchQuery, setSearchQuery] = useState('')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [category,setCategory] = useState('merchant') 

     const goTo=async(id:string,name:any)=>{
        try{
            const res=await ReportService.getWalletTransactions(id)
            if(res.success){
                dispatch(setWalletTransactions(res.data))
                dispatch(setCustomerName(name))
                window.location.href="/#/wallettransactions"
            }
        }catch(err){}
     }
     
     const filterResults = wallets.filter((cus)=>{
        switch(category){
            case "merchant":
              const hasSearchResults:boolean = cus?.merchantId?.merchant_tradeName?.toLowerCase().startsWith(searchQuery?.toLowerCase())
              if(hasSearchResults) return cus;
              break;
            case "customer":
                const hasSearchResults2:boolean = cus?.customerId?.fullname?.toLowerCase().startsWith(searchQuery?.toLowerCase())
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
        <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
        <PageHeader title="Wallets"/>

       {/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
                <ValueFilterSelector setFilter={setCategory} value={category} options={['merchant','customer']}/>  
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder={`Search ${category} name ...`}/>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg overflow-hidden">
                <table className="min-w-full leading-normal font-segoe">
                    <thead>
                        <tr>
                            {/* <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Wallet ID
                            </th> */}
                            {/* <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Customer ID
                            </th> */}
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Type
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Total Balance
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Last Balance
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Actual Balance
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Charge
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Date Updated
                            </th>   
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                                Action
                            </th>                    
                        </tr>
                    </thead>
                    <tbody>
                       {
                           loading
                            ? 
                           <Spinner/>
                           :
                           <WalletAccounts wallets={currentRows} goTo={goTo}/>
                       }       
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col sm:flex-row items-center sm:justify-between">
                    <span className="text-sm sm:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{currentIndex * rowsPerPage}</span> of <span>{wallets.length}</span>{' '}Entries
                    </span>
                    <div className="inline-flex mt-2 sm:mt-0">
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


