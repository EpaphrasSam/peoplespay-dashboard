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


const AccountsService = {getIssuers,nec}
export default AccountsService;