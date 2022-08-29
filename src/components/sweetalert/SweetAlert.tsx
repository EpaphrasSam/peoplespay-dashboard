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
