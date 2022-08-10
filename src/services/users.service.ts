import Utils from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";

const getUsers = () => fetch(
    `${BASE_URL}/customers/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        }
    }
).then(res=>res.json())

const blockUser=(data:any)=>fetch(
    `${BASE_URL}/customers/update`,
    {
        method:'PUT',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
        body:JSON.stringify(data)
    }
).then(res=>res.json())

const usersService = {
    getUsers,
    blockUser
}
export default usersService;