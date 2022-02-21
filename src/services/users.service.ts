import { BASE_URL } from "../utils/url";

const getUsers = () => fetch(
    `${BASE_URL}/customers/get`,
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
        }
    }
).then(res=>res.json())

const usersService = {
    getUsers
}
export default usersService;