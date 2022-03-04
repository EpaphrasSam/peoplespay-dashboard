import { deserialize } from "v8";
import Utils from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";


const getMerchants=()=>fetch(
    'http://18.118.126.49/peoplepay/merchants/get',
    {
        method:'GET',
        headers:{
            'Content-type':'Application/json',
            'Authorization' : Utils.AuthToken()
        },
    }
).then(res=>res.json())


const getActivities = () => fetch(
    `${BASE_URL}/merchants/activities/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
        }
    }
).then(res=> res.json())


const getMerchant = (id : string) => fetch(
    `http://18.118.126.49/peoplepay/merchants/get/${id}`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authroization': Utils.AuthToken()
        }
    }
).then(res => res.json());


const getMerchantDetail = (id:string) => fetch(
    `http://18.118.126.49/peoplepay/merchants/get/${id}`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
    }
    }
).then(res=> res.json())

// const generateQR = (id:string) => fetch(
//     `${BASE_URL}/merchants/generateqr/${id}`,
//     {
//         method : 'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     }
//     }
// )

const createMerchant = (merchant:any) => fetch(
    `${BASE_URL}/merchants/new`,
    {
        method : 'POST',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
    },
    body : JSON.stringify(merchant)
    }
).then(res => res.json())

 const getCities = () => fetch(
    `${BASE_URL}/merchants/cities/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
    }
    }
).then(res=> res.json())

const getCategories = () => fetch(
    `${BASE_URL}/merchants/categories/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
    }
    }
).then(res=> res.json())


// const saveCategory = (category:CategoryPayload) => fetch(
//     `${BASE_URL}/merchants/categories/add`,
//     {
//         method : 'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//             //'Authroization' : AuthToken()
//     },
//     body : JSON.stringify(category)
//     }
// )

// const updateCategory = (data:any) => fetch(
//     `${BASE_URL}/merchants/categories/update`,
//     {
//         method : 'PUT',
//         headers : {
//             'Content-type' : 'Application/json',
//             //'Authroization' : AuthToken()
//     },
//     body : JSON.stringify(data)
//     }
// )

// const updateStatus = (data:any) => fetch(
//     `${BASE_URL}/merchants/status/update`,
//     {
//         method : 'PUT',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     },
//     body : JSON.stringify(data)
//     }
// )

// const updateMerchant = (data:any) => fetch(
//     `${BASE_URL}/merchants/update}`,
//     {
//         method : 'PUT',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     },
//     body : JSON.stringify(data)
//     }
// )

// const deleteCategory = (id:string) => fetch(
//     `${BASE_URL}/merchants/categories/delete/${id}`,
//     {
//         method : 'DELETE',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     }
//     }
// )

// const dateFilter = (params : any) => fetch(
//     `${BASE_URL}/merchants/filter/date`,
//     {
//         method : 'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     }
//     }
// )

// const getIssuers = () => fetch(
//     `${BASE_URL}/merchants/issuers/get`,
//     {
//         method : 'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//            // 'Authroization' : AuthToken()
//     }
//     }
// )


const getRegions = () => fetch(
    `${BASE_URL}/merchants/regions/get`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
            'Authorization' : Utils.AuthToken()
    }
    }
).then(res=> res.json())

const summary = () => fetch(
    `${BASE_URL}/merchants/summary`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
           'Authorization' : Utils.AuthToken()
    }
    }
).then(res=>res.json())

const getDocuments = (merchantId:string) => fetch(
    `http://18.118.126.49/peoplepay/documents/get/${merchantId}`,
    {
        method : 'GET',
        headers : {
            'Content-type' : 'Application/json',
           'Authorization' : Utils.AuthToken()
    }
    }
).then(res=>res.json())

const approveMerchant = (body:any) => fetch(
    'http://18.118.126.49/peoplepay/merchants/approve',
    {
        method : 'POST',
        headers : {
            'Content-type' : 'Application/json',
           'Authorization' : Utils.AuthToken()
    },
    body : body
    }
).then(res=>res.json())





const merchantsService =  {
    getMerchants,
    getCategories,
    summary,
    getMerchant,
    getMerchantDetail,
    getActivities,
    getCities,
    getRegions,
    createMerchant,
    getDocuments,
    approveMerchant
}
export default merchantsService;