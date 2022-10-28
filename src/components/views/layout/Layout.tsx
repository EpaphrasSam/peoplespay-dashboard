import React from "react";
import {Outlet} from "react-router-dom";


import ErrorBoundary from "../../error-boundary/ErrorBoundary";


// components
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";


export default function Admin():any {

    
   

    
    // const loadProfile=()=>{
    //     const session=sessionStorage.getItem('PP-USER');
    //     if(typeof session==='string'){
    //         dispatch(
    //             setAuth(
    //                 JSON.parse(session)
    //             )
    //         )
    //     }
    //     if(user===null){
    //         <Navigate to="/login" replace/>
    //     }else if(user?.isPasswordChanged===false){
    //         return navigate('/change-password')
    //     }
    // }
    
  
    return (
        <>
         <ErrorBoundary>
            <Sidebar />
            <div className="relative md:ml-56 mt-12 font-inter gap-5 flex flex-col">
                    <Navbar />

                {/* Header */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-12">
                    
                    <Outlet/>

                    <Footer/>
                </div>
            </div>
            </ErrorBoundary>
        </>
    );
}