import React,{ChangeEvent, useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import PageHeader from '../../header/PageHeader';
import useFetchWallets from '../wallet/UseFetchWallets';
import { reportSelector } from '../../../state/report.state';

export default function DirectDebit() {
    useFetchWallets()
    const {wallets}=useSelector(reportSelector)
    const [isLoading, setIsLoading]=useState(false);
    const [selectType,setSelectType]=useState('')

   const[formData, setFormData]:any=useState({
        customerId : '',
        amount : '',
        description:''
    })

    const handleChange = (event:ChangeEvent<any>)=>{
        setFormData({...formData,[event.target.name]: event.target.value})
      }

    useEffect(()=>{ 
        //loadMerchantsandIssuers()
     },[])
    

    // const loadMerchantsandIssuers=async()=>{
    //      try {
    //          const [merchants,issuers]=await Promise.all(
    //              [
    //                  MerchantsService.getMerchants(),
    //                  AccountsService.getIssuers()
    //              ]
    //          )
    //          if(!merchants.success && !issuers.success){
    //              throw Error(
    //                  'Oops there is a problem loading some of the services'
    //              )
    //          }
    //          dispatch(setMerchants(merchants.data || []));
    //          dispatch(setIssuers(issuers.data || []));
    //      } catch (err:any) {
    //          alert(err.message)
    //      }
    // }


    const pay=async():Promise<void>=>{
        try {
            Object.keys(formData).forEach((key:any)=>{
                if(!formData[key] || formData[key]===''){
                    throw Error(
                        'Please provide all details on the form'
                    )
                }
            })
        }catch(err){}
    }         
         
        
    
    return (
     <div className="relative md:pt-10 pb-10  w-10/12 mb-12 mx-auto">
          
            <PageHeader title="Direct Wallet Debit" />
          
            <div className='flex flex-wrap'>
                <div className="w-full mb-2 px-4">  
                    <div className="relative pb-10 p-2 w-full mb-12 px-4">
                    <div className='relative md:pt-4 pb-10 p-2'>
               <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Debit Wallet Form</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div>
                        <h6 className="text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                            Form Details
                        </h6>
                        <div>
                                <div className="relative mb-3 w-1/3">

                                    {/**radio btns*/}
                                    {
                                     
                                    }

                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        SELECT {selectType}
                                    </label>
                                    <select
                                        className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="customerId"
                                        value={formData.customerId}
                                        onChange = {handleChange}
                                        placeholder="select merchant"
                                    >
                                        {
                                            wallets.map((cus:any,i:number)=><option key={i} value={cus?._id}>{cus?.merchantId?.merchant_tradeName||cus?.customerId?.fullname}</option>)
                                        }
                                    </select>
                                </div>
                            <div className="relative mb-3 w-1/3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Amount
                                    </label>
                                    <input    
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountType"
                                        value={formData.amount}
                                        onChange = {handleChange}
                                     />
                            </div>
                            <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        className="
                                        mx-auto
                                        form-control
                                        block
                                        w-full
                                        h-22
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                        "
                                        id="exampleFormControlTextarea1"
                                        rows={3}
                                        placeholder="Your message"
                                        name="description"
                                        value={formData.description}
                                        onChange = {handleChange}
                                        >
                                    </textarea>
                            </div> 
                        </div>  
                    </div>            
                </div>
                <button disabled={isLoading} onClick={pay} className='w-8/12 mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800'>
                     Submit for Approval
                </button>
             </div>
    </div>               
                    </div>
                </div>
            </div>
     </div>
    )  
}
