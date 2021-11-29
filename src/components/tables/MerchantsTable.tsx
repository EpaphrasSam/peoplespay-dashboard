import React from 'react';
import moment from 'moment'

interface AppProps {
    merchants : {}[],
    handleSelectedId : Function
}

const MerchantsTable = ({merchants,handleSelectedId}:AppProps):JSX.Element => (
<>
{
    merchants.map((m:any)=>(
        <tr className='hover:bg-green-100 click:bg-green-200 cursor-pointer' onClick={()=>{handleSelectedId(m.merchant_id)}}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <span
                className=
                "ml-3 font-bold text-blueGray-600"
            >
                {moment(m.createdAt).format('YYYY/MMM/DD')}
            </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {m.name}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <span
           className="relative inline-block px-3 py-1 font-bold text-green-900 leading-tight">
            <span aria-hidden
             className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">{m.category}</span>
            </span>
        </td> 
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            {m.blocked 
              ?
              (
              <span
                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span className="relative">blocked</span>
              </span>
            ) 
              : 
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span className="relative">not active</span>
            </span>
              )
              }
        
        </td>
    </tr>
    ))
}
</>    
)
export default MerchantsTable;
