
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

export  enum LoginPath{
    "DASHBOARD" = "/",
    "USERTRANSACTIONS" = "user-transactions",
    "USERS" = "users",
    "MERCHANTS" = "merchants",
    "MERCHANTTRANSACTIONS" = "merchant-transations",
    "MERCHANTCATEGORIES" = "merchant-categories",
    "AGENTS" = "agents",
    "REFERRALS" = "referrals",
    "WALLETS" = "wallets",
    "SETTLEMENTNEW" = "merchant-settlement/new",
    "SETTLEMENTHISTORY" = "merchant-settlement/all"
}