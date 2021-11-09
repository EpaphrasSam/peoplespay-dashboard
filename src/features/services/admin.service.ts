import api from '../../utils/api';

export const adminLogin = (data:{email:string, password: string}) => {
    return api.post('/admin/login', data)
}

export const addAdmin = (data: {email : string, password: string}) =>{
    return api.post('/admin/add', data)
} 

export const getAdmin = () => {
    return api.get('/admin/get')
}

export const update = (data:string) => {
return api.put('/admin/update', data)
}