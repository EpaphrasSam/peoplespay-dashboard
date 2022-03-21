import React, { useEffect } from "react";
import {Outlet,Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector,setAuth } from "../../../state/auth.state";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";

// components
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";



export default function Admin() {

    const dispatch=useDispatch();
    const {isAuthenticated}=useSelector(authSelector);
    
    useEffect(()=>{
        loadProfile();
    },[]);


    const loadProfile=()=>{
        const session=sessionStorage.getItem('PP-USER');
        if(typeof session==='string'){
            dispatch(
                setAuth(
                    JSON.parse(session)
                )
            )
        }
        
    }
  
    return (
        <>
         <ErrorBoundary>
            <Sidebar />
            <div className="relative md:ml-64 bg-white mb-2">
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