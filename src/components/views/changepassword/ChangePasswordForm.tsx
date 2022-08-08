import { ChangeEvent, useState } from "react"
import authService from "../../../services/auth.service"
import {useNavigate} from 'react-router-dom'

const Swal = require('sweetalert2')

function ChangePasswordForm(){
    let navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[formData,setFormData]=useState({
        oldP :"",
        newP : ""
    })

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{setFormData({...formData,[e.target.name]:e.target.value})}
   
    const onSubmit = async(e:any)=>{
        e.preventDefault()
       try{
        setLoading(true);
        const {...data}=formData;
        const res = await authService.changePassword(data)
        setLoading(false)
        await Swal.fire({
                position: 'top-end',
                icon: res.success?'success':'error',
                text: res.message,
                showConfirmButton: false,
                timer: 1500
            })
         if(res.success){
            window.localStorage.clear();
            return navigate('/login')
        } 
       }catch(err:any){
        setLoading(false)
        alert(err.message)}
     }
    
   return(
    <>
        <h1 className="text-black mt-6 font-inter">Change Password</h1>
        <div className="w-1/3 border border-gray-200 mx-auto mt-10 px-5 py-5 font-inter">
            <div>
                  <label className="text-left block mt-4 text-sm">Old Password</label>
                  <input
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="Old password"
                    type="password"
                    name="oldP"
                    value={formData.oldP}
                    onChange={handleChange}
                  />
             </div>
             <div className="font-segoe">
                  <label className="text-left block mt-4 text-sm">New Password</label>
                  <input
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue- placeholder:text-gray-200"
                    placeholder="New password"
                    type="password"
                    name="newP"
                    value={formData.newP}
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={(e)=>onSubmit(e)}
                  className="block w-full px-4 py-2 mt-4 text-lg leading-5 text-center text-white transition-colors duration-150 bg-pink border border-transparent rounded active:bg-red-600 focus:outline-none"
                  type="submit"
                >
                  {loading ? 'Submitting...':'Submit'}
                </button>
        </div>
    </>
   )
}
export default ChangePasswordForm;