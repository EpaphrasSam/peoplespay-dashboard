import {useState, ChangeEvent} from 'react'
import {useNavigate } from "react-router-dom";
import RolesTable from '../../tables/RolesTable'
import authService from '../../../services/auth.service';
import Spinner from '../layout/Spinner';
import SearchForm from '../../forms/SearchForm';
import { useSelector } from 'react-redux';
import { authSelector} from '../../../state/auth.state';
import { OutlinedButton, PrimaryButton } from '../../buttons/BasicButton';
import {AiOutlinePlus} from 'react-icons/ai'
import{AiOutlineStop}from 'react-icons/ai'
import useFetchRoles from './useFetchRoles';
import RowNumberSelector from '../../buttons/RowNumberSelector';
import PageHeader from '../../header/PageHeader';

function AllAdmins(){
    useFetchRoles()
    const {roles,loading}=useSelector(authSelector)
    let navigate= useNavigate()
    
    const [searchQuery, setSearchQuery] = useState('')
    const [currentIndex, setCurrentIndex] = useState(1)
    const [rowsPerPage,setRowsPerPage] = useState(10)
    
const editRole=async(id:string)=>{
   try{
    const res=await authService.resetPassword(id)
    if(!res.success){
      return alert(res.message)
    }
     alert(res.message)
   }catch(err:any){
    alert(err?.message)
        }
  }

const DeactivateRole=async(id:string,isActive:boolean)=>{
    try{
        const res=await authService.updateRole({
            id : id,
            data:{
                active:!isActive
            }
        })
        if(!res.success)return alert(res.message)
        alert(res.message)
    }catch(err:any){alert(err.message)}
}

const pageRowsHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setRowsPerPage(parseInt(e.target.value))
}

 
const filterResults = roles?.filter((r:any)=>{
  const hasSearchResults:boolean = r?.accountName?.toLowerCase().includes(searchQuery)
  if((hasSearchResults))return r;
})

const results:any[] = filterResults.length === 0 ? roles : filterResults

//Get Current Rows
const indexofLastRow:number = currentIndex*rowsPerPage;
const indexofFirstRow:number = indexofLastRow - rowsPerPage; 
const currentRows = results.slice(indexofFirstRow,indexofLastRow)

 //button actions
 const paginateFront = () => {setCurrentIndex(currentIndex + 1)};
 const paginateBack = () => setCurrentIndex(currentIndex - 1)

    return(
        <div className="relative md:pt-10 pb-10 p-2 w-full mb-12 px-4">
            {/**page heading */}

           <PageHeader title="Roles"/>     

        <div className='flex flex-col md:flex-row md:justify-between'>
       {/**filters */}
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
            <RowNumberSelector value={rowsPerPage} onChange={pageRowsHandler}/>
            </div>
            <SearchForm value={searchQuery} onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearchQuery(e.target.value)} placeholder=''/>
        </div>
        <div className="space-x-3"> 
            <PrimaryButton
             value="Add Role"
             color="blue"
             icon={<AiOutlinePlus/>}
             action={()=>{navigate('new')}}
            />
            <OutlinedButton
             value="Deactivate"
             color="gray"
             icon={<AiOutlineStop/>}
             action={DeactivateRole}
            />
        </div>
     </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto font-segoe">
            <div className="inline-block min-w-full shadow-lg overflow-hidden">
                <table className="overflow-x-scroll min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                                 
                            </th>  
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                                 Date Created
                            </th>   
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md  tracking-wider">
                                 Role Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                 Description
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-md'>
                       {
                           loading ?
                           <Spinner/>
                           :
                           <RolesTable data={currentRows}  onEditClick={editRole}/>
                       }
                    </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col  items-center justify-center">
                    <div className="text-md md:text-sm text-gray-900">
                        Showing <span>{currentIndex * rowsPerPage - 10}{' '}</span> to{' '}<span>{(currentIndex * rowsPerPage) < roles.length ? (currentIndex * rowsPerPage): roles.length}</span> of <span>{roles.length}</span>{' '}records
                    </div> 
                    <div className="inline-flex mt-2 md:mt-0">
                        {
                            currentIndex === 1 ? 
                            (
                             <button className="text-sm bg-gray-100 text-gray-800 py-2 px-4 rounded-l opacity-50 cursor-not-allowed"
                             >
                            Prev
                        </button>
                            )
                            :
                            (<button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l"
                                    onClick = {paginateBack}
                                >
                                    Prev
                            </button>)
                        } 
                         {
                            currentIndex * rowsPerPage === roles.length ? 
                            (
                                <button className="cursor-not-allowed text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
                                onClick = {paginateFront}
                                >
                                    Next
                                </button>
                            )
                            :
                            (
                            <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r"
                            onClick = {paginateFront}
                            >
                                Next
                            </button>
                            )
                        }       
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
}
export default AllAdmins;
