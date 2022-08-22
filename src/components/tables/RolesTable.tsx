import { formatDate } from "../../utils/Date";
import RolesTableOptions from '../../components/dropdowns/RoleTableDropdown'

interface AppProps{
    data : any[];
    onEditClick:Function;
    deactivateRole:Function;
}

const RolesTable = ({data,onEditClick,deactivateRole}:AppProps):JSX.Element => (
    <>
    {
    data.length>0? data.map(a=>(
        <tr  className='cursor-pointer text-sm'>
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
              {a?.active
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
                <span className="relative">Disabled</span>
            </span>
              )
              }
        </td>  
        <td className="text-left px-2 py-2 border-b border-gray-200 bg-white">
            <RolesTableOptions 
               editRole ={()=>onEditClick(a)} 
               isActive={a?.active}
               deactivateRole={()=>deactivateRole(a?._id,a?.active)}
             />
        </td>
     </tr>
    )):
    'No records found'
    }
    </>
)
export default RolesTable;