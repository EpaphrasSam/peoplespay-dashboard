import  React from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route,Routes} from 'react-router-dom';
import state from './state/state';
//import jwt_decode from 'jwt-decode'



import Login from './components/views/auth/Login';
import Layout from './components/views/layout/Layout'
// views
import Dashboard from "./components/views/Dashboard";
import MerchantForm from './components/forms/MerchantForm'
import MerchantCategories from './components/views/merchant/MerchantCategory'
import MerchantTransactions from './components/views/merchant/MerchantTransactions'
import UserTransactions from "./components/views/users/UserTransactions";
import Wallets from './components/views/wallet/WalletAccounts';
import Referals from './components/views/referals/Referals'
import Agents  from "./components/views/agents/Agents";
import Users from './components/views/users/Users'
import AllMerchants from './components/views/merchant/Merchants'

import PaidTransactions from './components/views/paid/PaidTransactions'
import FailedTransactions from './components/views/failed/FailedTransactions';
import Charges from './components/views/charges/Charges'


import './App.css';

function App() {

    // try{
    //   const _token:string | null = localStorage.getItem('token')
    //   const decoded:any = jwt_decode(String(_token))
    //   const {exp} = decoded;
    //   const isExpired:boolean = exp * 1000 <= Date.now()
    //   console.log(isExpired)
    //   if(!_token || isExpired){
    //    window.localStorage.clear();
    //    <Navigate to='/login' />
    //   }        
    // }catch(err){
    //   <Navigate to='/login'/>
    // }
      
  return (
    <Provider store = {state}>
      <HashRouter>
          <div className='App'>
              <Routes>
                  <Route  path='/login' element={<Login/>} />
                 
                  <Route  path='/' element={<Layout/>}>

                        <Route path="/"  element={<Dashboard/>}/>
                        
                          {/**paid transactions */}
                        <Route path='allpaid-transactions' element={<PaidTransactions/>} />

                         {/**paid / successf transactions */}
                         <Route path='allfailed-transactions' element={<FailedTransactions/>} />

                         {/**failed transactions */}
                         <Route path='allpaid-charges' element={<Charges/>} />

                          {/**merchants routes*/}
                        <Route path="merchant-categories"  element={<MerchantCategories/>} />
                        <Route path="merchant-transactions"  element={<MerchantTransactions/>} />
                        <Route path="create-merchant"  element={<MerchantForm/>}/> 
                        <Route path="merchants"   element={<AllMerchants/>}/>

                        {/**users routes */}
                        <Route path="user-transactions"  element={<UserTransactions/>} />
                        <Route path="users"  element={<Users/>} />

                        {/**Referals route */}
                        <Route path="referals"  element={<Referals/>} />
                        
                        {/**Wallet account route */}
                        <Route path="wallets"  element={<Wallets/>} />

                        {/**Agents account route */}
                        <Route path="agents"  element={<Agents/>}/> 
                 </Route>
              </Routes>
          </div>
        </HashRouter>
      </Provider>
       );
}

export default App;
