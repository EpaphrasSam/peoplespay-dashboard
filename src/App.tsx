import  React,{useEffect} from 'react';
//import { ErrorBoundary } from 'react-error-boundary';
import {Provider} from 'react-redux';
import { HashRouter, Route,Routes} from 'react-router-dom';
import state from './state/state';
import AuthService from './services/auth.service';




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


import './App.css';
import Utils from './utils/AuthToken';


function App() {

useEffect(()=>{
  const timer = setInterval(async()=>{
   const email:any = 'admin@peoplepay.com'
   const password:any = '12345'
   const response = await AuthService.login({
     email : email,
     password : password
   })
   
   Utils.setAuthToken(response.token,)
   console.log('started again')

  }, 1640083044)
  return () => clearInterval(timer);
},[])

  return (
    <Provider store = {state}>
      <HashRouter>
          <div className='App'>
              <Routes>
                  <Route  path='/login' element={<Login/>} />
                 
                  <Route  path='/' element={<Layout/>}>

                        <Route path="/"  element={<Dashboard/>}/>
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
