import React,{ChangeEvent, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoleForm from '../../forms/AddRoleForm';
import RoleStateForm from '../../forms/RoleStateForm';
import AccessTable from '../../tables/AccessTable';
import authService from '../../../services/auth.service';
import { alertResponse } from '../../sweetalert/SweetAlert';

export type RoleStateParams={
    name:string,
    description:string;
}

 function AddRole(){
    let navigate=useNavigate()
    const [formData,setFormData]=useState<RoleStateParams>({
       name:"",
       description:"",
    })
    
    const [accessArray,setAccessArray]=useState<Array<any>>([])
    const [loading,setLoading]=useState(false);
    
   // const isChecked:any=(e:any)=>{
   //    accessArray.filter(obj=>{
   //       if(obj.title===e.target.name){
   //          const isExist:boolean= obj?.permissions?.includes(e.target.value)
   //          console.log(isExist)
   //          return isExist;
   //       }
   //    })
   // }

    const handleChange=(e:ChangeEvent<any>)=>{
      setFormData({...formData,[e?.target.name]:e?.target.value})
    }
    
    const accessClick=(e:any)=>{
      const isExist:boolean=accessArray.some(obj=>obj.title===e.target.name)
       if(isExist){
         let newArray = accessArray.filter(obj=>obj.title!==e.target.name)
         return setAccessArray(newArray)
        }else {
          setAccessArray([...accessArray,{
            title:e.target.name,
            path:e.target.value,
            permissions:['read','write','delete']
         }])

       }
     }


    const permissionClick=(e:any)=>{
       setAccessArray(
        accessArray?.map(obj=>{
          if(obj?.title===e.target.name){
             const isExist=obj.permissions.includes(e.target.value);
             if(isExist){
               return{
                  ...obj,
                  permissions:obj.permissions.filter((p:string)=>p!==e.target.value)
               }
              }else return {...obj,permissions:[...obj.permissions,e.target.value]}
             }else return e.taget.checked=false;
         }))
      }

      
    const addRole=async()=>{
      try{
         setLoading(true)
         const {name,description}= formData;
         const [..._access]=accessArray;
         const payload={
            name:name,
            description:description,
            access: _access,
         }
         const res = await authService.addRole(payload)
         setLoading(false)
         await alertResponse(
            {
             icon:res.success?'success':'error',
             response:res.success?res.message:'Invalid form data. Please provide the required data'     
          }) 
          if(res.success){
           return navigate('/manage-admins/roles')
          }
      }catch(err:any){
         setLoading(false)
         alertResponse(
            {
             icon:'info',
             response:'Invalid form data. Please provide the required data'   
          }) 
      }
    }


    return(
        <div className='relative md:pt-10 pb-10 p-2'>
            <h1 className='text-center text-lg mb-4'>New Role</h1>
            <div className="flex flex-col md:flex-row space-x-5">
                <div className="w-full md:w-1/3 mb-6">
                   <AddRoleForm {...formData} onChange={handleChange}/>
                </div>
                <div className="w-full md:w-2/3 mb-6">
                   <RoleStateForm {...formData} access={accessArray} onSubmit={addRole} loading={loading}/>
                </div>
            </div>
            <div className="w-full">
                <AccessTable accessClick={(e:any)=>accessClick(e)} permissionClick={(e:any)=>permissionClick(e)}/>
            </div>
       </div>
    )
}
export default AddRole;


