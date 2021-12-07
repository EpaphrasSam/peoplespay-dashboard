import React,{useEffect,useState} from 'react';

const swal = require('@sweetalert/with-react');

type AppProps = any[]

const UserTransactionsTable = ({transactions}:{transactions:AppProps}):JSX.Element => (
    <>
    {
    transactions.map(t=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200'
            onClick = {()=> swal(
            <div>
                <h2 className='text-red-800 font-semibold text-xl'>Transaction Details</h2>
                <hr className="my-4 md:min-w-full mb-5" />
                <div className='grid grid-cols-2 gap-4 text-left'>
                 <div className='mb-2 ml-1'>
                     <h3 className='text-red-800'>transaction ID</h3>
                        <h5>{t._id}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Customer Reference</h3>
                        <h5>{t.reference}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>transaction date</h3>
                        <h5>{t.createdAt}</h5>
                        {t.time}
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>transaction type</h3>
                        <h5>{t.transaction_type}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Customer Name</h3>
                        <h5>{t.customerName}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Customer Phone</h3>
                        <h5>{t.customerPhone}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Payment Account Number</h3>
                        <h5>{t.paymentNumber}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Payment Account Name</h3>
                        <h5>{t.paymentName}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Amount</h3>
                        <h5>{t.amount}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Charge</h3>
                        <h5>{t.charges}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Total Amount</h3>
                        <h5>{t.actualAmount}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Recipient Name</h3>
                        <h5>{t.recipientName}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Recipient Number</h3>
                        <h5>{t.recipientNumber}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Recipient Issuer</h3>
                        <h5>{t.recipientIssuer}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Status</h3>
                        <h5>{t.status}</h5>
                 </div>
                 <div className='mb-2'>
                     <h3 className='text-red-800'>Payment Issuer</h3>
                        <h5>{t.paymentIssuer}</h5>
                 </div>
                </div>
            </div>
        )}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
            <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                    {t.description}
                </p>
            </div>
        </div>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.createdAt}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden
                className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
            <span className="relative">{t.time}</span>
        </span>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.customerName}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.recipientName}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.customerPhone}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.amount}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            {t.charges}
        </p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {
            t.status == 'PAID' ? 
            (
            <span
                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span className="relative">{t.status}</span>
            </span>
            )
            :
            (
                <span
            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
            <span aria-hidden
                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
            <span className="relative">{t.status}</span>
        </span>
            )
        }
        
    </td>
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
            <i className='fas fa-eye text-gray-500'/>
        </p>
    </td>
</tr>
    ))
    }
    </>
)
export default UserTransactionsTable;