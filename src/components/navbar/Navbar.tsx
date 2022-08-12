import React from "react";
import { authSelector } from "../../state/auth.state";
import { useSelector } from "react-redux";
import SlideDrawer from "../sidebar/SideDrawer";

export default function Navbar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const close = ()=> setDrawerOpen(false); 

    const signout=()=>{
        window.localStorage.clear();
        window.location.href = '/'
    }
    const {user} = useSelector(authSelector); 
    const str = user?.name
    const acronym = str?.split(/\s/).reduce((response: any,word: string | any[])=> response+=word.slice(0,1),'')

    return (
        <>
          <SlideDrawer drawerOpen={drawerOpen} close ={close} name={user?.name} email={user?.email} acc_type={user?.account_type} signout={signout}/>
            <nav className="absolute top-0 left-0 w-full z-1 md:flex-row md:flex-nowrap md:justify-start flex items-center bg-white shadow-md md:h-5">
                <div className="pb-7 w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 md:pl-1 px-4">
                    {/* Brand */}
                  <span className="items-center inline-block"> 
                    <span className="hidden md:inline-flex items-center md:mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </span>
                    <a
                        className="text-sm md:text-lg hidden lg:inline-block font-semibold text-pink tracking-wide"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        REPORTING DASHBOARD #PeoplesPay
                    </a>
                 </span> 
                    {/* Form */}
                    
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-10 rounded-full  w-5 text-blue-900 md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                     </svg> */}
                     
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">  
                     <span className='font-light'>active</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 rounded-full  w-5 text-sgreen md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        {/* <ProfileDropdown name={user?.name}/> */}
                        <button className="text-red-700 uppercase font-bold bg-red-100 p-2 w-10 rounded-full" onClick={()=>setDrawerOpen(true)}>{acronym || 'N/A'}</button>
                    </ul>
                </div>
            </nav> 
        </>       
    );
}