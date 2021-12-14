import  React,{useEffect} from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route,Routes,Navigate} from 'react-router-dom';
import state from './state/state';
import AuthService from "./services/auth.service";
import Utils from './utils/AuthToken';



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
import { setTimeout } from 'timers';

function App() {


  useEffect(()=>
  {
    if (!localStorage.token) {
  
      <Navigate to='/login' />
    }

    const user = {
      email : 'admin@peoplepay.com.gh',
      password : '12345'
    }

    const timer = setTimeout(async()=>{
      try{
        //clear current token
      window.localStorage.clear();

      //login for new token
       const response = await AuthService.login(user)
      
      //save to localStorage
     Utils.setAuthToken(response.token)

      }catch(err:any){
        alert(err.message)
      }
    }, 36000)
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
