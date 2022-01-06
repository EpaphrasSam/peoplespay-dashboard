import React from "react";


export default function Navbar() {
     let hours = new Date().getHours()
    let greeting = (hours < 12) ? 'Good Morning,' : (hours <=18 && hours >=12) ? 'Good Afternoon,' : 'Good Evening,'
    return (
            <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <a
                        className="text-2xl hidden lg:inline-block font-semibold font-sans text-red-800 tracking-wide"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        {greeting}<span className='text-md pl-2'>welcome back !</span>
                    </a>
                    {/* Form */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 rounded-full text-red-800 w-5 text-gray-300 md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <h5 className='text-red-800'>Admin</h5>
                    </ul>
                </div>
            </nav>        
    );
}