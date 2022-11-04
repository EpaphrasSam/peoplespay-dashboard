import Utils from '../utils/AuthToken'
import { BASE_URL } from "../utils/url"

const _sendMessage=(message:any)=>fetch(
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

const sendMessage=(data:any)=>fetch(
    `${BASE_URL}/admin/sms`,
    {
        method:'POST',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
        body : JSON.stringify(data)
    }
).then(res=>res.json())

const sendEmails = (data: any) => fetch(
    `${BASE_URL}/admin/send/emails`,
    {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json',
            'Authorization': Utils.AuthToken()
        },
        body: JSON.stringify(data)
    }
).then(res => res.json())

const MessageService = {sendMessage, sendEmails}
export default MessageService;