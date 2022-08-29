import React,{useState,ChangeEvent} from "react";
import authService from "../../../services/auth.service";
import PageHeader from "../../header/PageHeader";
import {alertResponse} from '../../../components/sweetalert/SweetAlert'
import useFetchRoles from "../roles/useFetchRoles";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/auth.state";

interface adminFormType{
    "email": string;
    "name": string;
    "_role": string;
}

export default function CreateMerchantForm() {
    useFetchRoles()
    const {roles,loading}=useSelector(authSelector)
    console.log(roles)
    const [isLoading,setLoading]=useState(false);
    const [formData,setFormData]=useState<adminFormType>({
        "email": "",
        "name": "",
        "_role":""
    })
   
    const handleChange = (event:ChangeEvent<any>)=>{
        setFormData({...formData,[event.target.name]: event.target.value})
      }
    
    const submit=async()=>{
      try{
        setLoading(true)
        const {...data}= formData;
        const res=await authService.addAdmin(data)
        if(!res.success){
          setLoading(false)
          return await alertResponse(
            {
                 icon:res.success?'success':'error',
                 response:res.success?res.message:'Invalid form data. Please provide the required data'     
            }) 
        }
        alert(res.message);
        return setFormData({
            email:'',
            name:'',
            _role:'',
        })
      }catch(err:any){
        setLoading(false)
        alertResponse(
            {
             icon:'info',
             response:'Please retry'    
          })
      }
    } 

    return (
        <div className='relative md:pt-10 pb-10 p-2 '>
            <PageHeader title="New Administrator Form"/>
            <div className="relative flex flex-col min-w-0 break-words w-full md:w-2/3 mx-auto mb-6 shadow-lg rounded-lg bg-gray-100 border-0 justify-center">
                <div className="rounded bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">New Admin Form</h6>
                        
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div>
                        <h6 className="text-gray-500 text-sm mt-2 mb-6 font-bold uppercase">
                            User Details
                        </h6>
                        <div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left">
                                       Email
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        onChange={handleChange}
                                        value={formData.email}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                </div>
                            </div>
                            <div className="w-full  px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-semibold mb-2 text-left"
                                        htmlFor="grid-password"
                                    >
                                        Role
                                    </label>
                                    <select
                                        name="_role"
                                        value={formData._role}
                                        onChange={handleChange}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                        <option value="">Select</option>
                                        {roles.map(role=><option className="rounded py-4 px-4" value={role._id}>{role.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <button 
                                className='w-full uppercase font-bold text-sm float-right mt-5 mb-4  bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800'
                                onClick={submit}
                                >
                                {isLoading? 'Registering Administrator ...':'Register Administrator'}
                            </button>
                        </div> 
                            
                    </div>   
                          
                </div>
                
             </div>
    </div>               
    );
}