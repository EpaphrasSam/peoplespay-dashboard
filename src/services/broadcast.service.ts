import Utils from '../utils/AuthToken'
import { BASE_URL } from "../utils/url"

const sendMessage=(message:any)=>fetch(
    `${BASE_URL}/customers/sms/push`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
        body : JSON.stringify(message)
    }
).then(res=>res.json())

const MessageService = {sendMessage}
export default MessageService;