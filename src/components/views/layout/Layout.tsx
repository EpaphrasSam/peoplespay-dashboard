import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";


// components

import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";

// views
import Dashboard from "../Dashboard";
import MerchantForm from '../../forms/MerchantForm'
import MerchantCategoriesTable from '../../tables/MerchantCategoriesTable'
import MerchantTransactions from '../merchant/MerchantTransactions'

export default function Admin() {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100 mb-2">
                    <Navbar />

                {/* Header */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-2">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard} />
                        <Route path="/admin/merchant-categories" exact component={MerchantCategoriesTable} />
                        <Route path="/admin/merchant-transactions" exact component={MerchantTransactions} />
                        <Route path="/admin/create-merchant" exact component={MerchantForm}/> 
                        <Redirect from="/admin" to="/admin/dashboard" />
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </>
    );
}