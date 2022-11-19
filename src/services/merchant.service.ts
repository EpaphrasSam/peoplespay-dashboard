import Utils from "../utils/AuthToken";
import { BASE_URL } from "../utils/url";

const getMerchants = () =>
  fetch(`${BASE_URL}/merchants/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getApprovedMerchants = () =>
  fetch(`${BASE_URL}/merchants/approved`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getActivities = () =>
  fetch(`${BASE_URL}/merchants/activities/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

// const getMerchant = (id : string) => fetch(
//     `${BASE_URL}/merchants/get/${id}`,
//     {
//         method : 'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//             'Authroization': Utils.AuthToken()
//         }
//     }
// ).then(res => res.json());

const getMerchantDetail = (id: string) =>
  fetch(`${BASE_URL}/merchants/get/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

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

const createMerchant = (merchant: any) =>
  fetch(`${BASE_URL}/merchants/new`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(merchant),
  }).then((res) => res.json());

const getCities = () =>
  fetch(`${BASE_URL}/merchants/cities/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getCategories = () =>
  fetch(`${BASE_URL}/merchants/categories/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

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

const getRegions = () =>
  fetch(`${BASE_URL}/merchants/regions/get`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const summary = () =>
  fetch(`${BASE_URL}/merchants/summary`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getDocuments = (merchantId: string) =>
  fetch(`${BASE_URL}/documents/get/${merchantId}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const addDocuments = (data: any) =>
  fetch(`${BASE_URL}/documents/add`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const approveMerchant = (body: any) =>
  fetch(`${BASE_URL}/merchants/approve`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

const blockMerchant = (body: any) =>
  fetch(`${BASE_URL}/merchants/update`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

const getMerchantBank = (id: string) =>
  fetch(`${BASE_URL}/beneficiaries/get/customer/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

// const declineMerchants = (id:string)=>fetch(
//     `${BASE_URL}/beneficiaries/get/customer/${id}`,
//     {
//         method:'GET',
//         headers : {
//             'Content-type' : 'Application/json',
//            'Authorization' : Utils.AuthToken()
//     },
//     }
// ).then(res=>res.json())

const declineMerchant = (data: any) =>
  fetch(`${BASE_URL}/merchants/decline`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const getApps = (id: string) =>
  fetch(`${BASE_URL}/hub/get/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const getUsers = (id: string) =>
  fetch(`${BASE_URL}/merchants/roles/get/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const resetUser = (data: any) =>
  fetch(`${BASE_URL}/merchants/admin/reset`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const addUser = (data: any) =>
  fetch(`${BASE_URL}/merchants/roles/add`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

const toggleDisbursement = (id: string) =>
  fetch(`${BASE_URL}/hub/toggle/pool/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const deleteMerchant = (id: string) =>
  fetch(`${BASE_URL}/merchants/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json",
      Authorization: Utils.AuthToken(),
    },
  }).then((res) => res.json());

const merchantsService = {
  getUsers,
  resetUser,
  addUser,
  getMerchants,
  getApprovedMerchants,
  getCategories,
  summary,
  // getMerchant,
  getMerchantDetail,
  getActivities,
  getCities,
  getRegions,
  createMerchant,
  getDocuments,
  approveMerchant,
  blockMerchant,
  getMerchantBank,
  // declineMerchants,
  getApps,
  declineMerchant,
  toggleDisbursement,
  deleteMerchant,
  addDocuments,
};
export default merchantsService;
