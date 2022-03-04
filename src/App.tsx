import  React,{lazy, Suspense} from 'react';
import {Provider} from 'react-redux';
import { HashRouter, Route,Routes} from 'react-router-dom';
import state from './state/state';

import Layout from './components/views/layout/Layout'
import PageLoading from './components/views/layout/PageLoading'
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

import './App.css';

const Dashboard = lazy(()=>import('./components/views/Dashboard'))
const Login = lazy(()=> import('./components/views/auth/Login'))
const UserTransactions = lazy(()=>import('./components/views/users/UserTransactions'))
const Users =  lazy(()=>import('./components/views/users/Users'))
const MerchantForm = lazy(()=>import('./components/forms/MerchantForm'))
const Wallets = lazy(()=>import('./components/views/wallet/WalletAccounts'))
const AllMerchants = lazy(()=>import('./components/views/merchant/Merchants'))
const PaidTransactions = lazy(()=>import('./components/views/paid/PaidTransactions'))
const MerchantCategories = lazy(()=>import('./components/views/merchant/MerchantCategory'))
const MerchantTransactions = lazy(()=>import('./components/views/merchant/MerchantTransactions'))
const Referals = lazy(()=>import('./components/views/referals/Referals'));
const Agents = lazy(()=>import('./components/views/agents/Agents'))
const FailedTransactions = lazy(()=>import('./components/views/failed/FailedTransactions'))
const Charges = lazy(()=> import('./components/views/charges/Charges'));
const BroadCastMessage = lazy(()=>import('./components/views/broadcast/Broadcast'))


function App() {
      
  return (
    <Provider store = {state}>
      <HashRouter>
          <div className='App'>
           <ErrorBoundary>
                <Suspense fallback={<PageLoading/>}>
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

                            {/**BroadCast Message */}
                            <Route path="broadcast-message"  element={<BroadCastMessage/>}/> 
                    </Route>
                  </Routes>
                </Suspense>
            </ErrorBoundary>
          </div>
        </HashRouter>
      </Provider>
       );
}
export default App;
