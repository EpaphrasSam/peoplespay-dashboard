import moment from "moment";

interface AppProps{
    data : any[];
    approve: Function;
    loading:boolean;
}

const PendingSettlementsTable = ({data,approve,loading}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(s=>(
        <tr  className='cursor-pointer hover:bg-green-100'>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {moment(s.createdAt).format('DD/MM/YYYY')}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s.merchantId}
                </p>
            </td>
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
                    <span className="relative">{moment(s.startDate).format('DD/MM/YYYY')}</span>
                </span>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
                    <span className="relative">{moment(s.endDate).format('DD/MM/YYYY')}</span>
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
                    {s.amount}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span className="relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight">
                <span aria-hidden className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                <span className="relative">{s.status}</span>
             </span>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button 
                className="font-semibold rounded-full bg-green-200 flex items-center text-green-500 whitespace-no-wrap px-3 py-1"
                onClick = {()=>approve(s._id)}
                >
                    <i className="fas fa-thumbs-up mr-1 "/>
                     {loading? 'approving...':'approve'}
                </button>
            </td>
</tr>
    ))
    }
    </>
)
export default PendingSettlementsTable;