import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuItem from "../dropdowns/MenuDropdown";
import access,{Route} from './Routes'

export default function Sidebar() {

    const {user}=useSelector((state:any)=>state.auth);
    const [collapseShow,setCollapseShow]=React.useState("hidden");
    const [paths,setPaths]:any=useState([]);


    useEffect(()=>{
        if(user && Array.isArray(user?._role?.access)){
            let _paths:any[]=[];
            access.roles.forEach((route:Route)=>{
                if(route.hasChild){
                    let children:Array<Route>|undefined=route.children?.filter((r)=>user?._role?.access.find((p:any)=>r.path===p.path));
                    if(children && children.length>0){
                        route.children=children;
                        _paths.push(route);                       
                    }
                }else{
                    user?._role?.access?.forEach((p:any)=>{
                        if(route.path===p.path){
                            _paths.push(route);
                        }
                    })
                }
            });
            
            setPaths(_paths);
        }
        else if(user && Array.isArray(user.access)){
            //if(user && Array.isArray(user.access)){}
            let _paths:any[]=[];
            access.routes.forEach((route:Route)=>{
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
            <nav className="font-inter md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-lg bg-white flex flex-wrap  justify-between relative md:w-56 py-4 px-6 border-none scrollbar-thin scrollbar-thumb-pink scrollbar-track-red-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
                    <div className="hidden md:block md:fixed z-10 bg-white top-0 p-0 md:w-48">
                        <Link
                            className="text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-5 py-5"
                            to="/"
                        >
                        <img className='w-20 mx-auto pb-0 rounded' src='/assets/logo.png' alt='logo'/>
                        </Link>
                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                    </div>
                    
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            notification
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto  flex-1 rounded " +
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
                        
                        
                        {/* Heading */}
                        <h6 className="text-center md:min-w-full text-pink-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline mt-32">
                            Admin Layout Pages
                        </h6>
                        {/* Navigation */}
                        <ul className="text-left flex flex-col list-none">
                            {paths.map((p:any,i:number)=>
                            (<li className="group py-4  text-gray-600 font-thin hover:text-pink tracking-tighter">
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