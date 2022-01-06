import React from "react";

type AppPops = any;

const  PaidHighLightTable = ({transactions}:{transactions:AppPops}):JSX.Element => (
    <>
    {
      
      transactions?.map((t:any) => (
        <tr>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              {t?.createdAt}
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
              {t.time}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {t.customerName}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">             
          <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
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

export default PaidHighLightTable;