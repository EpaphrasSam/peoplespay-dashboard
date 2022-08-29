import React,{useState,ChangeEvent} from 'react'
import MerchantAppsTable from '../../tables/MerchantAppsTable';
import { merchantsSelector } from '../../../state/merchant.state';
import {useSelector} from 'react-redux';
import merchantsService from '../../../services/merchant.service'
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import RowNumberSelector from '../../buttons/RowNumberSelector';
import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import PageHeader from '../../header/PageHeader';
import { alertResponse, confirmAlert } from '../../sweetalert/SweetAlert';
import { useNavigate } from 'react-router-dom';


function MerchantApps(){
    
    const {loading,apps,merchantName} = useSelector(merchantsSelector)

    const navigate=useNavigate()

    const [searchQuery, setSearchQuery] = useState('')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    const [category,setCategory] = useState('merchant')

    //const[trueString,setTrueString]=useState(false)
     

     const toggleDisbursement=(id:string)=>{
        try{
            confirmAlert({
               text:'This will toggle the current disbursement status',
               confirmButtonText:'Yes, toggle'
            }).then(async(result)=>{
                if(result.isConfirmed){
                    const res=await merchantsService.toggleDisbursement(id)
                    await alertResponse({
                        icon:res?.success?'success':'error',
                        response:res.message
                     })
                    navigate('/configurations/merchants')
                }
            })
         }catch(err){}
       }
     
    //  const filterResults = merchants.filter((cus)=>{
    //     switch(category){
    //         case "merchant":
    //           const hasSearchResults:boolean = cus?.merchantId?.merchant_tradeName?.toLowerCase().includes(searchQuery?.toLowerCase())
    //           if(hasSearchResults) return cus;
    //           break;
    //         default:
    //             return cus;
    //         }
    //     }
    //  )

    //const results:any[] = filterResults.length === 0 ? merchants : filterResults
     
     //Get Current rows
    const indexOfLastRow:number = currentIndex * rowsPerPage;
    const indexOfFirstRow:number = indexOfLastRow - rowsPerPage;
    const currentRows = apps.slice(indexOfFirstRow,indexOfLastRow)
    
    //buttonactions
    const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
    const paginateBack = () => setCurrentIndex(currentIndex - 1)

    const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

    return(
        <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4 font-segoe">
            <PageHeader title={`${merchantName} Apps`}/>
        {/**filters */}
        <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
                <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
                <ValueFilterSelector setFilter={setCategory} value={category} options={['name']}/>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder={`Search ${category} name ...`}/>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               CreatedAt
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               App Name
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               Momo Charge
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               Card Charge
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               Disbursement Charge
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
                               Disbursement Pool
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold  tracking-wider">
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
                           <MerchantAppsTable apps={currentRows} toggleDisbursement={toggleDisbursement}/>
                       }       
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col sm:flex-row items-center sm:justify-between">
                    <span className="text-sm sm:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{currentIndex * rowsPerPage}</span> of <span>{apps.length}</span>{' '}Entries
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
export default MerchantApps;


