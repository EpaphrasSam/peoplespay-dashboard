import React,{ChangeEvent, useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../state/auth.state';
import AddRoleForm from '../../forms/AddRoleForm';
import RoleStateForm from '../../forms/RoleStateForm';
import AccessTable from '../../tables/AccessTable';
import authService from '../../../services/auth.service';
import { alertResponse } from '../../sweetalert/SweetAlert';
import { permissionIds } from '../../../utils/permissionIds';

export type RoleStateParams={
    name:string,
    description:string;
}

 function EditRole(){
    const {role}=useSelector(authSelector)
    let navigate=useNavigate()

    const [formData,setFormData]=useState<RoleStateParams>({
       name:role?.name??'',
       description:role?.description??'',
    })

    
    const [accessArray,setAccessArray]=useState<Array<any>>([])
    const [isSelectedAll,setIsSelectedAll]=useState(false)
    const [loading,setLoading]=useState(false);

    const checkedList = useRef(new Array())
    
    const prePropulate=(_access:any)=>{
      switch(_access.title){
         case 'Index Page':
           _access.permissions.map((p:string)=>{
             switch(p){
               case 'read':
                   checkedList.current.push('1r')
                   break;
              case 'write':
                   checkedList.current.push('1w')
                   break;
              case 'delete':
                   checkedList.current.push('1d')
                   break;
             }
           })
          break;
          case 'New Administrator':
                _access.permissions.map((p:string)=>{
                switch(p){
                   case 'read':
                      checkedList.current.push('2r')
                      break;
                   case 'write':
                      checkedList.current.push('2w')
                      break;
                   case 'delete':
                      checkedList.current.push('2d')
                      break;
                }
                })
                break;
          case 'All Administrators':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('3r')
                        break;
                   case 'write':
                        checkedList.current.push('3w')
                        break;
                   case 'delete':
                        checkedList.current.push('3d')
                        break;
                  }
                })
               break;
          case 'Administrator Roles':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('4r')
                        break;
                   case 'write':
                        checkedList.current.push('4w')
                        break;
                   case 'delete':
                        checkedList.current.push('4d')
                        break;
                  }
                })
               break;
          case 'Charges':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('5r')
                        break;
                   case 'write':
                        checkedList.current.push('5w')
                        break;
                   case 'delete':
                        checkedList.current.push('5d')
                        break;
                  }
                })
               break;
          case 'Approved Merchants':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('6r')
                        break;
                   case 'write':
                        checkedList.current.push('6w')
                        break;
                   case 'delete':
                        checkedList.current.push('6d')
                        break;
                  }
                })
               break;
          case 'Merchants Onboarding':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('15r')
                            break;
                       case 'write':
                            checkedList.current.push('15w')
                            break;
                       case 'delete':
                            checkedList.current.push('15d')
                            break;
                      }
                    })
                   break;
          case 'Add Documents':
               _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('29r')
                            break;
                       case 'write':
                            checkedList.current.push('29w')
                            break;
                       case 'delete':
                            checkedList.current.push('29d')
                            break;
                      }
                    })
                    break;
          case 'Customer Profile':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('7r')
                        break;
                   case 'write':
                        checkedList.current.push('7w')
                        break;
                   case 'delete':
                        checkedList.current.push('7d')
                        break;
                  }
                })
               break;
          case 'Users':
                _access.permissions.map((p:string)=>{
                  switch(p){
                    case 'read':
                        checkedList.current.push('8r')
                        break;
                   case 'write':
                        checkedList.current.push('8w')
                        break;
                   case 'delete':
                        checkedList.current.push('8d')
                        break;
                  }
                })
               break;
         case 'Transactions':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('9r')
                          break;
                     case 'write':
                          checkedList.current.push('9w')
                          break;
                     case 'delete':
                          checkedList.current.push('9d')
                          break;
                    }
                  })
                 break;
         case 'Elevy Records':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('10r')
                          break;
                     case 'write':
                          checkedList.current.push('10w')
                          break;
                     case 'delete':
                          checkedList.current.push('10d')
                          break;
                    }
                  })
                 break;
         case 'Initiate Settlement':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('11r')
                          break;
                     case 'write':
                          checkedList.current.push('11w')
                          break;
                     case 'delete':
                          checkedList.current.push('11d')
                          break;
                    }
                  })
                 break;
         case 'Approvals':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('12r')
                          break;
                     case 'write':
                          checkedList.current.push('12w')
                          break;
                     case 'delete':
                          checkedList.current.push('12d')
                          break;
                    }
                  })
                 break;
         case 'Settlements History':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('13r')
                          break;
                     case 'write':
                          checkedList.current.push('13w')
                          break;
                     case 'delete':
                          checkedList.current.push('13d')
                          break;
                    }
                  })
                 break;
         case 'Approve Reversals':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('19r')
                          break;
                     case 'write':
                          checkedList.current.push('19w')
                          break;
                     case 'delete':
                          checkedList.current.push('19d')
                          break;
                    }
                  })
                 break;
         case 'Direct Debit':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('14r')
                          break;
                     case 'write':
                          checkedList.current.push('14w')
                          break;
                     case 'delete':
                          checkedList.current.push('14d')
                          break;
                    }
                  })
                 break;
            case 'Direct Credit':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('20r')
                          break;
                     case 'write':
                          checkedList.current.push('20w')
                          break;
                     case 'delete':
                          checkedList.current.push('20d')
                          break;
                    }
                  })
                 break;
            case 'All Wallets':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('16r')
                          break;
                     case 'write':
                          checkedList.current.push('16w')
                          break;
                     case 'delete':
                          checkedList.current.push('16d')
                          break;
                    }
                  })
                 break;
            case 'Referrals':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('17r')
                          break;
                     case 'write':
                          checkedList.current.push('17w')
                          break;
                     case 'delete':
                          checkedList.current.push('17d')
                          break;
                    }
                  })
                 break;
            case 'Sms Broadcast':
                  _access.permissions.map((p:string)=>{
                    switch(p){
                      case 'read':
                          checkedList.current.push('18r')
                          break;
                     case 'write':
                          checkedList.current.push('18w')
                          break;
                     case 'delete':
                          checkedList.current.push('18d')
                          break;
                    }
                  })
                 break;
          case 'Payout Initiate':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('21r')
                            break;
                       case 'write':
                            checkedList.current.push('21w')
                            break;
                       case 'delete':
                            checkedList.current.push('21d')
                            break;
                      }
                    })
                   break;     
          case 'Payout Approvals':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('22r')
                            break;
                       case 'write':
                            checkedList.current.push('22w')
                            break;
                       case 'delete':
                            checkedList.current.push('22d')
                            break;
                      }
                    })
                   break;
          case 'Customers Report':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('25r')
                            break;
                      }
                    })
                   break;    
          case 'Sales Report':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('26r')
                            break;
                      }
                    })
                   break;  
          case 'Transactions Report':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('27r')
                            break;
                      }
                    })
                   break; 
          case 'Fraud Report':
                    _access.permissions.map((p:string)=>{
                      switch(p){
                        case 'read':
                            checkedList.current.push('28r')
                            break;
                      }
                    })
                   break; 
             
       }
    }

   useEffect(()=>{
      if (role!==null){
         let access=role?.access?.map((_access:any)=>{
            prePropulate(_access)
            return {
               title:_access.title,
               path:_access.path,
               permissions:_access.permissions
            } 
         })
         setAccessArray(access);
      }
      else return navigate('/manage-admins/roles')
      
   },[role])
   

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

      
    const updateRole=async()=>{
      try{
         setLoading(true)
         const {name,description}= formData;
         const [..._access]=accessArray;
         
         const res = await authService.updateRole({
            id:role?._id,
            data:{
               name:name,
               description:description,
               access:_access

            }
         })
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
                   <RoleStateForm {...formData} access={accessArray} onSubmit={updateRole} onClear={clearAllAccess} loading={loading}/>
                </div>
            </div>
            <div className="w-full">
                <AccessTable accessClick={(e:any)=>accessClick(e)} permissionClick={(e:any)=>permissionClick(e)} checkedList={checkedList.current} handleSelectAll={(e:any)=>handleSelectAll(e)} isSelectedAll={isSelectedAll} />
            </div>
       </div>
    )
}
export default EditRole;


