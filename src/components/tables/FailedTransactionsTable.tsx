

const swal = require('@sweetalert/with-react');


type AppProps = any[]

const UserTransactionsTable = ({transactions}:{transactions:AppProps}):JSX.Element => (
    <>
    {
    transactions.map(t=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200'>
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
            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {t.customerPhone}
                </p>
            </td> */}
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
                    t.debit_status === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">PAID</span>
                    </span>
                    )
                    : 
                    t.debit_status === 'failed' ? 
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
                    <span className="relative uppercase">{t.debit_status}</span>
                </span>
                    )
                }

            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {
                    t.status === 'PAID' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">{t.status}</span>
                    </span>
                    )
                    :  t.status === 'FAILED' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">{t.status}</span>
                </span>
                    ):
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                    <span className="relative">{t.status}</span>
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
)
export default UserTransactionsTable;