import { formatCurrency, formatDate } from "../../utils/Date";
import{FaThumbsDown}from 'react-icons/fa'

interface AppProps{
    data : any[];
    approve: Function;
    setSettlementId:Function;
    setShowModal:Function;
}

const PendingSettlementsTable = ({data,approve,setShowModal,setSettlementId}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map((s,index)=>(
        <tr  className='cursor-pointer hover:bg-green-100' key={index} data-item={s}>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatDate(s.createdAt)}
                </p>
            </td>
            {/* <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.merchantId}
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
            {/* <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.accountType}
                </p>
            </td> */}
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatCurrency(s.amount)}
                </p>
            </td>
            {/* <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-md"></span>
                <span className="relative">{s.status}</span>
             </span>
            </td> */}
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="inline-flex space-x-1">
                    <button 
                        className="font-semibold rounded-md bg-sgreen flex items-center text-green-500 whitespace-no-wrap px-3 py-1 hover:bg-green-800 shadow-inner clicked:bg-green-800"
                        onClick = {()=>approve(s._id)}
                    >
                        <i className="fas fa-thumbs-up mr-1 text-white"/>
                        <span className="text-white">Approve</span>
                    </button>
                    <button 
                        className="font-semibold rounded-md bg-red-500 flex items-center text-white whitespace-no-wrap px-1 py-1 hover:bg-red-800 shadow-inner"
                        onClick = {()=>{
                            setSettlementId(s._id)
                            setShowModal(true)
                        }}
                        >
                        <FaThumbsDown className="mr-1 text-white"/>
                        <span className="text-white">Decline</span>
                    </button>
                </div>
            </td>
</tr>
    ))
    }
    </>
)
export default PendingSettlementsTable;