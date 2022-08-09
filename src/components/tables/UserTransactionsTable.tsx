
const swal = require('@sweetalert/with-react');

interface AppProps{
    transactions : any[],
    addId : Function,
    reverseIds:any[]
    checked:boolean
}

const UserTransactionsTable = ({transactions, addId, reverseIds,checked}:AppProps):JSX.Element => (
    <>
    {
    transactions.length > 0 ? transactions.map(t=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200'>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {t.description}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {t.createdAt}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{t.time}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap uppercase">
                    {t.customerName}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap uppercase">
                    {t.recipientName}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {t.amount}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {t.charges}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    GHS{t.elevyCharges}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {
                    t.debit_status === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                        <span aria-hidden
                            className="absolute inset-0 bg-sgreen rounded-md"></span>
                        <span className="relative">Paid</span>
                    </span>
                    )
                    : 
                    t.debit_status === 'failed' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                        <span aria-hidden
                            className="absolute inset-0 bg-red-500 rounded-md"></span>
                        <span className="relative">Failed</span>
                </span>
                    ):
                    (
                    <span
                    className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-md"></span>
                    <span className="relative uppercase">{t.debit_status}</span>
                </span>
                    )
                }

            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                {
                    t.status === 'PAID' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                        <span aria-hidden
                            className="absolute inset-0 bg-sgreen rounded-md"></span>
                        <span className="relative">Paid</span>
                    </span>
                    )
                    :  t.status === 'FAILED' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-white leading-4 tracking-widest">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-500 rounded-md"></span>
                    <span className="relative">Failed</span>
                </span>
                    ):
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-yellow-200 rounded-md"></span>
                    <span className="relative">Authorization Pending</span>
                </span>
                )
                }
                
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  border-t-0 border-l-0 border-r-0">
                <p className="text-gray-900 whitespace-no-wrap text-left">
                    {
                        t.payment_account_type === 'momo' ? 
                        (
                        <>
                        <i className="fas fa-circle text-yellow-300 mr-2"></i>
                        Momo
                        </>
                        )
                        : t.payment_account_type === 'wallet' ? 
                        (
                            <>
                        <i className="fas fa-circle text-indigo-500 mr-2"></i>
                        Wallet
                        </> 
                        ) 
                        :
                        (
                            <>
                            <i className="fas fa-circle text-green-500 mr-2"></i>
                        Card
                            </>
                        )
                    }
                
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input 
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                        type="checkbox"
                        disabled={checked && reverseIds?.includes(t._id)===false?true:false}
                        onClick={()=>addId(t._id)}
                />
                <i className="far fa-eye" onClick={()=>{
                    swal(
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
                                    <h3 className='text-red-800'>Total Amount</h3>
                                        <h5>{t.amount}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Charge</h3>
                                        <h5>{t.charges}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Amount</h3>
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
                                        <h5>{t?.paymentIssuer}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Reason</h3>
                                        <h5>{t.getReason() || ''}</h5>
                                </div>
                                </div> 
                            </div>
                                )
                }}/>
            </td>
</tr>
    )) :
     "No transactions to display"
    }
    </>
)
export default UserTransactionsTable;