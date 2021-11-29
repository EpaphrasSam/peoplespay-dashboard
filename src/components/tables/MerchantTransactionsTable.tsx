import React from "react";
import moment from 'moment'

interface AppProps {
    transactions : any[],
    handleSelectedId : Function
}
 
 

const MerchantTransactions = ({transactions,handleSelectedId}:AppProps):JSX.Element => (
    <>
    {
        transactions.map(t=>(
            <tr className='hover:bg-green-100 click:bg-green-200 cursor-pointer' onClick={()=>{handleSelectedId(t.merchantId._id)}}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <span
                        className=
                        "ml-3 font-bold text-blueGray-600"
                    >
                        {moment(t.createdAt).format('MMM D, YYYY')}
                    </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {moment(t.datetime).format('hh:mm')}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {t.senderAccount}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {t.merchantId.name}   
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {t.trackingNum}   
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                {
                    t.status.toLowerCase() === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-bold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">{t.status}</span>
                    </span>
                    )
                    : t.status.toLowerCase() === 'credit' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-bold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"></span>
                    <span className="relative">{t.status}</span>
                </span>
                    )
                    :
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-bold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">{t.status}</span>
                </span>
                    )
        }
        
                </td>
            </tr>
))
    }
    </>
)
export default MerchantTransactions;