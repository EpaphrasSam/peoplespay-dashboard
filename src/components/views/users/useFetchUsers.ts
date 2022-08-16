import {useEffect} from 'react'
import {setUsers } from '../../../state/users.state';
import { useDispatch} from 'react-redux';
import UsersService from '../../../services/users.service'

export default function useFetchUsers() {
    const dispatch = useDispatch()
    useEffect(()=>{ 
        try{
            const loadUsers = async() => {
                const response =  await UsersService.getUsers();
                if(!response?.success){
                   return alert(response?.message)
                }  
              return  dispatch(setUsers(response?.data))
            }
            loadUsers()
        }catch(err:any){
          alert(err.message)
        }
     },
     [])   
}
