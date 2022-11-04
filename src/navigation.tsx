import React, {  Suspense,lazy } from 'react';
import { HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import {AnimatePresence}  from 'framer-motion';
import Layout from './components/views/layout/Layout'
import PageLoading from './components/views/layout/PageLoading'
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import NotFound from './components/views/404/NotFound';
import ProtectedRoute from './components/protected/Protected';

const Dashboard = lazy(()=>import('./components/views/Dashboard'))
const Login = lazy(()=> import('./components/views/auth/Login'))
const UserTransactions = lazy(()=>import('./components/views/users/UserTransactions'))
const Users =  lazy(()=>import('./components/views/users/Users'))
const MerchantForm = lazy(()=>import('./components/forms/MerchantForm'))
const Wallets = lazy(()=>import('./components/views/wallet/WalletAccounts'))
const OnboardingMerchants = lazy(()=>import('./components/views/merchant/Merchants'))
const PaidTransactions = lazy(()=>import('./components/views/paid/PaidTransactions'))
const MerchantCategories = lazy(()=>import('./components/views/merchant/MerchantCategory'))
const MerchantTransactions = lazy(()=>import('./components/views/merchant/MerchantTransactions'))
const Referals = lazy(()=>import('./components/views/referals/Referals'));
const Agents = lazy(()=>import('./components/views/agents/Agents'))
const FailedTransactions = lazy(()=>import('./components/views/failed/FailedTransactions'))
const Charges = lazy(()=> import('./components/views/charges/Charges'));
const BroadCastMessage = lazy(()=>import('./components/views/broadcast/Broadcast'))
const Settlement = lazy(()=>import('./components/views/settlement/Settlement'))
const AllSettlements = lazy(()=>import('./components/views/settlement/AllSettlements'))
const SettlementApprovals = lazy(()=>import('./components/views/settlement/Approvals'))
const ElevyTransactions = lazy(()=>import('./components/views/elevy/Transactions'))
const ElevyTransactionsDetails = lazy(()=>import('./components/views/elevy/TransactionDetails'))
const WalletTrasactions=lazy(()=>import('./components/views/wallet/WalletTransactions'))
const CreateAdmin=lazy(()=>import('./components/views/admin/CreateAdmin')) 
const AllAdmins=lazy(()=>import('./components/views/admin/AllAdmins'))
const EditAdmin=lazy(()=>import('./components/views/admin/EditAdmin'))
const AllRoles=lazy(()=>import('./components/views/roles/AllRoles'))
const AddRole =lazy(()=>import('./components/views/roles/AddRole'))
const EditRole=lazy(()=>import('./components/views/roles/EditRole'))
const ChangePasswordForm=(lazy(()=>import('./components/views/changepassword/ChangePasswordForm')))
const ApprovedMerchants=(lazy(()=>import('./components/views/config/Merchants')))
const MerchantApps= (lazy(()=>import('./components/views/config/MerchantApps')))
const DirectDebit=(lazy(()=>import('./components/views/directdebit/DirectDebit')))
const DirectCredit=(lazy(()=>import('./components/views/directdebit/DirectCredit')))
const PendingReversals=(lazy(()=>import('./components/views/reversals/Approvals')))
const InitiateDirectPayout=(lazy(()=>import('./components/views/directpayout/InitiatePayoutPage')))
const PayoutApprovals=(lazy(()=>import('./components/views/directpayout/PayoutApprovals')))
const VerifyOtp = (lazy(() => import('./components/views/login-otp/VerifyOtp')));
const AddDocuments = (lazy(() => import('./components/views/merchant/AddDocuments')));

// create a component
const Navigation=()=>{

    return (
        <HashRouter>
                <div className='App'>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoading/>}>
                        <AnimatePresence exitBeforeEnter>
                          <Routes>
                            <Route  path='*' element={<NotFound/>} />
                            <Route  path='login' element={<Login/>} />
                            <Route path="change-password"  element={<ChangePasswordForm/>}/>
                            <Route path="verify" element={<VerifyOtp />} />
                            <Route  path='/'  element={ <ProtectedRoute><Layout/></ProtectedRoute>}>
                            <Route path="/" element={<Navigate to="dashboard"/>} />
                                
                                <Route path="dashboard" element={<Dashboard/>}/>

                                 {/**Manage Admins */}
                                 <Route path="manage-admins">
                                    <Route path="new"  element={<CreateAdmin/>}/>
                                    <Route path="all" element={<AllAdmins/>}/>
                                    <Route path="edit" element={<EditAdmin/>}/>

                                    {/**Roles */}
                                     <Route path="roles">
                                        <Route index={true} element={<AllRoles/>} />
                                        <Route path="new"  element={<AddRole/>} />
                                        <Route path="edit"  element={<EditRole/>} />
                                     </Route>
                                </Route>

                                 {/**Merchant Config*/}
                                 <Route path="configurations">        
                                </Route>

                                {/**Transactions route */}
                                <Route path="transactions">
                                    <Route index={true}  element={<UserTransactions/>} />
                                </Route>

                                 {/**users routes */}
                                 <Route path="users">
                                    <Route path="all"  element={<Users/>} />
                                </Route>

                                {/**Elevy routes*/} 
                                <Route path="e-levy">
                                    <Route index={true} element={<ElevyTransactions/>}/>
                                    <Route path="transactions"  element={<ElevyTransactionsDetails/>}/>
                                </Route>

                                    {/**Settlement */}
                                <Route path="merchant-settlement">  
                                    <Route path="new"  element={<Settlement/>}/>
                                    <Route path="all"  element={<AllSettlements/>}/>
                                    <Route path="approvals"  element={<SettlementApprovals/>}/>
                                </Route>

                                {/**Merchants routes*/}
                                <Route path="merchants">
                                    <Route path="all/approved" element={<ApprovedMerchants/>}/>
                                    <Route path="apps" element={<MerchantApps/>}/>
                                    <Route path="categories"  element={<MerchantCategories/>} />
                                    <Route path="transactions"  element={<MerchantTransactions/>} />
                                    <Route path="create-merchant"  element={<MerchantForm/>}/> 
                                    <Route path="all/onboarding"   element={<OnboardingMerchants/>}/>
                                    <Route path="add-documents" element={<AddDocuments />} />
                                </Route>

                                {/**Wallet account route */}
                                <Route path="wallets">
                                    <Route index={true}  element={<Wallets/>} />
                                    <Route path="transactions"  element={<WalletTrasactions/>} />
                                </Route>

                                {/**Direct Payout route */}
                                <Route path="payout">
                                    <Route path="initiate"  element={<InitiateDirectPayout/>} />
                                    <Route path="approvals" element={<PayoutApprovals/>} />
                                </Route>

                                {/**Direct Debit*/}
                                <Route path="direct-debit" element={<DirectDebit/>}/>
                                <Route path="direct-credit" element={<DirectCredit/>}/>



                                    {/**paid transactions */}
                                <Route path='allpaid-transactions' element={<PaidTransactions/>} />

                                {/**paid / successf transactions */}
                                <Route path='allfailed-transactions' element={<FailedTransactions/>} />

                                {/**failed transactions */}
                                <Route path='allpaid-charges' element={<Charges/>} />
                               
                                {/**Referals route */}
                                <Route path="referrals"  element={<Referals/>} />
                                
                                 {/**Reversals route */}
                                <Route path="reversals/pending"  element={<PendingReversals/>} />
                                
                                {/**Agents account route */}
                                <Route path="agents"  element={<Agents/>}/> 

                                {/**BroadCast Message */}
                                <Route path="sms-broadcast"  element={<BroadCastMessage/>}/>                              
                        
                            </Route>
                        </Routes>
                       </AnimatePresence>
                    </Suspense>
                </ErrorBoundary>
                </div>
            </HashRouter>
    )
};

export default Navigation;
