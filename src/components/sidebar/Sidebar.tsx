import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "../dropdowns/MenuDropdown";
import {BsHouse,BsClockHistory,BsWallet2,BsKey} from 'react-icons/bs'
import {FiUsers,FiUserPlus,FiUserCheck} from 'react-icons/fi'
import {VscSettings,VscArrowSwap,VscFileSymlinkDirectory} from 'react-icons/vsc'
//import {GrUserAdmin} from 'react-icons/gr'
import {GiPayMoney,GiReceiveMoney,GiSpeaker} from 'react-icons/gi'
import {FaRegMoneyBillAlt}from 'react-icons/fa'
import {BiCategory} from 'react-icons/bi'
import {RiShareForwardLine,RiApps2Line}from 'react-icons/ri'
import {SiWebmoney}from 'react-icons/si'
import{TbHammer}from 'react-icons/tb'
import { MdOutlineSkateboarding } from "react-icons/md";
export interface Route {
    path:string;
    title:string;
    icon:any;
    hasChild? :boolean;
    children?:Array<Route>
}

const routes:Route[]=[
    {
        path:'/',
        title:'Dashboard',
        icon:<BsHouse className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'manage-admins',
        title:'Manage Admins',
        icon:<FiUserCheck className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'create-admin',
                icon:<FiUserPlus className="mr-3 text-xl"/>,
                title:'Create Admin'
            },
            {
                path:'all-admins',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'All admins'
            },
            {
                path:'roles',
                icon:<BsKey className="mr-3 text-xl"/>,
                title:'Admin Roles'
            }
        ]
    },
    {
        path:'configurations',
        title:'Configurations',
        icon:<VscSettings className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'customer-profile',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Customer Profile'
            },
            {
                path:'charges-control',
                icon:<TbHammer className="mr-3 text-xl"/>,
                title:'Charges'
            },
            {
                path:'merchants-control',
                icon:<RiApps2Line className="mr-3 text-xl"/>,
                title:'Merchants Apps'
            }
        ]
    },
    {
        path:'users',
        title:'Users',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'user-transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'User Transactions'
            },
            {
                path:'users',
                icon:<FiUsers className="mr-3 text-xl"/>,
                title:'Subscribers'
            }
        ]
    },
    {
        path:'e-levy',
        title:'E-Levy',
        icon:<FaRegMoneyBillAlt className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchant-settlement/new',
        title:'Settlement',
        icon:<SiWebmoney className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchant-settlement/new',
                icon:<GiReceiveMoney className="mr-3 text-xl"/>,
                title:'Initiate'
            },
            {
                path:'merchant-settlement/approvals',
                icon:<VscArrowSwap className="mr-3 text-xl"/>,
                title:'Approvals'
            },
            {
                path:'merchant-settlement/all',
                icon:<BsClockHistory className="mr-3 text-xl"/>,
                title:'History'
            }
            
        ]
    },
    {
        path:'direct-debit',
        title:'Direct Debit',
        icon:<VscFileSymlinkDirectory className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'merchants',
        title:'Merchants',
        icon:<FiUsers className="mr-3 text-xl"/>,
        hasChild : true,
        children:[
            {
                path:'merchants',
                icon:<MdOutlineSkateboarding className="mr-3 text-2xl"/>,
                title:'Merchants Onboarding'
            },
            {
                path:'merchant-transactions',
                icon:<GiPayMoney className="mr-3 text-xl"/>,
                title:'Transactions'
            },
            {
                path:'merchant-categories',
                icon:<BiCategory className="mr-3 text-xl"/>,
                title:'Categories'
            },
        ]
    },
    {
        path:'wallets',
        title:'Wallets',
        icon:<BsWallet2 className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    // {
    //     path:'agents',
    //     title:'Agents',
    //     icon:<FiUsers className="mr-3 text-xl"/>,
    //     hasChild : false,
    //     children:[]
    // },
    {
        path:'referrals',
        title:'Referrals',
        icon:<RiShareForwardLine className="mr-3 text-xl"/>,
        hasChild : false,
        children:[]
    },
    {
        path:'broadcast-message',
        title:'Sms Broadcast',
        icon:<GiSpeaker className="mr-3 text-xl"/>,
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
            <nav className="font-inter md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg bg-white flex flex-wrap  justify-between relative md:w-56 z-10 py-4 px-6 border-none scrollbar-thin scrollbar-thumb-pink scrollbar-track-red-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 text-xl px-6")}
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
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto  flex-1 rounded " +
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
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 text-xl py-1 leading-none bg-transparent rounded border border-solid border-transparent"
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
                        <h6 className="text-left md:min-w-full text-pink-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Admin Layout Pages
                        </h6>
                        {/* Navigation */}
                        <ul className="text-left flex flex-col list-none">
                            {paths.map((p:any,i:number)=>
                            (<li className="group py-6  text-gray-800 hover:text-pink">
                                <MenuItem key={i.toString()} data={p}/>
                            </li>
                            ))
                            }
                        </ul>
                         
                    </div>
                </div>
            </nav>
        </>
    );
}