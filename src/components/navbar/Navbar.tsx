import React from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../../state/auth.state";



export default function Navbar() {

    //const {user} = useSelector(authSelector)
    //console.log(user);
    return (
            <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-2xl hidden lg:inline-block font-semibold font-sans text-red-800"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Dashboard
                    </a>
                    {/* Form */}
                    <svg className="h-10 rounded-full text-red-800 w-5 text-gray-300 md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <h5 className='text-red-800'>Mark Tutu</h5>
                    </ul>
                </div>
            </nav>        
    );
}