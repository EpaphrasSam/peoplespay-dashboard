import Utils from '../utils/AuthToken'
import { BASE_URL } from "../utils/url"

const nec=(data:any)=>fetch(
    `${BASE_URL}/transactions/nec`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(data)
    }
).then(res=>res.json())

const transactions=()=>fetch(
    `${BASE_URL}/qrc/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
    }
).then(res=>res.json())

const getMerchantTransaction=(id:string)=>fetch(
    `${BASE_URL}/qrc/get/merchant/${id}`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken() 
        },
    }
).then(res=>res.json())

const summary=()=>fetch(
    `${BASE_URL}/qrc/aggregate`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' :  Utils.AuthToken()
        },
    }
).then(res=>res.json())

const changeTransStatus = (data: any) => fetch(
    `${BASE_URL}/transactions/change/status`,
    {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': Utils.AuthToken()
        },
        body: JSON.stringify(data)
    }
).then(res => res.json());

const payFailed=(data:any)=>fetch(
    `${BASE_URL}/`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(data)
    }
).then(res=>res.json())

const merchantSummary=(id:string)=>fetch(
    `${BASE_URL}/qrc/aggregate/${id}`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        },
    }
).then(res=>res.json())

const otpReversal = () => fetch(
    `${BASE_URL}/transactions/reversal/otp`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' :  Utils.AuthToken()
        },
    }
).then(res=>res.json())


const reverseTransaction = (data:any) => fetch(
    `${BASE_URL}/transactions/customer/reversal`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' :  Utils.AuthToken()
        },
        body : JSON.stringify(data)
    }
).then(res=>res.json())

const sendEmailOTP = () => fetch(
    `${BASE_URL}/otp/email`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' :  Utils.AuthToken()
        },
    }
).then(res=>res.json())

const initiateReversal = (data:any) => fetch(
    `${BASE_URL}transactions/reversal/initiate`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' :  Utils.AuthToken()
        },
        body : JSON.stringify(data)
    }
).then(res=>res.json())

const transactionServices = {
    nec,
    transactions,
    getMerchantTransaction,
    payFailed,
    merchantSummary,
    summary,
    otpReversal,
    reverseTransaction,
    initiateReversal,
    sendEmailOTP,
    changeTransStatus
}

export default transactionServices;