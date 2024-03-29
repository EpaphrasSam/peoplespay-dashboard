import React,{ChangeEvent, useEffect,useState} from 'react'
import { setMerchants } from '../../../state/merchant.state';
import { useDispatch, useSelector } from 'react-redux';
import MerchantsService from '../../../services/merchant.service'
import AccountsService from '../../../services/accounts.service';
import { setIssuers } from '../../../state/account.state';
import Swal from 'sweetalert2';
import PageHeader from '../../header/PageHeader';
import { alertResponse, confirmAlert } from '../../sweetalert/SweetAlert';


export default function Users() {

    const dispatch = useDispatch()
    const [isNecLoading, setIsNecLoading]=useState(false);
    const [loading,setLoading]=useState(false);
     const {issuers}=useSelector((state:any)=>state.accounts);

   

    const[formData, setFormData]:any=useState({
        accountType : '',
        accountIssuer : '',
        accountNumber : '',
        accountName : '',
        description : '',
        amount:''
    })


    useEffect(()=>{ 
        loadMerchantsandIssuers()
     },[])


    const onIssuer=(event:ChangeEvent<any>):void=>{
        try {
           
            const id:string=event.target.value;
            const _details:any=issuers.find((iss:any)=>iss.id===id);
            setFormData(
                {
                    ...formData,
                    accountIssuer:_details['id'],
                }
            )
            
        } catch (err:any) {
           alert(err.message) 
           setIsNecLoading(false)
        }
    }

    const verifyNumberDetails = async() => {
        try {
            setIsNecLoading(true)
            const {accountNumber,accountIssuer}=formData;
        const res = await AccountsService.nec(
            {
            "account_number": accountNumber,
            "account_issuer": accountIssuer,
            "account_type":"bank"
        }
        )
        if(!res.success){
          setIsNecLoading(false)
          return alert(res.message)
        }
        setIsNecLoading(false)
        setFormData({
            ...formData,
            accountName : res?.data
        })
        } catch (error) { 
        setIsNecLoading(false)   
        }
        
    }

    const handleChange = (event:ChangeEvent<any>)=>{
      setFormData({...formData,[event.target.name]: event.target.value})
    }

     const loadMerchantsandIssuers=async()=>{
         try {
             const issuers = await AccountsService.getIssuers()
                
             if(!issuers.success){
                 throw Error(
                     'Oops there is a problem loading some of the services'
                 )
             }
             dispatch(setIssuers(issuers.data || []));
         } catch (err:any) {
             alert(err.message)
         }
    }


    const submit=async():Promise<void>=>{
        try {
            setLoading(true)
            Object.keys(formData).forEach((key:any)=>{
                if(!formData[key] || formData[key]===''){
                    throw new Error(
                        'Please provide all details on the form'
                    )
                }
            })
            confirmAlert({
                text:"This will will initiaite a direct payout",
                confirmButtonText:'Yes, proceed'
            }).then(async(result)=>{
                if(result.isConfirmed){
                  const res=await AccountsService.initiatePayout(formData);
                  await alertResponse({
                    icon:res.success?'success':'error',
                    response:res.message
                  })
                  setLoading(false)
                  return  setFormData({
                    accountType : '',
                    accountIssuer : '',
                    accountNumber : '',
                    accountName : '',
                    description : '',
                    amount:''
                })
                }else{ 
                    setLoading(false)
                    throw new Error('You cancelled the process')
                }
            })  
        } catch (err:any) {
            setLoading(false);
            alertResponse({
                icon:'info',
                response:err.message
            })
        }
    }


    return (
     <div className="relative md:pt-10 pb-10  w-full mb-12">
          
           <PageHeader title="Initiate Payout" />
          
            <div className='flex flex-wrap'>
                <div className="w-full mb-2 px-4">  
                    <div className="relative pb-10 p-2 w-full mb-12 px-4">
                    <div className='relative md:pt-4 pb-10 p-2'>
               <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">DIRECT PAYOUT FORM</h6>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div>
                        <h6 className="text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                            Form Details
                        </h6>
                        <div>
                            <div className="flex w-full space-x-10">
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account type
                                    </label>
                                    <select    
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountType"
                                        value={formData.accountType}
                                        onChange = {handleChange}
                                   >
                                       <option defaultValue="">choose type</option>
                                       <option value="momo">momo</option>
                                       <option value="bank">bank</option>
                                   </select>
                                </div>
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Issuer
                                    </label>
                                    <select
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountIssuer"
                                        value={formData.accountIssuer}
                                        onChange = {onIssuer}
                                    >
                                     {
                                        issuers.map((issuer:any,i:number)=><option key={i} value={issuer?.id}>{issuer.name}</option>)
                                     }
                                    </select>
                                </div>
                            </div>
                            
                            

                            <div className="flex w-full space-x-10">
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange = {handleChange}
                                    />
                                    <button className='mt-2 w-full bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'  onClick={verifyNumberDetails}>
                                        {isNecLoading?'verifying...':'verify'} 
                                    </button>
                                </div>
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Enter Amount
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="amount"
                                        value={formData.amount}
                                        onChange = {handleChange}
                                    />
                                </div>

                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        disabled={true}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountName"
                                        value={formData.accountName}
                                        onChange = {handleChange}
                                    />
                                </div> 
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
                <button onClick={submit} className='w-8/12 mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800'>
                     {loading?'Submitting...':'Submit for Approval'}
                </button>
             </div>
    </div>               
                    </div>
                </div>
            </div>
     </div>
    )  
}
