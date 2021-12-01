import Utils from "../utils/AuthToken"
import { BASE_URL } from "../utils/url"

const summaryReport=(startDate:string,endDate : string)=>fetch(
    `${BASE_URL}/transactions/report/get?startDate=${startDate}&endDate=${endDate}`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
    }
).then(res=>res.json())

const getTransactions = () => fetch(
    `${BASE_URL}/transactions/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    }
).then(res => res.json())

const getWallets = () => fetch(
    `${BASE_URL}/accounts/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    }
).then(res => res.json())

const getReferals = () => fetch(
    `${BASE_URL}/referals/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    }
).then(res => res.json())

const getAgents = () => fetch(
    `${BASE_URL}/referals/agents/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json'
        }
    }
).then(res => res.json())


export default {
summaryReport,
getTransactions,
getWallets,
getReferals,
getAgents
}