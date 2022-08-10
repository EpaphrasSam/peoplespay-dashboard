import React from 'react';
import moment from "moment"
import { formatDate } from '../../utils/Date';


type AppProps = {
 wallets:any[],
 goTo:Function 
}

 
const WalletsTable = ({wallets,goTo}:AppProps): JSX.Element=>(
  <>
  {
    wallets.map((t:any)=>(
        <tr>
        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
                <div>
                    <p className="text-gray-900 whitespace-no-wrap text-left">
                        {t?.walletId}
                    </p>
                </div>
            </div>
        </td> */}
        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap">{t.customerId?._id || t.merchantId?._id}</p>
        </td> */}
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap uppercase">
                {t.customerId?.fullname || t.merchantId.merchant_tradeName}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap">{t?.type==="customer"?"Customer":"Merchant"}</p>
        </td>
        
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">{`₵${Number.parseFloat(t?.totalBalance).toFixed(2)}`}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">{`₵${Number.parseFloat(t?.lastBalance).toFixed(2)}`}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">{`₵${Number.parseFloat(t?.balance).toFixed(2)}`}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">
                    {`₵${Number(t?.totalBalance-t?.balance > 0? t?.totalBalance-t?.balance:0).toFixed(2)}`}
                </span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap">
                {formatDate(t?.updatedAt)}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {
                t?.customerId?.blocked || t?.merchantId?.blocked? 
                (
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                 <span aria-hidden className="absolute inset-0 bg-red-500 rounded-md"></span>
                 <span className="relative">Blocked</span>
                </span>
                ) 
                :
                (
                 <span
                    className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                    <span aria-hidden className="absolute inset-0 bg-sgreen rounded-md"></span>
                    <span className="relative">Active</span>
                 </span>
                )
            }
        </td>
        <td className="text-left px-2 py-2 border-b border-gray-200 bg-white">
                <p className="whitespace-no-wrap">
                   <button onClick={()=>{goTo(t.customerId?._id||t.merchantId?._id,`${t&&t.customerId?.fullname || t&&t.merchantId.merchant_tradeName}`)}} className="text-md font-segoe text-blue-500 tracking-tight py-2 px-2 hover:underline">Transactions</button> 
                </p>
        </td>
    </tr>
    ))
}
  </>
  )

export default WalletsTable;