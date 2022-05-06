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
).then(res=>res.json())

export default getElevyTransactions;