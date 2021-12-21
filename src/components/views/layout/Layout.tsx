import React from "react";
import {Outlet,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/auth.state";
import ErrorBoundary from "../../../ErrorBoundary";

// components
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";





export default function Admin() {

    const { isAuthenticated} = useSelector(authSelector)
    if(isAuthenticated === false ){
        return <Navigate to='/login' />
    }

    return (
        <>
         <ErrorBoundary>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100 mb-2">
                    <Navbar />

                {/* Header */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-2">
                    
                    <Outlet/>

                    <Footer/>
                </div>
            </div>
            </ErrorBoundary>
        </>
    );
}