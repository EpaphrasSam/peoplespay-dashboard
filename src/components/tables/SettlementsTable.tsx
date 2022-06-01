import moment from "moment";

interface AppProps{
    data : any[],
}

const SettlementsTable = ({data}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(s=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200'>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {moment(s.createdAt).isSame(moment(), "day") ? "today" : moment(s.createdAt).isSame(moment().subtract(1, 'day'), "day")? "yesterday":moment(s.createdAt).format('DD/MM/YYYY')}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s._id}
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
                    GHS{Number.parseFloat(s.amount).toFixed(2)}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white text-sm">
            {
                    s.status === 'PAID' ? 
                    (
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">{s.status}</span>
                    </span>
                    )
                    : 
                    (
                        <span
                    className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">FAILED</span>
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