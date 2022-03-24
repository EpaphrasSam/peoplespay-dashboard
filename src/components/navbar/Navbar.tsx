import React from "react";
import { authSelector } from "../../state/auth.state";
import { useSelector } from "react-redux";

export default function Navbar() {
    const {user} = useSelector(authSelector); 
    return (
            <nav className="absolute top-0 left-0 w-full z-1 bg-white md:flex-row md:flex-nowrap md:justify-start flex items-center border-b-2 border-gray-100">
                <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 md:pl-1 px-4">
                    {/* Brand */}
                    <span className="hidden md:block md:mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </span>
                    <a
                        className="text-sm hidden lg:inline-block font-semibold font-sans text-red-800 tracking-wide"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        REPORTING DASHBOARD #PeoplesPay
                    </a>
                    {/* Form */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 rounded-full  w-5 text-gray-300 md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                           
                        <h5 className='text-red-800 font-bold font-sans'>{user?.name}</h5>
                    </ul>
                </div>
            </nav>        
    );
}