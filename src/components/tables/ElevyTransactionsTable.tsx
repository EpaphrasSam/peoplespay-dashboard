import moment from "moment";

interface AppProps{
    data : any[],
    goTo : Function,
}

const ElevyTransactionsTable = ({data,goTo}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(s=>(
        <tr  className='cursor-pointer hover:bg-green-100 click:bg-green-200 text-sm'>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {moment(s.date).format('DD/MM/YYYY')}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s._id}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s?.count}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s?.totalAmount}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {s?.taxableAmount}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
              <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">GHS  {s?.amount}</span>
                </span>
            </td>   
            <td className="text-left px-2 py-2 border-b border-gray-200 bg-white">
                <p className="whitespace-no-wrap">
                   <button onClick={()=>goTo(s.transactions)} className="text-md font-segoe text-blue-600 tracking-tight py-3 px-2 hover:underline">Details</button> 
                </p>
            </td>    
     </tr>
    ))
    }
    </>
)
export default ElevyTransactionsTable;