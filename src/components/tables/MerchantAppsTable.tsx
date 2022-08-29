import React from 'react';
import SwitchButton from '../buttons/SwitchButton';
import {formatDate} from '../../utils/Date'
import AppsTableOptions from '../dropdowns/AppsTableDropdown';

type AppProps = {
 apps:any[],
 toggleDisbursement:Function
}

 
const MerchantsConfigTable = ({apps,toggleDisbursement}:AppProps): JSX.Element=>(
  <>
  {
    apps.map((a:any)=>(
        <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap">{formatDate(a.createdAt)}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <p className="text-gray-900 whitespace-no-wrap">{a?.name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">GHS {a?.momoTransactionCharge}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">GHS {a?.cardTransactionCharge}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                <span className="relative">GHS {a?.disbursementCharge}</span>
            </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            <SwitchButton 
                value={a?.disbursementPool} 
                action={()=>toggleDisbursement(a?._id)}
                status={a?.disbursementPool && (a?.disbursementPool ==='CLOSED')?false:true}
                />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <AppsTableOptions
              blockApp={()=>{}}
              seeDetails={()=>{}}
              isBlocked={false}/>
        </td>
    </tr>
    ))
}
  </>
  )

export default MerchantsConfigTable;