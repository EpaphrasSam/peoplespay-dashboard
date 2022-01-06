import React from "react";

type  AppProps = any[];

const FailedHighLightsTable = ({transactions}:{transactions:AppProps}):JSX.Element => (
    <>
    {
        transactions?.map(t => (
          <tr>
             <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {t.time}
             </th>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {t.customerName}
             </td>
             <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
             <span
                className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                <span className="relative">{t.amount}</span>
            </span>
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <p className="text-gray-900 whitespace-no-wrap text-left">
            {
                t.payment_account_type === 'momo' ? 
                (
                 <>
                 <i className="fas fa-circle text-yellow-300 mr-2"></i>
                {t.payment_account_type}
                 </>
                )
                : t.payment_account_type === 'wallet' ? 
                (
                    <>
                 <i className="fas fa-circle text-indigo-500 mr-2"></i>
                {t.payment_account_type}
                 </> 
                ) 
                :
                (
                    <>
                    <i className="fas fa-circle text-green-500 mr-2"></i>
                   {t.payment_account_type}
                    </>
                )
             } 
            </p>
            </td>
          </tr>
        ))
    }
    </>
  );

export default FailedHighLightsTable;