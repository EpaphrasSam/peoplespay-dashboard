import Utils from '../utils/AuthToken'
import { BASE_URL } from "../utils/url"


const getElevyTransactions=()=>fetch(
    `${BASE_URL}/elevy/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
    }
).then(res=>res.json());

const filterElevyPeriod=(data:any)=>fetch(
    `${BASE_URL}/elevy/monthly/get`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
        body:JSON.stringify(data)
    }
).then(res=>res.json())

const elevyService={
    getElevyTransactions,
    filterElevyPeriod
}
export default elevyService;