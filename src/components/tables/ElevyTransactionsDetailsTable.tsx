import moment from "moment";
import { formatCurrency, formatDate, formatTime } from "../../utils/Date";
//const swal = require('sweetalert')
interface AppProps{
    data : any[],
}

const ElevyTransactionsDetailsTable = ({data}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(t=>(
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
                    {formatDate(t.createdAt)}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{formatTime(t.createdAt)}</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap uppercase">
                    {t.payment_account_name}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap uppercase">
                    {t.recipient_account_name}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatCurrency(t.amount)}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatCurrency(t.charges)}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatCurrency(t.elevyCharges)}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
            {
                    t.debit_status === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-sgreen rounded-md"></span>
                        <span className="relative">Paid</span>
                    </span>
                    )
                    : 
                    t.debit_status === 'failed' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-500  rounded-md"></span>
                    <span className="relative">Failed</span>
                </span>
                    ):
                    (
                    <span
                    className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 rounded-md"></span>
                    <span className="relative uppercase">{t.debit_status}</span>
                </span>
                    )
                }

            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                {
                    t.status === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-sgreen rounded-md"></span>
                        <span className="relative">Paid</span>
                    </span>
                    )
                    :  t.status === 'failed' ? 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-white leading-tight">
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
        </tr>
    ))
    }
    </>
)
export default ElevyTransactionsDetailsTable;


