import moment from "moment";
import { formatCurrency, formatDate } from "../../utils/Date";


interface AppProps{
    data : any[],
    setShowModal:Function;
    setSettlement:Function
}

const SettlementsTable = ({data,setShowModal,setSettlement}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(s=>(
        <tr  className='cursor-pointer'>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {moment(s.createdAt).isSame(moment(), "day") ? "today" : moment(s.createdAt).isSame(moment().subtract(1, 'day'), "day")? "yesterday":moment(s.createdAt).format('DD/MM/YYYY')}
                </p>
            </td>
            {/* <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s._id}
                </p>
            </td> */}
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.description}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{formatDate(s.startDate)}</span>
                </span>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{formatDate(s.endDate)}</span>
                </span>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.accountNumber}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.accountName}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.accountIssuerName}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.accountType}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatCurrency(s.amount)}
                </p>
            </td>
            <td className="text-left px-5 py-2 border-b border-gray-200 bg-white text-sm">
            {
                    s.settlementStatus === 'paid' ? 
                    (
                    <span
                        className="relative inline-block px-4 py-1 font-semibold text-white leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-sgreen rounded-md tracking-widest leading-7"></span>
                        <span className="relative">Paid</span>
                    </span>
                    )
                    : s.isDiscarded?
                    (
                    <span
                        className="relative inline-block px-1 font-semibold text-red-500 tracking-widest leading-7">
                        <span aria-hidden className="absolute inset-0 bg-red-100 rounded-md"></span>
                        <span className="relative inline-flex items-center">
                            Declined <i className="fas fa-eye ml-2 text-pink" onClick={()=>{
                                setSettlement(s)
                                setShowModal(true)
                                }}/>
                        </span>
                        
                    </span>
                    ):
                    (
                     <span
                         className="relative inline-block px-4 font-semibold text-white tracking-widest leading-7">
                        <span aria-hidden
                            className="absolute inset-0 bg-red-500 rounded-md"></span>
                        <span className="relative">{s.settlementStatus}</span>
                    </span>
                    )
                }

            </td>
</tr>
    ))
    }
    </>
)
export default SettlementsTable;