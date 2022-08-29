import Utils from '../utils/AuthToken'
import { BASE_URL } from "../utils/url"

const getIssuers=()=>fetch(
    `${BASE_URL}/issuers/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            // 'Authorization' : Utils.AuthToken()
        },
    }
).then(res=>res.json())

const nec=(body:any)=>fetch(
    `${BASE_URL}/hub/enquiry`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
        body : JSON.stringify(body)
    }
).then(res=>res.json())


const settle=(body:any)=>fetch(
    `${BASE_URL}/settlements/new`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization':Utils.AuthToken()
        },
        body : JSON.stringify(body)
    }
).then(res=>res.json())


const getSettlements=()=>fetch(
    `${BASE_URL}/settlements/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization':Utils.AuthToken()
        }
    }
).then(res=>res.json())

const getPendingSettlements=()=>fetch(
    `${BASE_URL}/settlements/get/pending`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization':Utils.AuthToken()
        }
    }
).then(res=>res.json())

const approve = (id:any) =>fetch(
    `${BASE_URL}/settlements/approve`,
    {
        method:'PUT',
        headers:{
            'Content-type':'Application/json',
            'Authorization':Utils.AuthToken()
        },
        body : JSON.stringify({id})
    }
).then(res=>res.json())

const decline = (data:any) =>fetch(
    `${BASE_URL}/settlements/discard`,
    {
        method:'PUT',
        headers:{
            'Content-type':'Application/json',
            'Authorization':Utils.AuthToken()
        },
        body : JSON.stringify(data)
    }
).then(res=>res.json())

const debitWallet = (data:any) =>fetch(
        `${BASE_URL}/transactions/debit`,
        {
            method:'POST',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            },
            body : JSON.stringify(data)
        }
    ).then(res=>res.json())

const creditWallet = (data:any) =>fetch(
        `${BASE_URL}/transactions/credit`,
        {
            method:'POST',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            },
            body : JSON.stringify(data)
        }
    ).then(res=>res.json())

const initiatePayout = (data:any) =>fetch(
        `${BASE_URL}/transactions/bpayout`,
        {
            method:'POST',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            },
            body : JSON.stringify(data)
        }
    ).then(res=>res.json())

const approvePayout = (data:any) =>fetch(
        `${BASE_URL}/transactions/approve/bpayout`,
        {
            method:'PUT',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            },
            body : JSON.stringify(data)
        }
    ).then(res=>res.json())

const getPendingPayouts=()=>fetch(
        `${BASE_URL}/transactions/bpayout/get`,
        {
            method:'GET',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            }
        }
    ).then(res=>res.json())

const declinePayout=(data:any)=>fetch(
        `${BASE_URL}/transactions/payout/discard`,
        {
            method:'PUT',
            headers:{
                'Content-type':'Application/json',
                'Authorization':Utils.AuthToken()
            },
            body : JSON.stringify(data)
        }
    ).then(res=>res.json())

const AccountsService = {declinePayout,approvePayout,getPendingPayouts,decline,initiatePayout,creditWallet,debitWallet,getIssuers,nec,getSettlements,settle, approve, getPendingSettlements}
export default AccountsService;