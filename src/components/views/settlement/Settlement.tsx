import React,{ChangeEvent, useEffect,useState} from 'react'
import { merchantsSelector,setMerchants } from '../../../state/merchant.state';
import { useDispatch, useSelector } from 'react-redux';
import MerchantsService from '../../../services/merchant.service'
import AccountsService from '../../../services/accounts.service';
import { issuersSelector,setIssuers } from '../../../state/account.state';
//import SettlementForm from '../../forms/SettlementForm';
import Spinner from '../layout/Spinner';

export default function Users() {

    const dispatch = useDispatch()
    const {loading} = useSelector(merchantsSelector);
    const [isLoading, setIsLoading] = useState(false)

   

    const[formData, setFormData] = useState({
        merchantId : '',
        accountType : '',
        startDate : '',
        endDate : '',
        accountIssuer : '',
        accountIssuerName : '',
        accountNumber : '',
        accountName : '',
        description : ''
    })


    useEffect(()=>{ 
        loadMerchantsandIssuers()
     },[])


    const onIssuer=(event:ChangeEvent<any>):void=>{
        try {
            const id:string=event.target.value;
            const _details:any=SIssuers.find((iss:any)=>iss.id===id);
            setFormData(
                {
                    ...formData,
                    accountIssuer:_details['id'],
                    accountIssuerName:_details['name']
                }
            )
            
        } catch (err:any) {
           alert(err.message) 
        }
    }

    const verifyNumberDetails = async() => {
        try {
            
            const {accountNumber,accountIssuer}=formData;
        const res = await AccountsService.nec(
            {
            "account_number": accountNumber,
            "account_issuer": accountIssuer,
            "account_type":"bank"
        }
        )
        if(!res.success){
          return alert(res.message)
        }
        setFormData({
            ...formData,
            accountName : res?.data
        })
        } catch (error) {
            console.log(error);
            
        }
        
    }

        const handleChange = (event:ChangeEvent<any>)=>{
            setFormData({...formData,[event.target.name]: event.target.value})
            console.log(formData)
        }

        const {
            merchantId, 
            accountType, 
            startDate, 
            endDate, 
            accountIssuerName,
            accountIssuer,
            accountName,
            accountNumber,
            description
            
         } = formData


     const loadMerchantsandIssuers = async() => {
        const response =  await MerchantsService.getMerchants();
        const res = await AccountsService.getIssuers();

        if(!response.success){
            throw alert(response.message)
        }

        if(!res.success){
            throw alert(response.message)
        }
        
        const merchants = response?.data.map((d:any)=> d)
        dispatch(setMerchants(merchants))
        //setIsLoading(loading)
        const issuers = res?.data.map((d:any)=> d)
        dispatch(setIssuers(issuers))

    }

     const {merchants:SMerchants} = useSelector(merchantsSelector)
     const {issuers:SIssuers} = useSelector(issuersSelector)
       console.log(SMerchants)
     
       const merchantsList = SMerchants.map((mer:any,i) => {
           return (
            <option key={i} value={mer?._id}>{mer.merchant_tradeName}</option>
          )
       })

       const IssuersList = SIssuers.map((iss:any,i) => {
        return (
         <option key={i} value={iss.id}>{iss?.name}</option>
       )
    })

   // let IssuerName:string = SIssuers.filter((v:any)=> accountIssuer === v?.name)

       

       




    return (
     <div className="relative md:pt-28 pb-10  w-full mb-12">
          
            <h2 className="text-2xl font-semibold leading-tight text-red-800">Merchant Settlement</h2>
          
            <div className='flex flex-wrap'>
                <div className="w-full mb-2 px-4">  
                    <div className="relative pb-10 p-2 w-full mb-12 px-4">
                    <div className='relative md:pt-28 pb-10 p-2'>
               <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Merchant Settlement Form</h6>
                        <button
                            className="bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            new settlement
                        </button>
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
                                        htmlFor="grid-password"
                                    >
                                        select merchant
                                    </label>
                                    <select
                                        className="border-0 px-3 py-3 placeholder-blueGray-300  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="merchantId"
                                        value="kbkb"
                                        onChange = {handleChange}
                                        placeholder="select merchant"
                                    >
                                    {merchantsList}
                                    </select>
                                </div>

                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account type
                                    </label>
                                    <select    
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountType"
                                        value={accountType}
                                        onChange = {handleChange}
                                   >
                                       <option value="momo">momo</option>
                                       <option value="bank">bank</option>
                                   </select>
                                </div>
                            </div>
                            
                            <div className="flex w-full space-x-10">
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Issuer
                                    </label>
                                    <select
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountIssuer"
                                        value={accountIssuer}
                                        onChange = {onIssuer}
                                    >
                                     {IssuersList}
                                    </select>
                                </div>

                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Issuer Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountIssuerName"
                                        value={accountIssuerName}
                                        disabled={true}
                                    />
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
                                        value={accountNumber}
                                        onChange = {handleChange}
                                    />
                                    <button className='mt-2 w-full bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150'  onClick={verifyNumberDetails}>
                                        verify 
                                    </button>
                                </div>

                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        Account Name
                                    </label>
                                    <input
                                        type="email"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="accountName"
                                        value={accountName}
                                        onChange = {handleChange}
                                    />
                                </div> 
                            </div>
                            <div className="flex w-full space-x-10">
                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        start date
                                    </label>
                                    <input
                                        type="date"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name = "startDate"
                                        value ={startDate}
                                        onChange = {handleChange}
                                    />
                                </div>

                                <div className="relative w-6/12 mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                    >
                                        end date
                                    </label>
                                    <input
                                        type="date"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        name="endDate"
                                        value ={endDate}
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
                                        value={description}
                                        onChange = {handleChange}
                                        >
                                    </textarea>
                            </div> 
                        </div>  
                    </div>            
                </div>
                <button className='w-8/12 mx-auto uppercase font-bold text-sm float-right mb-4 bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800'>
                     Settle Merchant Account
                </button>
             </div>
    </div>               
                    </div>
                </div>
            </div>
     </div>
    )  
}
