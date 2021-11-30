import React from 'react';
import moment from "moment"


type AppProps = any[]

 
const WalletsTable = ({wallets}:{wallets:AppProps}): JSX.Element=>(
  <>
  {
    wallets.map((t:any)=>(
        <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center">
                <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {t._id}
                    </p>
                </div>
            </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">{t.customerId}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                {t.type}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">{ Number.parseFloat(t.totalBalance).toFixed(2)}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                {moment(t.createdAt).format('YYYY/MM/DD')}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                {moment(t.updatedAt).format('YYYY/MM/DD')}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {
                t.active ? 
                (<span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                   
                    <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">true</span>
                </span>
                ) 
                :
                (
                    <span
                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
               
                <span aria-hidden
                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span className="relative">false</span>
            </span>
                )
            }
        </td>
    </tr>
    ))
}
  </>
  )

export default WalletsTable;