import React,{ChangeEvent,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { merchantsSelector} from '../../../state/merchant.state';
import MerchantsService from '../../../services/merchant.service'
import MerchantDetailsTable from '../../tables/MerchantsDetailsTable';
import MerchantsTable from '../../tables/MerchantsTable';
import Spinner from '../layout/Spinner';
import { setSelected } from '../../../state/merchant.state';
import SearchForm from '../../forms/SearchForm';
import RowNumberSelector from '../../buttons/RowNumberSelector';
//import ValueFilterSelector from '../../buttons/ValueFilterSelector';
import PageHeader from '../../header/PageHeader';
import useFetchMerchants from './useFetchMerchants';
import { OutlinedButton } from '../../buttons/BasicButton';
import Loader from '../users/Loader';
import { BiFilterAlt } from 'react-icons/bi';
import { CSVLink } from 'react-csv';
import { HiDownload } from 'react-icons/hi';
import Pagination from '../../pagination/Pagination';


function Merchants(){
    useFetchMerchants()
    const {merchants,loading} = useSelector(merchantsSelector)
    const dispatch=useDispatch()
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>()
    const [searchQuery, setSearchQuery] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [rowsPerPage,setRowsPerPage] = React.useState(10)
    
    const [merchantCategory, setMerchantCategory] = useState<string>('')
   
    const filterResults = merchants.filter((mr)=>{
        switch(merchantCategory){
        case "name":
          const hasSearchResults:boolean = mr?.merchant_tradeName?.toLowerCase().startsWith(searchQuery.toLowerCase())
          if(hasSearchResults) return mr;
          break;
        case "category":
            const hasSearchResults2:boolean = mr?.lineOfBusiness?.toLowerCase().startsWith(searchQuery.toLowerCase())
            if(hasSearchResults2) return mr;  
            break;
        default:
            return mr;
        }   
    })

const merchantCategoryHandler   = (e:ChangeEvent<HTMLSelectElement>) => setMerchantCategory(e.target.value);

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

const results:any[] = filterResults.length === 0 ? merchants : filterResults

const firstPageIndex=(currentPage-1)*rowsPerPage;
const lastPageIndex = firstPageIndex+rowsPerPage;
const currentTableData= results?.slice(firstPageIndex,lastPageIndex)


const handleSelectedId:Function = async (id:string) => {
    try{
        const response =  await MerchantsService.getMerchantDetail(id)
        
        if(!response.success){
            throw alert(response.message)
        }else if(response?.data === null){
            return alert('Merchant details is empty')
        }
        return  dispatch(setSelected(response.data))
       
    }catch(err:any){
        alert(err)
    }
}

 const unapprovedMerchants=merchants.filter((m=>m.submitted&&!m.active))

 const headers = [
    { label: "MERCHANT ID", key: "_id" },
    { label: "TRADENAME", key: "merchant_tradeName"},
    { label: "EMAIL", key: "email" },
    { label: "REGISTRATION NUMBER", key: "registrationNumber" },
    { label: "LINE OF BUSINESS", key: "lineOfBusiness" },
    { label: "LOCATION", key: "location"},
    { label: "PHONE", key: "phone" },
  ]

    return (
        <div className="relative md:pt-10 pb-10  w-full mb-12">
         <PageHeader title='Merchants Onboarding'/>

        {/**date picker */}
          <div className="flex items-center space-x-2">
                <div>
                <input type="date" 
                    className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm fo focu'
                    placeholder='Start date'
                    onChange={(date:any)=>setStartDate(date.target.value)}
                    value={startDate}/>
                </div>
                <div>
                <input type="date" 
                        className='rounded bg-white border border-gray-400 text-gray-700 sm:text-sm fo focu'
                        placeholder='End date'
                        onChange={(date:any)=>setEndDate(date.target.value)}
                        value={endDate}/>  
                </div>
                {/**filter btn */}
              <OutlinedButton 
                value={loading? <Loader/> : 'Filter'}
                action={()=>{}}
                color="gray"
                icon={<BiFilterAlt/>}
                />
          </div>
            <div className='flex flex-wrap -mt-24'>
                <div className="w-full sm:w-6/12 mb-12 md:mb-0">  
                <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 ">
           <div className="my-2 flex sm:flex-row flex-col mt-0 pt-0 space-x-2 items-center">
            <div className="flex flex-row mb-1 sm:mb-0 items-center">
                <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
                <div className="relative">
                    <select
                            onChange = {merchantCategoryHandler}
                            value = {merchantCategory}
                            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focu">
                            <option>column search</option>
                            <option value="name">comp name</option>
                            <option value="category">comp category</option>
                    </select>
                </div>
                <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder={`Search by ${merchantCategory}`}/>
            </div>
            <div>
                <CSVLink 
                    headers = {headers}
                    data = {unapprovedMerchants}
                    filename={'onboarding-merchants.csv'}
                    className='py-2 px-2 text-white rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-15 bg-green-500 tracking-wide font-inter inline-flex items-center space-x-1'>
                        <HiDownload/>
                        <span>{ 'Download'}</span>
                </CSVLink>
            </div>
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
                                "font-semibold text-lg text-blueGray-700"

                            >
                                All Merchants
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="text-xs text-gray-600">
                            <tr>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left"
                                >
                                    Date created
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left"
                                    }
                                >
                                   Company Name
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left"
                                >
                                 Submitted
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left "
                                >
                                 Status
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3  border-l-0 border-r-0 whitespace-nowrap text-left"
                                >
                                 Declined
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-xs">
                            {
                            loading
                                ? 
                            <Spinner/>
                            :
                            <MerchantsTable merchants={currentTableData} handleSelectedId={handleSelectedId}/>
                            }                        
                        </tbody>
                    </table>
                    {/** Pagination */}
                    <div className='my-7'>
                        <Pagination 
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={merchants?.length}
                            pageSize={rowsPerPage}
                            onPageChange={(page: React.SetStateAction<number>) => setCurrentPage(page)}/>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div className="w-full sm:w-6/12">
            <MerchantDetailsTable/>
        </div>
      </div>
     </div>
    )
}
export default Merchants;