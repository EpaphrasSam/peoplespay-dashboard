import {useEffect} from 'react'
import {setUsers } from '../../../state/users.state';
import { useDispatch} from 'react-redux';
import UsersService from '../../../services/users.service'
import { UserModel } from '../../../models/user.model';
export default function useFetchUsers() {
    const dispatch = useDispatch()
    useEffect(()=>{ 
        try{
            const loadUsers = async() => {
                const response =  await UsersService.getUsers();
                if(!response?.success){
                   return alert(response?.message)
                }  
              let users= response?.data.map((user:any)=>new UserModel(user))
              return  dispatch(setUsers(users))
            }
            loadUsers()
        }catch(err:any){
          alert(err.message)
        }
     },
     [])   
}
