import { formatCurrency, formatDate } from "../../utils/Date";
import{FaThumbsDown}from 'react-icons/fa'

interface AppProps{
    data : any[];
    setTransaction:Function;
    setShowModal:Function;
}

const PendingPayoutsTable = ({data,setShowModal,setTransaction}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map((s,index)=>(
        <tr  className='cursor-pointer' key={index} data-item={s}>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatDate(s.createdAt)}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.description}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s?.admin?.name}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.amount}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.recipient_account_number}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.recipient_account_name}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.recipient_account_issuer}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 text-sm text-blue-500 hover:underline">  
                <button 
                    className="font-semibold whitespace-no-wrap"
                    onClick = {()=>{
                            setTransaction(s)
                            setShowModal(true)
                        }}
                        >
                        Verify Details
                </button>
            </td>
        </tr>
    ))
    }
    </>
)
export default PendingPayoutsTable;