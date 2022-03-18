import React,{ChangeEvent,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { merchantsSelector, setMerchants } from '../../../state/merchant.state';
import MerchantsService from '../../../services/merchant.service'

import MerchantDetailsTable from '../../tables/MerchantsDetailsTable';
import MerchantsTable from '../../tables/MerchantsTable';
import Spinner from '../layout/Spinner';
import { setSelected } from '../../../state/merchant.state';
import SearchForm from '../../forms/SearchForm';


function Merchants(){

    const dispatch = useDispatch()

    const {loading} = useSelector(merchantsSelector)
    
    const [searchQuery, setSearchQuery] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(loading)
    const [currentIndex, setCurrentIndex] = React.useState(1)
    const [rowsPerPage] = React.useState(10)

    const [merchantCategory, setMerchantCategory] = useState<string>('')

    React.useEffect(()=>{ 

        const response = async()=>{
            try{
                const res = await MerchantsService.getMerchants();
                if(!res.success){
                    throw alert( res.message )
                }
               
                let merchants = res.data.map((t:any) => t)
                dispatch(setMerchants(merchants))
                setIsLoading(loading)
                
            }catch(err:any){
              alert(err.message)
            }
        }

        response();
        },
     [loading,dispatch])

     

    const {merchants} = useSelector(merchantsSelector)
   
    
const merchantCategoryHandler   = (e:ChangeEvent<HTMLSelectElement>) => setMerchantCategory(e.target.value);


//Get Current rows
const indexOfLastRow:number = currentIndex * rowsPerPage;
const indexOfFirstRow:number = indexOfLastRow - rowsPerPage;
const currentRows = merchants.slice(indexOfFirstRow,indexOfLastRow)

//buttonactions
const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
const paginateBack = () => setCurrentIndex(currentIndex - 1)

const handleSelectedId:Function = async (id:string) => {
    try{
        const response =  await MerchantsService.getMerchantDetail(id)
        
        if(!response.success){
            throw alert(response.message)
        }else if(response?.data === null){
            return alert('Merchant details is empty')
        }
        console.log(response)
        return  dispatch(setSelected(response.data))
       
    }catch(err:any){
        alert(err)
    }
}

    return (
        <div className="relative md:pt-28 pb-10  w-full mb-12">
          <div className='mb-20'>
            <h2 className="text-2xl font-semibold leading-tight text-red-800">Merchants</h2>
        </div>
        {/**date picker */}
          <div className="flex items-center">
            <div className="relative">
             <input name="start" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date start" />
             </div>
             <span className="mx-4 text-gray-500">to</span>
             <div className="relative">
             <input name="end" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date end" />
         </div>
        </div>
            <div className='flex flex-wrap -mt-24'>
                <div className="w-full xl:w-5/12 mb-12 xl:mb-0">  
                <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 ">
           <div className="my-2 flex sm:flex-row flex-col mt-0 pt-0">
            <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                        <select
                            className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
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
                        onChange = {merchantCategoryHandler}
                        value = {merchantCategory}
                        className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                        <option>all</option>
                        <option>Approved</option>
                        <option>Pending</option>
                </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value.trim())} placeholder='Search by company name ...'/>
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
                        <thead>
                            <tr>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    date created
                                </th>
                                <th
                                    className={
                                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }
                                >
                                   Company Name
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                >
                                    Category
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                 Submitted
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
                           <MerchantsTable merchants={currentRows} handleSelectedId={handleSelectedId}/>
                       }     
                                            
                        </tbody>
                    </table>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                    <span className="text-xs xs:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{currentIndex * rowsPerPage}</span> of <span>{merchants.length}</span>{' '}Entries
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
        <div className="w-full xl:w-7/12">
            <MerchantDetailsTable/>
        </div>
      </div>
     </div>
    )
}
export default Merchants;