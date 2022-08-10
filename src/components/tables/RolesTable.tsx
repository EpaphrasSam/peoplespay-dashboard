import { formatDate } from "../../utils/Date";

interface AppProps{
    data : any[];
    onEditClick:Function;
}

const RolesTable = ({data,onEditClick}:AppProps):JSX.Element => (
    <>
    {
    data.length>0? data.map(a=>(
        <tr  className='cursor-pointer text-sm'>
            <td>
                <input className="ml-3 form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer" type="checkbox" value="" id="flexCheckDefault3"/>
            </td> 
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {formatDate(a.createdAt)}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a.name}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a?.description}
                </p>
            </td>
            <td className="px-2 py-2 border-b border-gray-200 bg-white text-left">
              {!a?.blocked
              ?
              (
              <span
                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span aria-hidden
                    className="absolute inset-0 bg-sgreen rounded-md"></span>
                <span className="relative"> Active </span>
              </span>
            ) 
              : 
              (
                <span
                className="relative inline-block px-3 py-1 font-semibold text-white leading-tight tracking-wide">
                <span aria-hidden
                    className="absolute inset-0 bg-red-500  rounded-md"></span>
                <span className="relative">Blocked</span>
            </span>
              )
              }
        </td>   
     </tr>
    )):
    'No records found'
    }
    </>
)
export default RolesTable;