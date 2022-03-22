
const swal = require('@sweetalert/with-react');

interface AppProps{
    data : any[],
}

const SettlementsTable = ({data}:AppProps):JSX.Element => (
    <>
    {
    data.map(d=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200'>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {d.description}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.createdAt}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{d.time}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.customerName}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.recipientName}
                </p>
            </td>
            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.customerPhone}
                </p>
            </td> */}
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.amount}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {d.charges}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {
                    d.debit_status === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">PAID</span>
                    </span>
                    )
                    : 
                    d.debit_status === 'failed' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">FAILED</span>
                </span>
                    ):
                    (
                    <span
                    className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative uppercase">{d.debit_status}</span>
                </span>
                    )
                }

            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {
                    d.status === 'PAID' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">{d.status}</span>
                    </span>
                    )
                    :  d.status === 'FAILED' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">{d.status}</span>
                </span>
                    ):
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                    <span className="relative">{d.status}</span>
                </span>
                )
                }
                
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm  border-d-0 border-l-0 border-r-0">
                <p className="text-gray-900 whitespace-no-wrap text-left">
                    {
                        d.payment_account_type === 'momo' ? 
                        (
                        <>
                        <i className="fas fa-circle text-yellow-300 mr-2"></i>
                        {d.payment_account_type}
                        </>
                        )
                        : d.payment_account_type === 'wallet' ? 
                        (
                            <>
                        <i className="fas fa-circle text-indigo-500 mr-2"></i>
                        {d.payment_account_type}
                        </> 
                        ) 
                        :
                        (
                            <>
                            <i className="fas fa-circle text-green-500 mr-2"></i>
                        {d.payment_account_type}
                            </>
                        )
                    }
                
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input 
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                        type="checkbox" 
                        value="" id="flexCheckDefault"
                />
                <i className="far fa-eye" onClick={()=>{
                    swal(
                        <div>
                            <h2 className='text-red-800 font-semibold text-xl'>Transaction Details</h2>
                                <hr className="my-4 md:min-w-full mb-5" />
                                <div className='grid grid-cols-2 gap-4 text-left'>
                                <div className='mb-2 ml-1'>
                                    <h3 className='text-red-800'>transaction ID</h3>
                                        <h5>{d._id}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Customer Reference</h3>
                                        <h5>{d.reference}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>transaction date</h3>
                                        <h5>{d.createdAt}</h5>
                                        {d.time}
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>transaction type</h3>
                                        <h5>{d.transaction_type}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Customer Name</h3>
                                        <h5>{d.customerName}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Customer Phone</h3>
                                        <h5>{d.customerPhone}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Payment Account Number</h3>
                                        <h5>{d.paymentNumber}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Payment Account Name</h3>
                                        <h5>{d.paymentName}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Total Amount</h3>
                                        <h5>{d.amount}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Charge</h3>
                                        <h5>{d.charges}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Amount</h3>
                                        <h5>{d.actualAmount}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Recipient Name</h3>
                                        <h5>{d.recipientName}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Recipient Number</h3>
                                        <h5>{d.recipientNumber}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Recipient Issuer</h3>
                                        <h5>{d.recipientIssuer}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Status</h3>
                                        <h5>{d.status}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Payment Issuer</h3>
                                        <h5>{d?.paymentIssuer}</h5>
                                </div>
                                <div className='mb-2'>
                                    <h3 className='text-red-800'>Reason</h3>
                                        <h5>{d.getReason() || ''}</h5>
                                </div>
                                </div> 
                            </div>
                                )
                }}/>
            </td>
</tr>
    ))
    }
    </>
)
export default SettlementsTable;