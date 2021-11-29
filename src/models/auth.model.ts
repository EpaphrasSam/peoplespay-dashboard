
export interface LoginPayload {
    email:string;
    password:string;
}


export interface User {
    "_id":string;
    "name":string;
    "email":string;
    "password":string;
    "role":string;
    "account_type":string;
    "merchantId":string;
    "blocked":string;
    "createdAt":string;
    "updatedAt":string;
}