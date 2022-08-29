import React,{ChangeEvent, useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddRoleForm from '../../forms/AddRoleForm';
import RoleStateForm from '../../forms/RoleStateForm';
import AccessTable from '../../tables/AccessTable';
import authService from '../../../services/auth.service';
import { alertResponse } from '../../sweetalert/SweetAlert';
import {permissionIds} from '../../../utils/permissionIds'

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
    const [isSelectedAll,setIsSelectedAll]=useState(false)
    const [loading,setLoading]=useState(false);

    const checkedList = useRef(new Array())

    

   useEffect(()=>{
      accessArray.filter(obj=>{
         if(obj?.permissions?.length<1){
          let newArray = accessArray.filter(objs=>objs.title!==obj.title)
          setAccessArray(newArray)
         }
      })
   },[accessArray])
  
   const handleSelectAll=(e:any)=>{
      checkedList.current=permissionIds
      setIsSelectedAll(true)
      // const {checked}=e.target
      // if(checked===false){
      //    checkedList.current=permissionIds
      //    return setIsSelectedAll(true)
      // }else{
      //    checkedList.current=[];
      // }  
   }
  
    
 

    const handleChange=(e:ChangeEvent<any>)=>{
      setFormData({...formData,[e?.target.name]:e?.target.value})
    }
    

    const accessClick=(e:any)=>{
      const isExist:boolean=accessArray.some(obj=>obj.title===e.target.name)
       if(isExist){
         let newArray = accessArray.filter(obj=>obj.title!==e.target.name)

         checkedList.current.filter(ids=>(ids===`${e.target.id}r`)||(ids===`${e.target.id}w`)||(ids===`${e.target.id}d`)).forEach((id=>checkedList.current.splice(checkedList.current.indexOf(id),1)))
         
         return setAccessArray(newArray)
        }else {
          setAccessArray([...accessArray,{
            title:e.target.name,
            path:e.target.value,
            permissions:['read','write','delete']
         }])

         permissionIds.filter(ids=>{
            if((ids===`${e.target.id}r`)||(ids===`${e.target.id}w`)||(ids===`${e.target.id}d`)){
               checkedList.current.push(ids)
            }
         })
       }
     }


    const permissionClick=(e:any)=>{
       setAccessArray(
        accessArray?.map(obj=>{
          if(obj?.title===e.target.name){
             const isExist=obj.permissions.includes(e.target.value);
             if(isExist){
               checkedList.current=checkedList.current.filter(id=>id!==e.target.id)
               return{
                  ...obj,
                  permissions:obj.permissions.filter((p:string)=>p!==e.target.value),
               }
              }else{
               checkedList.current.push(e.target.id) 
               return{...obj,permissions:[...obj.permissions,e.target.value]}
            }
             }else return obj;
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
   
    const clearAllAccess=()=>{
      checkedList.current=[]
      setAccessArray([])
  };

    return(
        <div className='relative md:pt-10 pb-10 p-2'>
            <h1 className='text-center text-lg mb-4'>New Role</h1>
            <div className="flex flex-col md:flex-row space-x-5">
                <div className="w-full md:w-1/3 mb-6">
                   <AddRoleForm {...formData} onChange={handleChange}/>
                </div>
                <div className="w-full md:w-2/3 mb-6">
                   <RoleStateForm {...formData} access={accessArray} onSubmit={addRole} onClear={clearAllAccess} loading={loading}/>
                </div>
            </div>
            <div className="w-full">
                <AccessTable accessClick={(e:any)=>accessClick(e)} permissionClick={(e:any)=>permissionClick(e)} checkedList={checkedList.current} handleSelectAll={(e:any)=>handleSelectAll(e)} isSelectedAll={isSelectedAll} />
            </div>
       </div>
    )
}
export default AddRole;


