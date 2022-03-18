import React from "react";
import { Link } from "react-router-dom";
import MerchantDropdown from "../dropdowns/MerchantDropdown";
import UserDropdown from '../dropdowns/UsersDropdown';


export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
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
                            <li className="items-center py-7">
                                <Link
                                    to="/"
                                >
                                    <i
                                        className="fas fa-tv mr-2 text-sm "
                                           
                                    ></i>{" "}
                                    Dashboard
                                </Link>
                            </li>
                            <li className="items-center py-7 -ml-7">
                                <UserDropdown />
                            </li>                          
                            <li className="items-center py-7 ">
                                <MerchantDropdown />
                            </li>

                            <li className="items-center py-7 text-red-800 ml-2 font-bold font-sans text-sm uppercase">
                                 <Link
                                    to="/agents"
                                >
                                    <i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                        className=
                                            "fas fa-user mr-2 font-bold"
                                        >
                                    </i>{" "}
                                    view agents
                                </Link>
                            </li>
                            <li className="items-center py-7 text-red-800 -ml-1 font-bold font-sans text-sm uppercase">
                                 <Link
                                    to="/referals"
                                >
                                    <i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                        className={
                                            "fas fa-registered                                                                                                                            mr-2 text-sm" +
                                            (window.location.href.indexOf("/admin/dashboard") !== -1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                ? "text-red-800"
                                                : "text-red-800")
                                        }
                                    ></i>{" "}
                                    referrals
                                </Link>
                            </li>
                            <li className="items-center py-7 text-red-800 -ml-5 font-bold font-sans text-sm uppercase">
                                 <Link
                                    
                                    to="/wallets"
                                >
                                    <i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                        className={
                                            "fas fa-wallet text-red-800                                                                                                                          mr-2 text-sm" +
                                            (window.location.href.indexOf("/wallets") !== -1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                ? ""
                                                : "text-red-800")
                                        }
                                    ></i>{" "}
                                    wallets
                                </Link>
                            </li>
                            <li className="items-center py-7 text-red-800 -ml-5 font-bold font-sans text-sm uppercase">
                                 <Link
                                    
                                    to="merchant-settlement"
                                >
                                    <i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                        className={
                                            "fas fa-hand-holding-usd text-red-800                                                                                                                          mr-2 text-sm" +
                                            (window.location.href.indexOf("/settlement") !== -1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                                                ? ""
                                                : "text-red-800")
                                        }
                                    ></i>{" "}
                                    settlement
                                </Link>
                            </li>
                            <li className="items-center py-7 text-red-800 ml-2 font-bold font-sans text-sm uppercase">
                                 <Link
                                    to="broadcast-message"
                                >
                                    <i                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                        className=
                                            "fas fa-bullhorn mr-2 font-bold"
                                        >
                                    </i>{" "}
                                     broadcast message
                                </Link>
                            </li>
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