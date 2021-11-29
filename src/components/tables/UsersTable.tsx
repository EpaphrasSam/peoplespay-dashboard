import React from 'react';
import moment from 'moment'

type AppProps = {}[]

const UsersTable = ({users}:{users:AppProps}):JSX.Element => (
<>
{
    users.map((u:any)=>(
        <tr>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <span
                className=
                "ml-3 font-bold text-blueGray-600"
            >
                {moment(u.createdAt).format('YYYY/MMM/DD')}
            </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {u.fullname}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {u.email}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {u.profile}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            {u.account_active 
              ?
              (
              <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span className="relative">active</span>
              </span>
            ) 
              : 
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span className="relative">not active</span>
            </span>
              )
              }
        
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <i className="fas fa-check text-green-500 mr-2"></i> {u.phone_verified}
        </td> 
    </tr>
    ))
}
</>    
)
export default UsersTable;
