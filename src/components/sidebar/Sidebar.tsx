import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "../dropdowns/MenuDropdown";

export interface Route {
    path:string;
    title:string;
    icon:string;
    hasChild? :boolean;
    children?:Array<Route>
}

const routes:Route[]=[
    {
        path:'/',
        title:'Dashboard',
        icon:'fas fa-home mr-1',
        hasChild : false,
        children:[]
    },
    {
        path:'users',
        title:'Users',
        icon:'fas fa-users mr-3',
        hasChild : true,
        children:[
            {
                path:'user-transactions',
                icon:'fas fa-dollar-sign mr-2',
                title:'User Transactions'
            },
            {
                path:'users',
                icon:'fas fa-users mr-2',
                title:'Users'
            }
        ]
    },
    {
        path:'e-levy',
        title:'E-Levy',
        icon:'fas fa-money-bill mr-1',
        hasChild : false,
        children:[]
    },
    {
        path:'merchant-settlement/new',
        title:'Settlement',
        icon:'fas fa-hand-holding-usd mr-1',
        hasChild : true,
        children:[
            {
                path:'merchant-settlement/new',
                icon:'fas fa-hand-holding-usd mr-2',
                title:'Make Settlement'
            },
            {
                path:'merchant-settlement/all',
                icon:'fas fa-eye mr-1',
                title:'All Settlements'
            },
            {
                path:'merchant-settlement/approvals',
                icon:'fas fa-eye mr-1',
                title:'Approvals'
            }
        ]
    },
    {
        path:'merchants',
        title:'Merchants',
        icon:'fas fa-users mr-1',
        hasChild : true,
        children:[
            {
                path:'merchants',
                icon:'fas fa-users mr-2',
                title:'Merchants'
            },
            {
                path:'merchant-transactions',
                icon:'fas fa-coins mr-2',
                title:'Transactions'
            },
            {
                path:'merchant-categories',
                icon:'fas fa-list-alt mr-2',
                title:'Categories'
            },
        ]
    },
    {
        path:'wallets',
        title:'Wallets',
        icon:'fas fa-wallet mr-1',
        hasChild : false,
        children:[]
    },
    {
        path:'agents',
        title:'Agents',
        icon:'fas fa-users mr-2',
        hasChild : false,
        children:[]
    },
    {
        path:'referrals',
        title:'Referrals',
        icon:'fas fa-registered mr-1',
        hasChild : false,
        children:[]
    },
    {
        path:'broadcast-messaage',
        title:'Broadcast',
        icon:'fas fa-bullhorn mr-1',
        hasChild : false,
        children:[]
    },
]

export default function Sidebar() {

    const {user}=useSelector((state:any)=>state.auth);
    const [collapseShow,setCollapseShow]=React.useState("hidden");
    const [paths,setPaths]:any=useState([]);


    useEffect(()=>{
        if(user && Array.isArray(user.access)){
            let _paths:any[]=[];
            routes.forEach((route:Route)=>{
                if(route.hasChild){
                    let children:Array<Route>|undefined=route.children?.filter((r)=>user.access.find((p:string)=>r.path===p));
                    if(children && children.length>0){
                        route.children=children;
                        _paths.push(route);                       
                    }
                }else{
                    user.access.forEach((p:string)=>{
                        if(route.path===p){
                            _paths.push(route);
                        }
                    })
                }
            });
            
            setPaths(_paths);
        }
    },[user])

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg bg-white flex flex-wrap items-center justify-between relative md:w-56 z-10 py-4 px-6 border-none">
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
                     <img className='w-20 mx-auto pb-0 rounded' src='/assets/logo.png' alt='logo'/>
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
                        <h6 className="md:-ml-7 md:min-w-full text-pink-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Admin Layout Pages
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none -ml-14">
                            {paths.map((p:any,i:number)=>
                            (<li className="py-7  text-gray-600">
                                <MenuItem key={i.toString()} data={p}/>
                            </li>
                            ))
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