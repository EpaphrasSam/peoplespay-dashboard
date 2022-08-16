import Checkbox from "../buttons/Checkbox";

type AccessProps={
    accessClick:Function;
    permissionClick:Function
}
const AccessTable= ({accessClick,permissionClick}:AccessProps)=>{
 
    return(
        <div>
             <h1 className="text-left text-lg">Access Tables</h1>
             <table className="border-separate border-spacing-2 border border-slate-400 w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-300 w-1/3 py-4">Menu</th>
                        <th className="border border-slate-300 py-4">Pages</th>
                        <th className="border border-slate-300 py-4">Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Dashboard</td>
                        <td className="border border-slate-300 text-left py-4">
                          <div className="form-check">
                                <Checkbox value="dashboard" name="Index Page" click={accessClick} />
                                <label className="form-check-label inline-block text-gray-800">
                                    Index Page
                                </label>
                           </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                        <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Index Page" click={permissionClick} isChecked={false}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                             <Checkbox value="write" name="Index Page" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Index Page" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Manage Admins</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                    <Checkbox value="manage-admins/new" name="New Administrator" click={accessClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        New Administrator
                                    </label>
                            </div> 
                            <div className="form-check">
                                    <Checkbox value="manage-admins/all" name="All Administrators" click={accessClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        All Administrators
                                    </label>
                            </div> 
                            <div className="form-check">
                                    <Checkbox value="manage-admins/roles" name="Administrator Roles" click={accessClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Administrator Roles
                                    </label>
                            </div> 
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="New Administrator" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                             <Checkbox value="write" name="New Administrator" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="New Administrator" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="All Administrators" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="All Administrators" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="All Administrators" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Administrator Roles" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Administrator Roles" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Administrator Roles" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Configurations</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="configurations/charges" name="Charges" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Charges
                                </label>
                            </div>
                            <div className="form-check">
                                <Checkbox value="configurations/merchants" name="Merchant Apps" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Merchant Apps
                                </label>
                            </div>
                            <div className="form-check">
                                <Checkbox value="configurations/customer-profile" name="Customer Profile" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Customer Profile
                                </label>
                            </div> 
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="read" name="Charges" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="Charges" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="Charges" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                            <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Merchant Apps" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Merchant Apps" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Merchant Apps" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                 <Checkbox value="read" name="Customer Profile" click={permissionClick}/>    
                                 <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Customer Profile" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Customer Profile" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Users</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="users/all" name="Users" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Users 
                                </label>
                            </div>
                            <div className="form-check">
                                <Checkbox value="users/transactions" name="User Transactions" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    User Transactions 
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                        <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Users" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Users" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Users" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="User Transactions" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="User Transactions" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="User Transactions" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Elevy</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="e-levy" name="Elevy Records" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Elevy Records 
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                        <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Elevy Records" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Elevy Records" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Elevy Records" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Settlement</td>
                        <td className="border border-slate-300 text-left py-4">
                          <div className="form-check">
                                <Checkbox value="merchant-settlement/new" name="Initiate Settlement" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Initiate Settlement 
                                </label>
                            </div>
                            <div className="form-check">
                                <Checkbox value="merchant-settlement/approvals" name="Approvals" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Approvals
                                </label>
                            </div>
                            <div className="form-check">
                                <Checkbox value="merchant-settlement/all" name="Settlements History" click={accessClick}/>                 
                                <label className="form-check-label inline-block text-gray-800">
                                   Settlements History
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                        <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Initiate Settlement" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Initiate Settlement" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Initiate Settlement" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Approvals" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Approvals" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Approvals" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                          <div className="form-check flex space-x-5">
                             <div>
                                <Checkbox value="read" name="Settlements History" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Read
                                </label>
                             </div>
                             <div>
                                <Checkbox value="write" name="Settlements History" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Write
                                </label>
                             </div>
                             <div>
                                <Checkbox value="delete" name="Settlements History" click={permissionClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Delete
                                </label>
                             </div> 
                          </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Direct Debit</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="direct-debit" name="Direct Debit" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Direct Debit
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="read" name="Direct Debit" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="Direct Debit" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="Direct Debit" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Merchants</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="merchants/all" name="Merchants" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                  Merchants
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="read" name="Merchants" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="Merchants" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="Merchants" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Wallets</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="wallets" name="All Wallets" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    All Wallets
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="read" name="All Wallets" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="All Wallets" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="All Wallets" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Referals</td>
                        <td className="border border-slate-300 text-left py-4">
                             <div className="form-check">
                                <Checkbox value="referrals/all" name="Referrals" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Referrals
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="read" name="Referrals" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="Referrals" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="Referrals" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 text-left py-4">Broadcast Message</td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check">
                                <Checkbox value="sms-broadcast" name="Sms Broadcast" click={accessClick}/>
                                <label className="form-check-label inline-block text-gray-800">
                                    Sms Broadcast
                                </label>
                            </div>
                        </td>
                        <td className="border border-slate-300 text-left py-4">
                            <div className="form-check flex space-x-5">
                                <div>
                                    <Checkbox value="broadcast-message" name="Sms Broadcast" click={accessClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Read
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="write" name="Sms Broadcast" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Write
                                    </label>
                                </div>
                                <div>
                                    <Checkbox value="delete" name="Sms Broadcast" click={permissionClick}/>
                                    <label className="form-check-label inline-block text-gray-800">
                                        Delete
                                    </label>
                                </div> 
                            </div>
                        </td>
                    </tr>
                </tbody>
           </table>
        </div>
      )
    }
export default AccessTable;