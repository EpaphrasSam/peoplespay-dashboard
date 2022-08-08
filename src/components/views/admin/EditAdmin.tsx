import React,{useState,ChangeEvent} from "react";
import authService from "../../../services/auth.service";
import PageHeader from "../../header/PageHeader";
import {alertResponse} from '../../sweetalert/SweetAlert'
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/auth.state";
import useFetchRoles from "../roles/useFetchRoles";
import { useNavigate } from "react-router-dom";

interface adminFormType{
    "email": string;
    "name": string;
    "_role": string;
}

export default function EditAdmin() {
    const navigate=useNavigate();
    const {selectedAdmin}=useSelector(authSelector)
    useFetchRoles()
    const {roles}=useSelector(authSelector)
    const [isLoading,setLoading]=useState(false);
    const [formData,setFormData]=useState<adminFormType>({
        "email": selectedAdmin?.email??'',
        "name": selectedAdmin?.name??'',
        "_role":selectedAdmin?._role?._id??''
    })
   
    const handleChange = (event:ChangeEvent<any>)=>{
        setFormData({...formData,[event.target.name]: event.target.value})
      }
    
    const submit=async()=>{
      try{
        setLoading(true)
        const res=await authService.update({
            id:selectedAdmin._id,
            data:{
                _role:formData._role
            }
        })
          setLoading(false)
          alertResponse(
            {
                 icon:res.success?'success':'error',
                 response:res.success?res.message:'Invalid form data. Please provide the required data'     
            }) 
         setFormData({
            email:'',
            name: '',
            _role:'',
        })
       return navigate('/all-admins')
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
            <PageHeader title="Edit Administrator"/>
            <div className="relative flex flex-col min-w-0 break-words w-full md:w-2/3 mx-auto mb-6 shadow-lg rounded-lg bg-gray-100 border-0 justify-center">
                <div className="rounded bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">New Admin Form</h6>
                        <button
                            className="bg-red-800 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Admin
                        </button>
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
                                        disabled
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                       //onChange={handleChange}
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
                                        disabled
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
                                        <option>Select</option>
                                        {roles.map(role=><option className="rounded py-4 px-4" value={role._id}>{role.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <button 
                                className='w-full uppercase font-bold text-sm float-right mt-5 mb-4  bg-red-700 leading-tight text-white py-3 px-6 rounded hover:bg-red-900 hover:ring-2 hover:ring-red-800'
                                onClick={submit}
                                >
                                {isLoading? 'Updating Profile ...':'Update Profile'}
                            </button>
                        </div> 
                            
                    </div>   
                          
                </div>
                
             </div>
    </div>               
    );
}