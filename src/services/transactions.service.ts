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


export default {
    nec,
    transactions,
    getMerchantTransaction,
    payFailed,
    merchantSummary,
    summary
}