import React from 'react';
import {useSelector} from 'react-redux';
import {transactionsSelector} from '../../state/transactions.state'


const MerchantTransactionDetails:React.FC = () => {
    
    const {selected} = useSelector(transactionsSelector)

    return(
        <><div className="relative md:pt-28 pb-10 p-2 w-full mb-12 px-4">
        <div
            className=
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                            className=
                            "font-semibold text-lg text-blueGray-700"
                        >
                            Details
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                className=
                                "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                            >
                                Title
                            </th>
                            <th
                                className={
                                    "px-6  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                }
                            >
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-gray-100'>
                            <td className="font-sans  border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Merchant Id
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.merchantId?.merchant_id}  
                            </td>
                        </tr>    
                        <tr>
                            <td className=" font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Sender Account
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.senderAccount}   
                            </td>
                        </tr>    
                        <tr className='bg-gray-100'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Sender Account Issuer
                            </td>
                            <td className="border-t-0  px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.senderInstitution}   
                            </td>
                        </tr>    
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Receiver Account
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.receiverAccount}   
                            </td>
                        </tr>    
                        <tr className='bg-gray-100'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Transaction Account
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {`GH¢ ${Number.parseFloat(selected[0]?.transactionAmount).toFixed(2)}`}   
                            </td>
                        </tr>    
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Naration
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.narration}   
                            </td>
                        </tr>
                        <tr className='bg-gray-200'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Transaction Status
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.status}   
                            </td>
                        </tr> 
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Transaction Code
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.reason}    
                            </td>
                        </tr>      
                    </tbody>
                </table>
            </div>
        </div>
    </div>
   </>
    )
}

export default MerchantTransactionDetails;