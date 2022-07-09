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
        <tr className='hover:bg-green-100 click:bg-green-200 cursor-pointer' onClick={()=>{handleSelectedId(m._id)}}>
        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left flex items-center">
            <span
                className=
                "ml-3 font-bold text-blueGray-600"
            >
                {moment(m.createdAt).format('YYYY/MMM/DD')}
            </span>
        </th>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.merchant_tradeName}
        </td>
        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.lineOfBusiness || m.category}  
        </td> */}
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.submitted 
              ?
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span aria-hidden
                    className="absolute inset-0 bg-sgreen rounded-md"></span>
                <span className="relative">Submitted</span>
            </span>
            ) 
              : 
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span aria-hidden
                    className="absolute inset-0 bg-red-500 rounded-md"></span>
                <span className="relative">Not Submitted</span>
            </span>
              )
              }
        
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 text-left">
            {m.active 
              ?
              (
              <span
                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span aria-hidden
                    className="absolute inset-0 bg-sgreen rounded-md"></span>
                <span className="relative"> Approved </span>
              </span>
            ) 
              : 
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-yellow-200  rounded-md"></span>
                <span className="relative">Pending Approval</span>
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
