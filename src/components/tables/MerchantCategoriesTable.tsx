import React from "react";
import moment from 'moment'

type AppProp = any[]

const MerchantCategoriesTable = ({categories}:{categories:AppProp}):JSX.Element => (
    <>
    { categories.map((c:any,i:any)=>(
        <tr>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {++i}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <span
                className=
                "ml-3 font-bold text-blueGray-600"
            >
                {moment(c.createdAt).format('YYYY/MMM/DD')}
            </span>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {c.name}
        </td>    
        <td className="px-5 py-5 bg-white text-sm">
         {c.active ? 
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
            <span className="relative">blocked</span>
        </span>
         )}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <button className='bg-gray-200'><i className='fas fa-edit text-gray-500 px-5 py-2' /></button>   
        </td>
        
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
          <button className='bg-red-200'><i className='fas fa-trash text-red-500 px-5 py-2' /></button>   
        </td>
    </tr>
    ))
    }
    </>
)

export default MerchantCategoriesTable;