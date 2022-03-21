import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MerchantDropdown from "../dropdowns/MerchantDropdown";
import UserDropdown from '../dropdowns/UsersDropdown';
import SettlementDropdown from '../dropdowns/SettlementDropdown';
import { useSelector } from "react-redux";
import authState from "../../state/auth.state";
import state from "../../state/state";
import MenuItem from "../dropdowns/MerchantDropdown";

const routes:any[]=[
    {
        path:'dashboard',
        title:'Dashboard',
        icon:'',
        children:[]
    },
    {
        path:'users',
        title:'Users',
        icon:'',
        children:[
            {
                path:'user-transactions',
                icon:'fas fa-eye mr-2',
                title:'User Transactions'
            },
            {
                path:'users',
                icon:'fas fa-eye mr-2',
                title:'Users'
            }
        ]
    }
]



export default function Sidebar() {

    const {user}=useSelector((state:any)=>state.auth);
    const [collapseShow,setCollapseShow]=React.useState("hidden");
    const [paths,setPaths]:any=useState([]);


    useEffect(()=>{
        if(user && Array.isArray(user.access)){
            let _paths:any[]=routes.filter((route:any)=>user.access.find((p:string)=>route.path===p));
            setPaths(_paths);
        }
    },[user])
    

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-md bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6 md:border-1 md:rounded-tr-3xl md:rounded-br-3xl">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        to="/"
                    >
                     <img className='w-20 mx-auto pb-0' src='/assets/logo.png' alt='logo'/>
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            notification
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        to="/"
                                    >
                                        PeoplesPay
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Admin Layout Pages
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            {paths.map((p:any,i:number)=><li className="items-center py-7">
                                <MenuItem key={i.toString()} data={p}/>
                            </li>)
                            }
                        </ul>
                         {/* Divider */}
                         <hr className="my-4 md:min-w-full" />
                         <button className='uppercase leading-tight font-semibold font-sans bg-red-900 text-white py-3 shadow hover:shadow-inner rounded '
                         onClick={() => {window.localStorage.clear();window.location.href = '/'}}
                         >
                             LOGOUT
                             </button>
                    </div>
                </div>
            </nav>
        </>
    );
}