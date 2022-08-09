import React from 'react';
import UsersTableOptions from '../dropdowns/UsersTableDropdown';
import UsersTableDropdown from '../dropdowns/UsersTableDropdown';
import {formatDate} from '../../utils/Date'
type AppProps = {}[]

const UsersTable = ({users}:{users:AppProps}):JSX.Element => (
<>
{
    users.map((u:any)=>(
        <tr>
        <th className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className=
                "text-blueGray-600"
            >
                {formatDate(u.createdAt)}
            </span>
        </th>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {u.fullname}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {u.email}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {u.phone}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {u?.blocked 
              ?
              (
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-500 rounded-md"></span>
                    <span className="relative">Blocked</span>
                </span>     
            ) 
              : 
              (
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-sgreen leading-4 tracking-widest">
                    <span aria-hidden
                    className="absolute inset-0 bg-gray-50 rounded-md"></span>
                    <span className="relative">Active</span>
                </span>
              )
              }
        
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <i className="fas fa-check text-green-500 mr-2"></i>{u?.phone_verified?'Verified':'Not Verified'}
        </td> 
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <UsersTableDropdown 
             blockUser={()=>{}}
             seeDetails={()=>{}}
             isBlocked
            />
        </td> 
    </tr>
    ))
}
</>    
)
export default UsersTable;
