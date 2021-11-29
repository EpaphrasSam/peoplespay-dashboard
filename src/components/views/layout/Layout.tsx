import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../../state/auth.state";
// components
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import Footer from "../../footer/Footer";

// views
import Dashboard from "../Dashboard";
import MerchantForm from '../../forms/MerchantForm'
import MerchantCategories from '../merchant/MerchantCategory'
import MerchantTransactions from '../merchant/MerchantTransactions'
import UserTransactions from "../users/UserTransactions";
import Wallets from '../wallet/WalletAccounts';
import Referals from '../referals/Referals'
import Agents  from "../agents/Agents";
import Users from '../users/Users'
import AllMerchants from '../merchant/Merchants'




export default function Admin() {

    const { isAuthenticated} = useSelector(authSelector)
    if(isAuthenticated === false){
        return <Redirect to='/' />
    }

    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100 mb-2">
                    <Navbar />

                {/* Header */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-2">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard} />
                      
                        {/**merchants routes*/}
                        <Route path="/admin/merchant-categories" exact component={MerchantCategories} />
                        <Route path="/admin/merchant-transactions" exact component={MerchantTransactions} />
                        <Route path="/admin/create-merchant" exact component={MerchantForm}/> 
                        <Route path="/admin/merchants"  exact component={AllMerchants}/>

                        {/**users routes */}
                        <Route path="/admin/user-transactions"  component={UserTransactions} />
                        <Route path="/admin/users"  component={Users} />

                        {/**Referals route */}
                        <Route path="/admin/referals"  component={Referals} />
                        
                        {/**Wallet account route */}
                        <Route path="/admin/wallets"  component={Wallets} />

                        {/**Agents account route */}
                        <Route path="/admin/agents"  component={Agents} />

                        <Redirect from="/admin" to="/admin/dashboard" />
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </>
    );
}