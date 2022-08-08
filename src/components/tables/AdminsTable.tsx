import moment from "moment";
import { AdminOptions } from "../dropdowns/AdminsTableDropdown";

interface AppProps{
    data : any[];
    resetPassword:Function;
    blockAdmin : Function,
    editAdmin:Function
}

const AdminsTable = ({data,resetPassword,blockAdmin,editAdmin}:AppProps):JSX.Element => (
    <>
    {
    Array.isArray(data) && data.map(a=>(
        <tr  className='cursor-pointer text-sm'>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {moment(a.createdAt).format('DD/MM/YYYY')}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a.name}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a?.email}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a?.account_type}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
                <p className="text-gray-900 whitespace-no-wrap">
                    {a?._role?.name}
                </p>
            </td>
            <td className="text-left px-5 py-5 border-b border-gray-200 bg-white">
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
        <td className="text-left px-2 py-2 border-b border-gray-200 bg-white">
            <AdminOptions 
                    resetPassword={()=>resetPassword(a?._id)} 
                    blockAdmin={()=>blockAdmin(a?._id,a?.blocked)} 
                    isBlocked={a?.blocked}
                    editAdmin={()=>editAdmin(a?._id)}
                    />
        </td>    
     </tr>
    ))
    }
    </>
)
export default AdminsTable;