import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { merchantsSelector, setCategories } from '../../../state/merchant.state';
import MerchantService from '../../../services/merchant.service';


import MerchantCategoryTable from '../../tables/MerchantCategoriesTable';
import Spinner from '../layout/Spinner'


export default function MerchantCategories() {

    const dispatch = useDispatch()
   
    const {loading} = useSelector(merchantsSelector);
  
    const [isLoading, setIsLoading] = useState(loading)

    useEffect(()=>{ 
        
        async function run(){
         try{
            const response =  await MerchantService.getCategories().then(res=> res.data).catch(err=> {throw Error(err)})
            console.log(response)
    
                    let categories = response.map((c:any) => c)
                     dispatch(setCategories(categories))
                     setIsLoading(loading)
            
         }catch(err){
            alert(err)
         }
        }
        run() 
     },
     [loading])

     const {categories} = useSelector(merchantsSelector)
     console.log(categories)

    return (
     <div className="relative md:pt-28 pb-10  w-full mb-12">
          <button className='float-right inline-flex items-center py-3 px-7 bg-red-800 text-white font-semibold rounded-full border-b-4 shadow-md'>
           <i className='fas fa-plus mr-2'/>
            Add Category
        </button>
            <div>
            <div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
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
                              Merchant Categories
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
                                    status
                                </th>
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
                                    Category Name
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                                >
                                    Status
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Update
                                </th>
                                <th
                                    className=
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                >
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                           isLoading
                            ? 
                           <Spinner/>
                           :
                           <MerchantCategoryTable categories={categories}/> 
                       }     
                         
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
            </div>
     </div>
    )  
}