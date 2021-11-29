import React from 'react';
import {useSelector} from 'react-redux';
import {merchantsSelector} from '../../state/merchant.state'
const QRCode = require('qrcode.react');



const MerchantDetails:React.FC = () => {
    
    const {selected} = useSelector(merchantsSelector)
    console.log(selected)

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
                                "px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500"
                            >
                                <button
                                        className="font-sans bg-red-800 text-white  font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        edit
                                </button>
                            </th>
                            <th
                                className={
                                    "px-6  py-3 text-xs uppercase whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500"
                                }
                            >
                               <button
                                        className="font-sans bg-red-800 text-white  font-bold uppercase text-xs px-10 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        download
                                </button>
                            </th>
                        </tr>
                        <tr>
                            <th
                                className=
                                "px-6 align-middle  py-3 text-xs uppercase whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500"
                            >
                                <button
                                        className="font-sans bg-red-800 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        generate qrcode
                                </button>
                            </th>
                            <th
                                className={
                                    "px-6  py-3 text-xs uppercase  whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 "
                                }
                            >
                               <button
                                        className="font-sans bg-red-800 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button"
                                    >
                                        generate terminal id
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {/** qrcode*/}
                        <div className='ml-40 w-12'>
                          <QRCode value={`"${selected?.qrcode}"`} />,
                        </div>

                        <tr className='bg-gray-100'>
                            <td className="font-sans  border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Merchant Id
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.merchant_id}  
                            </td>
                        </tr>    
                        <tr>
                            <td className=" font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Merchant phone
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.phone}   
                            </td>
                        </tr>    
                        <tr className='bg-gray-100'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Merchant email
                            </td>
                            <td className="border-t-0  px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.email}   
                            </td>
                        </tr>    
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Acceptor Point Name
                            </td>
                            <td className="border-t-0 px-6 text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.acceptor_pointname}   
                            </td>
                        </tr>    
                        <tr className='bg-gray-100'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Acceptor Point Location
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.acceptor_pointlocation}   
                            </td>
                        </tr>    
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Position Id
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.positionId}   
                            </td>
                        </tr>
                        <tr className='bg-gray-200'>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Site Id
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.siteId}   
                            </td>
                        </tr> 
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Contact Person
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.account_name}    
                            </td>
                        </tr>  
                        <tr>
                        <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Terminal Id
                        </td>
                        <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.reason}    
                        </td>
                        </tr>    
                         {/**details */}
                         <div className="rounded-t mb-0 px-4 py-3 border-0 ">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className=
                                        "font-semibold text-lg text-blueGray-700 justify-center"
                                    >
                                        Payment Details
                                    </h3>
                                </div>
                            </div>
                        </div> 
                        {/** */}
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             Account Number
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.account_number}    
                            </td>
                        </tr> 
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Account Type
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.account_type}    
                            </td>
                        </tr> 
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Acciount Issuer Name
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.account_issuer_name}    
                            </td>
                        </tr>
                        {/** */}
                        <div className="rounded-t mb-0 px-4 py-3 border-0 ">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3
                                        className=
                                        "font-semibold text-lg text-blueGray-700 justify-center"
                                    >
                                        Transactions
                                    </h3>
                                </div>
                            </div>
                        </div> 
                        {/** */}
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Total Payments
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {`GH¢ ${Number.parseFloat(selected?.total_payments_received).toFixed(2)}`}    
                            </td>
                        </tr> 
                        <tr>
                            <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Total paid
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.reason}    
                            </td>
                        </tr> 
                        <tr>
                           <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Total failed
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected[0]?.reason}    
                            </td>
                        </tr> 
                        <tr>
                           <td className="font-sans border-t-0  text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                Total Transaction Count
                            </td>
                            <td className="border-t-0 px-6 align-middle text-left border-l-0 border-r-0 text-xs whitespace-nowrap p-4 font-sans text-red-900 font-bold">
                            {selected?.total_transaction_count}    
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

export default MerchantDetails;