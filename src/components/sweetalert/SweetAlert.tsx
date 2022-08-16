import Swal, { SweetAlertIcon } from 'sweetalert2';

type AlertResponseProps={
    icon:SweetAlertIcon;
    response:string;
}

type ConfirmAlertProps={
    text:string,
    confirmButtonText:string
}

export const alertResponse=({icon,response}:AlertResponseProps)=>(
    Swal.fire({
        position: 'center',
        icon: icon,
        text: response,
        showConfirmButton: false,
        timer: 3000
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