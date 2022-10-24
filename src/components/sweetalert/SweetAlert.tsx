import Swal, { SweetAlertIcon } from 'sweetalert2';
import TransactionService from '../../services/transactions.service'

type AlertResponseProps={
    icon:SweetAlertIcon;
    response:string;
}

type ConfirmAlertProps={
    text:string,
    confirmButtonText:string
}

type InputAlertProps={
  title:string,
  input:string,
}

export const alertResponse=({icon,response}:AlertResponseProps)=>(
    Swal.fire({
        position: 'center',
        icon: icon,
        text: response,
        showConfirmButton: false,
        timer: 2000
      })
)


export const confirmAlert=async({text,confirmButtonText}:ConfirmAlertProps):Promise<any>=>(
    Swal.fire({
        title: 'Are you sure?',
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
    }
 ))

 export const OTPAlertInput:any=async()=>{
    try{ 
    const res= await TransactionService.sendEmailOTP();
    if(res.success){
        return Swal.fire({
            title:'OTP sent to your email',
            input:'text',
            inputLabel:'Enter OTP',
            inputValue:'',
            showCancelButton:true,
            inputValidator:(inputValue):any=>{
                if(!inputValue){return 'Please enter OTP'}
            }
        })
    }else{
        throw alertResponse({
            icon:'error',
            response:'Could not send OTP to your email.Try again'
        })
    }
    
     
    }catch(err:any){
        alertResponse({
            icon:'info',
            response:err.message
        })
    }   
 }

 export const transStatusAlert=async():Promise<any>=>{
    Swal.fire({
        title: 'This will change status of this transaction',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Paid',
        denyButtonText: `Failed`,
      })
 }

//  async()=>{
//     await transStatusAlert().then(async(result)=>{
//       const _result= await result;console.log(_result)
//       if(_result?.isConfirmed){
//         confirmAlert({
//           text:'This will change status to PAID',
//           confirmButtonText:'Yes, proceed'
//         }).then(async(response)=>{
//           if(response.isConfirmed){
//             const res=await transactionServices.changeTransStatus({
//               id:transaction?._id,
//               status:'paid'
//             })
//             return alertResponse({
//               icon:res.success?'success':'error',
//               response:res.message
//             })
//           }
//         })
//       }else if(_result?.isDenied){
//         confirmAlert({
//           text:'This will change status to FAILED',
//           confirmButtonText:'Yes, proceed'
//         }).then(async(response)=>{
//           if(response.isConfirmed){
//             const res=await transactionServices.changeTransStatus({
//               id:transaction?._id,
//               status:'failed'
//             })
//             return alertResponse({
//               icon:res.success?'success':'error',
//               response:res.message
//             })
//           }
//         })
//       }
//     })
//   }